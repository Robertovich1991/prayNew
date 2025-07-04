import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { ConfessionRoomNavigationProps } from '../../../navigation/navigationProps';
import Routes from '../../../navigation/Routes';

import { useLanguageBasedStructure as language } from '../../../hooks/index';
import { responsiveWidth } from '../../../common/utils';
import {
  ANDROID_STATUSBAR,
  SCREEN_HEIGHT,
  WINDOW_WIDTH,
} from '../../../helpers/dimensions';

import store from '../../../store';

import * as Assets from '../../../assets/index';
import Divider from '../../../components/Divider';
import CustomText from '../../../components/CustomText';
import TopBar from '../../../components/TopBar';
import CustomButton from '../../../components/CustomButton';

const TaskPrayerRecitationContext = () => {
  const { params } =
    useRoute<
      RouteProp<
        ConfessionRoomNavigationProps,
        Routes.CONFESSION_ROOM_TASK_PRAYER_RECITATION_CONTEXT
      >
    >();

  const navigation =
    useNavigation<StackNavigationProp<ConfessionRoomNavigationProps>>();

  const { task, machineName } = params;
  const { text } = task;

  const onCompleteTestPressed = () => {
    const { isFinal } = store.confessionsStore.updateConfessionProgress({
      machineName,
      taskKey: task.key,
    });
    navigation.navigate(
      Routes.CONFESSION_ROOM_TASK_PRAYER_RECITATION_COMPLETE,
      {
        task,
        machineName,
        isFinal,
      },
    );
  };

  return (
    <ScrollView style={styles.fullContainer}>
      <View style={styles.content}>
        <Divider height={ANDROID_STATUSBAR + responsiveWidth(27)} />
        <TopBar
          text="Prayer Recitation"
          textStyle={styles.topBarTextStyle}
          backArrow={true}
          backArrowColor={'#FFF'}
        />
        <Divider height={responsiveWidth(20)} />
        <View style={styles.contentRowWrapper}>
          <CustomText
            fontSize={responsiveWidth(15)}
            lineHeight={responsiveWidth(20)}
            color="#FFF"
            style={styles.text}
          >
            {language(text)}
          </CustomText>
        </View>
        <Divider height={responsiveWidth(20)} />
        <View style={styles.recordingWrapper}>
          <CustomText
            fontSize={responsiveWidth(15)}
            lineHeight={responsiveWidth(20)}
            color="#FFF"
            fontWeight="bold"
            style={styles.text}
          >
            Recording your prayer
          </CustomText>
          <Divider height={responsiveWidth(12)} />
          <Assets.Icons.Microphone
            fill="#999999"
            width={responsiveWidth(22)}
            height={responsiveWidth(18)}
          />
          <Divider height={responsiveWidth(12)} />
          <CustomButton
            title={'Complete'}
            onPress={onCompleteTestPressed}
            style={styles.beginRedemptionButton}
            btnTextStyle={styles.beginRedemptionButtonText}
          />
        </View>

        <Divider height={responsiveWidth(44)} />
      </View>
    </ScrollView>
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
  text: { textAlign: 'center' },
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
  recordingWrapper: {
    padding: responsiveWidth(12),
    borderRadius: responsiveWidth(12),
    backgroundColor: '#000',
    alignItems: 'center',
  },
});

export default TaskPrayerRecitationContext;
