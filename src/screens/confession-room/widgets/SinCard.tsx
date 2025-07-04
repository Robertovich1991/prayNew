import React, { useCallback } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useLanguageBasedStructure as language } from '../../../hooks';
import { responsiveWidth } from '../../../common/utils';

import Routes from '../../../navigation/Routes';
import { ConfessionRoomNavigationProps } from '../../../navigation/navigationProps';

import * as Assets from '../../../assets';

import Divider from '../../../components/Divider';
import CustomText from '../../../components/CustomText';

import { sinSeverityDescription, sinTypeDescription } from './common';
import { WINDOW_WIDTH } from 'helpers/dimensions';

const extractImage = (cardImage?: SinCardImageKey) => {
  switch (cardImage) {
    case 'PassiveCognition': {
      return Assets.SinCards.PassiveCognition;
    }
    case 'Ritualism': {
      return Assets.SinCards.Ritualism;
    }
    case 'Superstition': {
      return Assets.SinCards.Superstition;
    }
    case 'NotFeelingGod': {
      return Assets.SinCards.NotFeelingGod;
    }
    case 'ConsumerismTowardGodAndTheChurch': {
      return Assets.SinCards.ConsumerismTowardGodAndTheChurch;
    }
    case 'NonComplianceWithTheRule': {
      return Assets.SinCards.NonComplianceWithTheRule;
    }
    default: {
      return Assets.SinCards.Ritualism;
    }
  }
};

const SinCard: React.FC<{ elementDetail: SinElement }> = ({
  elementDetail,
}) => {
  const navigation =
    useNavigation<StackNavigationProp<ConfessionRoomNavigationProps>>();

  const { headerTitle, severity, type, cardImage } = elementDetail;

  const isTitleLong = language(headerTitle).length > 17;

  const imageSource = useCallback(() => {
    return extractImage(cardImage);
  }, [cardImage]);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(Routes.CONFESSION_ROOM_CONFESSION_REDEMPTION, {
          machineName: elementDetail.machineName,
        });
      }}
      style={styles.container}
    >
      <View style={styles.imageWrapper}>
        <Image
          style={styles.imageMain}
          resizeMode={'stretch'}
          source={imageSource()}
        />
        <Image
          style={styles.imageMain}
          resizeMode={'stretch'}
          source={Assets.SinCards.SinCardMask}
        />
      </View>
      <View style={styles.descriptionWrapper}>
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...styles.descriptionTitle,
            fontSize: responsiveWidth(isTitleLong ? 14 : 24),
            width: isTitleLong ? '70%' : '100%',
          }}
          numberOfLines={isTitleLong ? 2 : 1}
          ellipsizeMode="tail"
        >
          {language(headerTitle)}
        </Text>
        <Divider height={responsiveWidth(4)} />
        <View style={styles.descriptionSecondLineWrapper}>
          <CustomText
            fontSize={responsiveWidth(12)}
            lineHeight={responsiveWidth(16)}
            color={'#FFF'}
          >
            {sinSeverityDescription[severity]}
          </CustomText>
          <View style={styles.descriptionSecondLineDivider} />
          <CustomText
            fontSize={responsiveWidth(12)}
            lineHeight={responsiveWidth(16)}
            color={'#FFF'}
          >
            {sinTypeDescription[type]}
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: (WINDOW_WIDTH - responsiveWidth(40)) / 3.8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(14),
    overflow: 'hidden',
  },
  imageWrapper: {
    alignItems: 'center',
    width: '100%',
    height: (WINDOW_WIDTH - responsiveWidth(40)) / 3.8,
  },
  imageMain: {
    width: '100%',
    height: (WINDOW_WIDTH - responsiveWidth(40)) / 3.8,
    position: 'absolute',
  },
  descriptionWrapper: {
    position: 'absolute',
    width: '100%',
    paddingLeft: responsiveWidth(16),
  },
  descriptionTitle: {
    fontFamily: 'PlayfairDisplay-SemiBold',
    textTransform: 'uppercase',
    textAlign: 'left',
    color: '#FFF',
  },
  descriptionSecondLineWrapper: { flexDirection: 'row', alignItems: 'center' },
  descriptionSecondLineDivider: {
    width: responsiveWidth(4),
    height: responsiveWidth(4),
    borderRadius: responsiveWidth(2),
    backgroundColor: '#FFF',
    marginHorizontal: responsiveWidth(6),
  },
});

export default SinCard;
