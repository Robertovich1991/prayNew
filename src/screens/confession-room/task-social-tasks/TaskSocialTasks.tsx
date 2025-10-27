import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react';

import Routes from '../../../navigation/Routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { ConfessionRoomNavigationProps } from '../../../navigation/navigationProps';

import store from '../../../store/index';
import { T_KEYS } from '../../../assets/translations';
import useOwnTranslation from '../../../hooks/useOwnTranslation';

import { useLanguageBasedStructure as language } from '../../../hooks/index';
import { responsiveWidth } from '../../../common/utils';
import { SCREEN_HEIGHT, WINDOW_WIDTH } from '../../../helpers/dimensions';

import CustomButton from '../../../components/CustomButton';
import CustomText from '../../../components/CustomText';
import Divider from '../../../components/Divider';
import RedemptionListButton from '../widgets/ListButton';
import ExecutionElement from '../widgets/ExecutionElement';
import RedemptionTaskHeader from '../widgets/RedemptionTaskHeader';
import RedemptionContentElement from '../widgets/RedemptionContentElement';

const TaskSocialTasks = () => {
  const navigation =
    useNavigation<StackNavigationProp<ConfessionRoomNavigationProps>>();
  const t = useOwnTranslation;

  const { params } =
    useRoute<
      RouteProp<
        ConfessionRoomNavigationProps,
        Routes.CONFESSION_ROOM_TASK_SOCIAL_TASKS
      >
    >();

  const { machineName, task } = params;

  const confessionProgress =
    store.confessionsStore.getConfessionProgress(machineName);

  const taskProgress = confessionProgress?.tasks.find(x => x.key === task.key);

  const handleContactPastor = () => {
    if (store.userStore.isUserBlessed) {
      // User is blessed, navigate to online pastor screen
      navigation.navigate(Routes.PRIEST_ONLINE);
    } else {
      // User is not blessed, show subscription alert
      Alert.alert(
        t(T_KEYS.CONTACT_PASTOR_SUBSCRIPTION_REQUIRED),
        t(T_KEYS.CONTACT_PASTOR_SUBSCRIPTION_MESSAGE),
        [
          {
            text: t(T_KEYS.CONTACT_PASTOR_SUBSCRIPTION_CANCEL),
            style: 'cancel',
          },
          {
            text: t(T_KEYS.CONTACT_PASTOR_SUBSCRIPTION_SUBSCRIBE),
            onPress: () => {
              navigation.navigate(Routes.TARIF_SCREEN);
            },
          },
        ]
      );
    }
  };

  return (
    <View style={styles.fullContainer}>
      <RedemptionTaskHeader
        isRedemptionButtonEnabled={false}
        isTaskCompleted={taskProgress?.isCompleted || false}
        title="Social tasks"
      />
      <ScrollView nestedScrollEnabled style={styles.content}>
        <RedemptionContentElement title="List of social tasks">
          {task.listOfSocialTasks.map(socialTask => {
            const onPress = () => {
              navigation.navigate(
                Routes.CONFESSION_ROOM_TASK_SOCIAL_TASKS_PERFORMING_RITUAL,
                {
                  machineName,
                  task,
                  socialTaskKey: socialTask.en,
                },
              );
            };
            return (
              <RedemptionListButton
                key={socialTask.en}
                title={language(socialTask)}
                onPress={onPress}
              />
            );
          })}
        </RedemptionContentElement>
        <Divider height={responsiveWidth(8)} />

        <RedemptionContentElement title="Instructions for the task">
          <CustomText
            fontSize={responsiveWidth(12)}
            lineHeight={responsiveWidth(18)}
            color={'#FFF'}
          >
            {language(task.instructionText)}
          </CustomText>
        </RedemptionContentElement>
        <Divider height={responsiveWidth(8)} />
        <RedemptionContentElement title="Any difficulties?">
          <CustomText
            fontSize={responsiveWidth(12)}
            lineHeight={responsiveWidth(18)}
            color="#FFF"
          >
            Contact the online pastor to resolve problems
          </CustomText>
          <Divider height={responsiveWidth(12)} />
          <CustomButton
            title={'Contact the pastor'}
            onPress={handleContactPastor}
            style={styles.contactThePastorButton}
            btnTextStyle={styles.contactThePastorButtonText}
          />
        </RedemptionContentElement>
        <Divider height={responsiveWidth(8)} />
        <RedemptionContentElement title="Execution time">
          <ExecutionElement title="Overall task" value={task.overallTask} />
        </RedemptionContentElement>
        <Divider height={responsiveWidth(44)} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullContainer: {
    width: WINDOW_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#191919',
    paddingTop:50
  },
  content: {
    paddingHorizontal: responsiveWidth(20),
  },
  contactThePastorButtonText: { color: '#D9C28D', textTransform: 'uppercase' },
  contactThePastorButton: {
    height: responsiveWidth(44),
    borderRadius: responsiveWidth(12),
    borderWidth: responsiveWidth(1),
    borderColor: '#232323',
    backgroundColor: '#191919',
  },
});

export default observer(TaskSocialTasks);
