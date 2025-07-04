import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { responsiveWidth } from '../../../common/utils';
import {
  ANDROID_STATUSBAR,
  SCREEN_HEIGHT,
  WINDOW_WIDTH,
} from '../../../helpers/dimensions';
import { useLanguageBasedStructure as language } from '../../../hooks';

import store from '../../../store';

import Routes from '../../../navigation/Routes';
import { ConfessionRoomNavigationProps } from '../../../navigation/navigationProps';

import CustomButton from '../../../components/CustomButton';
import CustomText from '../../../components/CustomText';
import Divider from '../../../components/Divider';
import TopBar from '../../../components/TopBar';

import DialogModal from '../../../screens/modals/DialogModal';
import RedemptionModal from '../../../screens/modals/RedemptionModal';

import SurveyCountdownTimer from '../widgets/SurveyCountdownTimer';
import { StackNavigationProp } from '@react-navigation/stack';

const RedemptionReadingTheBibleSurvey = () => {
  const navigation =
    useNavigation<StackNavigationProp<ConfessionRoomNavigationProps>>();
  const { params } =
    useRoute<
      RouteProp<
        ConfessionRoomNavigationProps,
        Routes.CONFESSION_ROOM_TASK_READING_THE_BIBBLE_CONTEXT
      >
    >();

  const { task, machineName } = params;
  const { surveyQuestions, testDurationInSeconds } = task;

  const confessionProgress =
    store.confessionsStore.getConfessionProgress(machineName);
  const taskProgress = confessionProgress?.tasks.find(x => x.key === task.key);

  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, typeof surveyQuestions[0]['answers'][0] | undefined>
  >(
    surveyQuestions.reduce((prev, cur) => {
      return { ...prev, [cur.key]: undefined };
    }, {}),
  );
  const [secondsLeft, setSecondsLeft] = useState(
    taskProgress?.secondsLeft || testDurationInSeconds,
  );
  const [isFinalTask, setIsFinalTask] = useState(false);
  const [context, setContext] = useState<'default' | 'success' | 'fail'>(
    'default',
  );

  const interval = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    interval.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev > 0) {
          return prev - 1;
        } else {
          interval.current && clearInterval(interval.current);
          onTimeIsOver();
          return 0;
        }
      });
    }, 1000);

    return () => {
      interval.current && clearInterval(interval.current);
    };
  }, []);

  const onTimeIsOver = () => {
    setContext('fail');
  };

  const onBackArrowPressed = async (): Promise<boolean> => {
    return new Promise(resolve => {
      store.modalStore.open(
        <DialogModal
          title="Are you sure?"
          onConfirmAction={() => {
            store.confessionsStore.saveSecondsLeft({
              secondsLeft,
              machineName,
              taskKey: task.key,
            });
            resolve(true);
          }}
          onCancelAction={() => resolve(false)}
        />,
      );
    });
  };

  const onCompleteTestPressed = () => {
    const isAnswersCorrect = Object.values(selectedAnswers).every(
      answer => answer && answer.isSolution,
    );

    if (!isAnswersCorrect) {
      setContext('fail');
    } else {
      interval.current && clearInterval(interval.current);
      setContext('success');
      const { isFinal } = store.confessionsStore.updateConfessionProgress({
        machineName,
        taskKey: task.key,
      });
      if (isFinal) {
        setIsFinalTask(true);
      }
    }
  };

  const isCompleteButtonDisabled = useMemo(
    () => Object.entries(selectedAnswers).some(([, answer]) => !answer),
    [selectedAnswers],
  );

  const renderQuestionItem = useCallback(
    ({ item: question }: { item: typeof surveyQuestions['0'] }) => {
      const selectedAnswer = selectedAnswers[question.key];

      return (
        <View style={styles.contentRowWrapper}>
          <CustomText
            fontSize={responsiveWidth(15)}
            lineHeight={responsiveWidth(20)}
            fontWeight="bold"
            color="#FFF"
          >
            {question.key}
          </CustomText>
          <Divider height={responsiveWidth(12)} />
          <CustomText
            fontSize={responsiveWidth(12)}
            lineHeight={responsiveWidth(16)}
            color="#FFF"
          >
            {language(question.description)}
          </CustomText>
          <Divider height={responsiveWidth(12)} />
          {question.answers.map(answer => {
            const isSelected =
              language(selectedAnswer?.text) === language(answer.text);

            const onPress = () => {
              setSelectedAnswers({
                ...selectedAnswers,
                [question.key]: answer,
              });
            };
            return (
              <TouchableOpacity
                style={[
                  styles.answerWrapper,
                  // eslint-disable-next-line react-native/no-inline-styles
                  { borderColor: isSelected ? '#D9C28D' : '#232323' },
                ]}
                key={language(answer.text)}
                onPress={onPress}
              >
                <CustomText color="#FFF">{language(answer.text)}</CustomText>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    },
    [selectedAnswers],
  );

  if (context === 'fail') {
    return (
      <RedemptionModal
        description="You failed to answer the questions correctly. We suggest that you go through the task again"
        title="Reading the Bible"
        type="fail"
        onConfirmAction={() => {
          setContext('default');
        }}
      />
    );
  }

  if (context === 'success') {
    return (
      <RedemptionModal
        description="Congratulations! Task accomplished!"
        title="Reading the Bible"
        type="success"
        onConfirmAction={() => {
          console.log({ isFinalTask });
          if (isFinalTask) {
            navigation.navigate(Routes.CONFESSION_ROOM);
          } else {
            navigation.navigate(Routes.CONFESSION_ROOM_CONFESSION_REDEMPTION, {
              machineName,
            });
          }
        }}
      />
    );
  }

  return (
    <FlatList
      ListHeaderComponent={() => (
        <View style={styles.content}>
          <Divider height={ANDROID_STATUSBAR + responsiveWidth(27)} />
          <TopBar
            text="Test questions"
            backArrow={true}
            backArrowColor={'#FFF'}
            backArrowPrevent={onBackArrowPressed}
            textStyle={styles.topBarTextStyle}
          />
          <Divider height={responsiveWidth(25)} />
          <SurveyCountdownTimer secondsLeft={secondsLeft} />
          <Divider height={responsiveWidth(24)} />
          <FlatList
            scrollEnabled={false}
            data={surveyQuestions}
            renderItem={renderQuestionItem}
            ItemSeparatorComponent={() => (
              <Divider height={responsiveWidth(8)} />
            )}
          />
          <Divider height={responsiveWidth(20)} />
          <CustomButton
            title={'Complete the test'}
            onPress={onCompleteTestPressed}
            style={styles.beginRedemptionButton}
            disabled={isCompleteButtonDisabled}
            btnTextStyle={styles.beginRedemptionButtonText}
          />
          <Divider height={responsiveWidth(44)} />
        </View>
      )}
      nestedScrollEnabled
      style={styles.fullContainer}
      renderItem={() => <></>}
      data={[]}
    />
  );
};

const styles = StyleSheet.create({
  fullContainer: {
    width: WINDOW_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#191919',
  },
  content: {
    paddingHorizontal: responsiveWidth(20),
  },
  topBarTextStyle: { color: '#FFF' },
  backgroundImageWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: WINDOW_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
  },
  backgroundBlur: {
    width: '100%',
    height: responsiveWidth(560),
    position: 'absolute',
  },
  backgroundImage: {
    height: responsiveWidth(161),
    width: responsiveWidth(161),
    marginTop: ANDROID_STATUSBAR + responsiveWidth(75),
  },
  beginRedemptionButtonText: { color: '#FFF' },
  beginRedemptionButton: {
    height: responsiveWidth(43),
    borderRadius: responsiveWidth(8),
    backgroundColor: '#D9C28D',
  },
  contentRowWrapper: {
    padding: responsiveWidth(12),
    borderRadius: responsiveWidth(12),
    backgroundColor: '#000',
  },
  answerWrapper: {
    padding: responsiveWidth(14),
    borderRadius: responsiveWidth(12),
    borderWidth: responsiveWidth(1),
    marginBottom: responsiveWidth(8),
  },
});

export default RedemptionReadingTheBibleSurvey;
