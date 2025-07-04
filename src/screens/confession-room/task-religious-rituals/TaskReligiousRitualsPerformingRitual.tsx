import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import store from '../../../store/index';

import Routes from '../../../navigation/Routes';
import { ConfessionRoomNavigationProps } from '../../../navigation/navigationProps';

import { generateUuid } from '../../../helpers/utils';
import { responsiveWidth } from '../../../common/utils';
import { ANDROID_STATUSBAR, WINDOW_WIDTH } from '../../../helpers/dimensions';

import RedemptionModal from '../../modals/RedemptionModal';
import CustomButton from '../../../components/CustomButton';
import Divider from '../../../components/Divider';
import TopBar from '../../../components/TopBar';

import RedemptionListImage from '../widgets/RedemptionListImage';
import RedemptionListNoImage from '../widgets/RedemptionListNoImage';

const TaskReligiousRitualsPerformingRitual = () => {
  const navigation =
    useNavigation<StackNavigationProp<ConfessionRoomNavigationProps>>();

  const { params } =
    useRoute<
      RouteProp<
        ConfessionRoomNavigationProps,
        Routes.CONFESSION_ROOM_TASK_RELIGIOUS_RITUALS_PERFORMING_RITUAL
      >
    >();

  const { machineName, task } = params;

  const confessionProgress =
    store.confessionsStore.getConfessionProgress(machineName);

  const taskProgress = confessionProgress?.tasks.find(x => x.key === task.key);

  const [context, setContext] = useState<'default' | 'success' | 'fail'>(
    'default',
  );
  const [uploadedItems, setUploadedItems] = useState<{ id: string }[]>([]);

  const onConfirm = () => {
    if (uploadedItems.length < 1) {
      setContext('fail');
    } else {
      store.confessionsStore.updateConfessionProgress({
        machineName,
        taskKey: task.key,
      });

      setContext('success');
    }
  };

  const onAddNew = () => {
    setUploadedItems(prev => [...prev, { id: generateUuid() }]);
  };

  if (context === 'success') {
    return (
      <RedemptionModal
        description="Congratulations! Task accomplished!"
        title="Religious Rituals"
        type="success"
        onConfirmAction={() => {
          navigation.navigate(Routes.CONFESSION_ROOM_TASK_RELIGIOUS_RITUALS, {
            machineName,
            task,
          });
        }}
      />
    );
  }

  if (context === 'fail') {
    return (
      <RedemptionModal
        description="More proof of your work required"
        title="Religious Rituals"
        type="fail"
        onConfirmAction={() => {
          setContext('default');
        }}
      />
    );
  }

  return (
    <>
      <FlatList
        ListHeaderComponent={() => (
          <>
            <Divider height={ANDROID_STATUSBAR + responsiveWidth(27)} />
            <TopBar
              backArrow={true}
              backArrowColor={'#FFF'}
              text="Performing the ritual"
              textStyle={styles.titleText}
            />
            <Divider height={responsiveWidth(20)} />
          </>
        )}
        columnWrapperStyle={styles.columns}
        numColumns={2}
        nestedScrollEnabled
        style={styles.fullContainer}
        renderItem={({ item }) => {
          const onPress = () => {
            setUploadedItems(prev => prev.filter(x => x.id !== item.id));
          };
          return (
            <RedemptionListImage
              onPress={onPress}
              isInProgress={taskProgress ? !taskProgress.isCompleted : false}
            />
          );
        }}
        data={uploadedItems}
        ListEmptyComponent={<RedemptionListNoImage />}
      />
      {taskProgress && !taskProgress.isCompleted && (
        <View style={styles.controls}>
          <CustomButton
            title={'Add new'}
            onPress={onAddNew}
            style={styles.addNewButton}
            btnTextStyle={styles.addNewButtonText}
          />
          <View style={{ width: responsiveWidth(12) }} />
          <CustomButton
            title={'Confirm'}
            onPress={onConfirm}
            style={styles.confirmButton}
            btnTextStyle={styles.confirmButtonText}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  fullContainer: {
    width: WINDOW_WIDTH,
    paddingHorizontal: responsiveWidth(20),
    backgroundColor: '#191919',
  },
  titleText: {
    fontSize: responsiveWidth(24),
    lineHeight: responsiveWidth(36),
    color: '#FFF',
  },
  controls: {
    position: 'absolute',
    left: 0,
    bottom: responsiveWidth(26),
    width: WINDOW_WIDTH,
    paddingHorizontal: responsiveWidth(20),
    flexDirection: 'row',
  },
  confirmButton: {
    height: responsiveWidth(43),
    borderRadius: responsiveWidth(8),
    backgroundColor: '#D9C28D',
    flex: 1,
  },
  confirmButtonText: {
    color: '#FFF',
    textTransform: 'uppercase',
  },
  addNewButton: {
    height: responsiveWidth(43),
    borderRadius: responsiveWidth(8),
    borderColor: '#232323',
    borderWidth: responsiveWidth(1),
    backgroundColor: '#191919',
    flex: 1,
  },
  addNewButtonText: {
    color: '#D9C28D',
    textTransform: 'uppercase',
  },
  columns: { justifyContent: 'space-between' },
});

export default TaskReligiousRitualsPerformingRitual;
