import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { responsiveWidth } from '../../../common/utils';

import Routes from '../../../navigation/Routes';
import { ConfessionRoomNavigationProps } from '../../../navigation/navigationProps';

import store from '../../../store';

import CustomButton from '../../../components/CustomButton';
import CustomText from '../../../components/CustomText';
import Divider from '../../../components/Divider';

import HorizontalProgressBar from './HorizontalProgressBar';
import ConfessionTaskButtonWithProgress from './ConfessionTaskButtonWithProgress';
import { sinElements } from '../sin-mocks/index';
import { observer } from 'mobx-react';

const ConfessionTasks: React.FC<{
  confession: { machineName: string };
}> = ({ confession }) => {
  const navigation =
    useNavigation<StackNavigationProp<ConfessionRoomNavigationProps>>();

  const confessionProgress = store.confessionsStore.getConfessionProgress(
    confession.machineName,
  );

  const titleProgress = confessionProgress
    ? `${confessionProgress.completedTasks}/${confessionProgress.totalTasks} `
    : '';

  const sinElement = sinElements.find(
    x => x.machineName === confession.machineName,
  );

  if (!sinElement) {
    return <></>;
  }

  return (
    <View>
      <CustomText
        fontSize={responsiveWidth(24)}
        lineHeight={responsiveWidth(33)}
        fontWeight="bold"
        color="#FFF"
      >{`${titleProgress}Tasks`}</CustomText>
      {confessionProgress ? (
        <View>
          <Divider height={4} />
          <CustomText
            lineHeight={responsiveWidth(16)}
            fontSize={responsiveWidth(12)}
            color="#FFF"
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ width: '60%' }}
          >
            You are making great progress. Stay focused!
          </CustomText>
          <Divider height={12} />
          <HorizontalProgressBar
            progress={
              (confessionProgress.completedTasks * 100) /
              confessionProgress.totalTasks
            }
          />
        </View>
      ) : (
        <View>
          <CustomText color="#FFF">
            Click the button below to start your tasks and begin redemption
          </CustomText>
          <Divider height={responsiveWidth(12)} />
          <CustomButton
            title={'Begin redemption'}
            onPress={() => {
              store.confessionsStore.startConfessionRedemption(confession);
            }}
            style={{
              ...styles.beginRedemptionButton,
            }}
          />
        </View>
      )}
      <Divider height={12} />
      {sinElement.confessionTasks.map(confessionTask => {
        switch (confessionTask.taskType) {
          case 'reading-the-bible': {
            const progressTask = confessionProgress?.tasks.find(
              x => x.key === confessionTask.payload.key,
            );

            const progress = progressTask?.isCompleted ? 100 : undefined;

            return (
              <View key={confessionTask.payload.key}>
                <ConfessionTaskButtonWithProgress
                  onButtonPress={() => {
                    navigation.navigate(
                      Routes.CONFESSION_ROOM_TASK_READING_THE_BIBBLE,
                      {
                        machineName: confession.machineName,
                        task: confessionTask.payload,
                      },
                    );
                  }}
                  title={'Reading the Bible'}
                  description={'Read the passage and answer the test questions'}
                  progress={progress}
                  isToBePerformed={!progress}
                />
                <Divider height={responsiveWidth(8)} />
              </View>
            );
          }
          case 'prayer-recitation': {
            const progressTask = confessionProgress?.tasks.find(
              x => x.key === confessionTask.payload.key,
            );

            const progress = progressTask?.isCompleted ? 100 : undefined;

            return (
              <View key={confessionTask.payload.key}>
                <ConfessionTaskButtonWithProgress
                  onButtonPress={() => {
                    navigation.navigate(
                      Routes.CONFESSION_ROOM_TASK_PRAYER_RECITATION,
                      {
                        machineName: confession.machineName,
                        task: confessionTask.payload,
                      },
                    );
                  }}
                  title={'Prayers'}
                  description={'Read the prayers and note the fulfillment'}
                  progress={progress}
                  isToBePerformed={!progress}
                />
                <Divider height={responsiveWidth(8)} />
              </View>
            );
          }
          case 'religious-rituals': {
            const progressTask = confessionProgress?.tasks.find(
              x => x.key === confessionTask.payload.key,
            );

            const progress = progressTask?.isCompleted ? 100 : undefined;

            return (
              <View key={confessionTask.payload.key}>
                <ConfessionTaskButtonWithProgress
                  onButtonPress={() => {
                    navigation.navigate(
                      Routes.CONFESSION_ROOM_TASK_RELIGIOUS_RITUALS,
                      {
                        machineName: confession.machineName,
                        task: confessionTask.payload,
                      },
                    );
                  }}
                  title={'Religious rituals'}
                  description={'Read the prayers and note the fulfillment'}
                  progress={progress}
                  isToBePerformed={!progress}
                />
                <Divider height={responsiveWidth(8)} />
              </View>
            );
          }
          case 'social-tasks': {
            const progressTask = confessionProgress?.tasks.find(
              x => x.key === confessionTask.payload.key,
            );

            const progress = progressTask?.isCompleted ? 100 : undefined;

            return (
              <View key={confessionTask.payload.key}>
                <ConfessionTaskButtonWithProgress
                  onButtonPress={() => {
                    navigation.navigate(
                      Routes.CONFESSION_ROOM_TASK_SOCIAL_TASKS,
                      {
                        machineName: confession.machineName,
                        task: confessionTask.payload,
                      },
                    );
                  }}
                  title={'Social tasks'}
                  description={'Perform social tasks and fix your progress'}
                  progress={progress}
                  isToBePerformed={!progress}
                />
                <Divider height={responsiveWidth(8)} />
              </View>
            );
          }
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  beginRedemptionButton: {
    marginTop: responsiveWidth(12),
    height: responsiveWidth(43),
    borderRadius: responsiveWidth(8),
    backgroundColor: '#D9C28D',
  },
});

export default observer(ConfessionTasks);
