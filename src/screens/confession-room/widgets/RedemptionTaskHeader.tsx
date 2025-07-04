import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { responsiveWidth } from '../../../common/utils';
import {
  ANDROID_STATUSBAR,
  SCREEN_HEIGHT,
  WINDOW_WIDTH,
} from '../../../helpers/dimensions';

import * as Assets from '../../../assets/index';

import CustomText from '../../../components/CustomText';
import Divider from '../../../components/Divider';
import PlayfairTitle from '../../../components/PlayfairTitle';
import TopBar from '../../../components/TopBar';
import CustomButton from '../../../components/CustomButton';

const RedemptionTaskHeader: React.FC<{
  title: string;
  isTaskCompleted: boolean;
  isRedemptionButtonEnabled: boolean;
  onBeginRedemptionPressed?: () => void;
}> = props => {
  const {
    title,
    isTaskCompleted,
    isRedemptionButtonEnabled,
    onBeginRedemptionPressed,
  } = props;

  const onPress = () => {
    typeof onBeginRedemptionPressed === 'function' &&
      onBeginRedemptionPressed();
  };

  return (
    <>
      <View style={styles.backgroundImageWrapper}>
        <Image
          resizeMode="cover"
          source={Assets.RedemptionBackgrounds.BackgroundBlur}
          style={styles.backgroundBlur}
        />
        {isTaskCompleted ? (
          <Assets.Icons.CheckMark2
            fill="#D9C28D"
            width={responsiveWidth(69)}
            height={responsiveWidth(49)}
            style={{
              marginTop: ANDROID_STATUSBAR + responsiveWidth(100),
            }}
          />
        ) : (
          <Image
            resizeMode="contain"
            source={Assets.RedemptionBackgrounds.SocialTasks}
            style={styles.backgroundImage}
          />
        )}
      </View>
      <View style={styles.content}>
        <Divider height={ANDROID_STATUSBAR + responsiveWidth(27)} />
        <TopBar backArrow={true} backArrowColor={'#FFF'} />

        <Divider height={responsiveWidth(207)} />
        <PlayfairTitle style={styles.titleText}>{title}</PlayfairTitle>

        {isTaskCompleted ? (
          <>
            <Divider height={responsiveWidth(8)} />
            <CustomText
              fontSize={responsiveWidth(12)}
              lineHeight={responsiveWidth(16)}
              color={'#FFF'}
              style={styles.congratulationText}
            >
              Congratulations! Task accomplished!
            </CustomText>
            <Divider height={responsiveWidth(24)} />
          </>
        ) : isRedemptionButtonEnabled ? (
          <>
            <Divider height={responsiveWidth(24)} />
            <CustomButton
              title={'Begin redemption'}
              onPress={onPress}
              style={styles.beginRedemptionButton}
              btnTextStyle={styles.beginRedemptionButtonText}
            />
            <Divider height={responsiveWidth(20)} />
          </>
        ) : (
          <Divider height={responsiveWidth(24)} />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: responsiveWidth(20),
  },
  titleText: {
    fontSize: responsiveWidth(24),
    lineHeight: responsiveWidth(36),
    color: '#FFF',
  },
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
  congratulationText: { textAlign: 'center' },
  beginRedemptionButton: {
    marginTop: responsiveWidth(12),
    height: responsiveWidth(43),
    borderRadius: responsiveWidth(8),
    backgroundColor: '#D9C28D',
  },
  beginRedemptionButtonText: {
    color: '#FFF',
  },
});

export default RedemptionTaskHeader;
