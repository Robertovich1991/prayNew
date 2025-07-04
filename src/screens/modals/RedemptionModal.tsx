import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SCREEN_HEIGHT, WINDOW_WIDTH } from '../../helpers/dimensions';
import { responsiveWidth } from '../../common/utils';

import * as Assets from '../../assets';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import Divider from '../../components/Divider';
import PlayfairTitle from '../../components/PlayfairTitle';
import TopBar from '../../components/TopBar';

interface DialogModalProps {
  title: string;
  description: string;
  type: 'success' | 'fail';
  onConfirmAction?: () => void;
}

const RedemptionModal: React.FC<DialogModalProps> = ({
  title,
  description,
  type,
  onConfirmAction,
}) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.backgroundWrapper}>
        <Image
          resizeMode="cover"
          source={
            type === 'success'
              ? Assets.RedemptionBackgrounds.BackgroundModalBlur
              : Assets.RedemptionBackgrounds.BackgroundRedBlur
          }
          style={styles.backgroundBlur}
        />
        <View style={styles.backgroundImage}>
          {type === 'success' ? (
            <Assets.Icons.CheckMark2
              width={responsiveWidth(69)}
              height={responsiveWidth(49)}
              fill="#D9C28D"
            />
          ) : (
            <Assets.Icons.ClosingCross
              width={responsiveWidth(52)}
              height={responsiveWidth(52)}
              fill="#FF6B6B"
            />
          )}
        </View>
      </View>
      <Divider height={responsiveWidth(27)} />
      <TopBar backArrow={true} backArrowColor={'#FFF'} />
      <View style={styles.content}>
        <View>
          <PlayfairTitle style={styles.titleText}>{title}</PlayfairTitle>
          <Divider height={responsiveWidth(8)} />
          <CustomText
            fontSize={responsiveWidth(12)}
            lineHeight={responsiveWidth(18)}
            color={'#FFF'}
            style={styles.descriptionText}
          >
            {description}
          </CustomText>
        </View>
        <CustomButton
          title={'Confirm'}
          onPress={() => {
            typeof onConfirmAction === 'function' && onConfirmAction();
          }}
          style={styles.beginRedemptionButton}
          btnTextStyle={styles.beginRedemptionButtonText}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: WINDOW_WIDTH,
    height: '100%',
    flex: 1,
    padding: responsiveWidth(20),
    backgroundColor: '#191919',
  },
  content: {
    marginTop: SCREEN_HEIGHT / 2,
    // backgroundColor: 'orange',
    flex: 1,
    paddingBottom: responsiveWidth(54),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: responsiveWidth(24),
    lineHeight: responsiveWidth(36),
    color: '#FFF',
  },
  descriptionText: { textAlign: 'center' },
  backgroundWrapper: {
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
    height: SCREEN_HEIGHT,
    position: 'absolute',
  },
  backgroundImage: {
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    // backgroundColor: 'green',
  },
  beginRedemptionButton: {
    marginTop: responsiveWidth(12),
    height: responsiveWidth(43),
    borderRadius: responsiveWidth(8),
    backgroundColor: '#D9C28D',
  },
  beginRedemptionButtonText: {
    color: '#FFF',
    textTransform: 'uppercase',
  },
});

export default RedemptionModal;
