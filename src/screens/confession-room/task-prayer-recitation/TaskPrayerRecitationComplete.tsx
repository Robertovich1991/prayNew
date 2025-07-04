import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Routes from '../../../navigation/Routes';
import { ConfessionRoomNavigationProps } from '../../../navigation/navigationProps';

import RedemptionModal from '../../modals/RedemptionModal';

const TaskPrayerRecitationComplete = () => {
  const navigation =
    useNavigation<StackNavigationProp<ConfessionRoomNavigationProps>>();
  const { params } =
    useRoute<
      RouteProp<
        ConfessionRoomNavigationProps,
        Routes.CONFESSION_ROOM_TASK_PRAYER_RECITATION_COMPLETE
      >
    >();

  const { machineName, isFinal } = params;

  return (
    <RedemptionModal
      description="Congratulations! Task accomplished!"
      title="Prayer recitation"
      type="success"
      onConfirmAction={() => {
        if (isFinal) {
          navigation.navigate(Routes.CONFESSION_ROOM);
        } else {
          navigation.navigate(Routes.CONFESSION_ROOM_CONFESSION_REDEMPTION, {
            machineName,
          });
        }
      }}
    />
  );
};

export default TaskPrayerRecitationComplete;
