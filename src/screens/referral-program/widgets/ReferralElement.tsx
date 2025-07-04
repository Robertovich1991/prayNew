import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import * as Assets from '../../../assets/index';
import { T_KEYS } from '../../../assets/translations/index';

import * as CustomNavigationProps from '../../../navigation/navigationProps';
import Routes from '../../../navigation/Routes';

import { responsiveWidth } from '../../../common/utils';
import useOwnTranslation from '../../../hooks/useOwnTranslation';

import CustomText from '../../../components/CustomText';
import Divider from '../../../components/Divider';
import { format } from 'date-fns';

const ReferralElement: React.FC<ReferralTransaction> = props => {
  const { theme } = useTheme();
  const navigation =
    useNavigation<StackNavigationProp<CustomNavigationProps.YourReferrals>>();

  const t = useOwnTranslation;

  const {
    id,
    amountSpentByReferralsInUSD,
    referralName,
    grade,
    registrationDate,
    purchaseDate,
    accruedBonus,
    totalBonusesAfterAccrual,
  } = props;

  const onElementPressed = () => {
    navigation.navigate(Routes.REFERRAL_PROGRAM_TRANSACTION_DETAIL, {
      referralTransaction: {
        id,
        amountSpentByReferralsInUSD,
        referralName,
        grade,
        registrationDate,
        purchaseDate,
        accruedBonus,
        totalBonusesAfterAccrual,
      },
    });
  };

  return (
    <>
      <TouchableOpacity
        style={{
          ...referalElementStyles.elementWrapper,
          backgroundColor: theme.colors.backgroundSecondary,
        }}
        onPress={onElementPressed}
      >
        <View style={referalElementStyles.roundedAvatar}>
          <CustomText color={theme.colors.backgroundPrimary}>M</CustomText>
        </View>
        <View style={referalElementStyles.descriptionWrapper}>
          <View style={referalElementStyles.title}>
            <CustomText
              fontSize={responsiveWidth(15)}
              lineHeight={responsiveWidth(20)}
              numberOfLines={1}
              ellipsizeMode={'tail'}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ maxWidth: '70%' }}
            >
              {referralName}
            </CustomText>
            <View
              style={{
                ...referalElementStyles.interestTag,
                backgroundColor: theme.colors.backgroundPrimary,
              }}
            >
              <Assets.Icons.Star
                color={theme.colors.textColorPrimary}
                width={responsiveWidth(12.68)}
                height={responsiveWidth(12.06)}
              />
              <CustomText
                style={{ marginLeft: responsiveWidth(4) }}
                fontSize={responsiveWidth(12)}
                lineHeight={responsiveWidth(20)}
              >
                {`${grade}%`}
              </CustomText>
            </View>
          </View>
          <Divider height={responsiveWidth(4)} />
          <View style={referalElementStyles.descriptionRow}>
            <CustomText
              lineHeight={responsiveWidth(16)}
              fontSize={responsiveWidth(12)}
            >
              {t(T_KEYS.REGISTRATION)}:
            </CustomText>
            <CustomText
              lineHeight={responsiveWidth(16)}
              fontSize={responsiveWidth(12)}
              color={theme.colors.textColorQuaternary}
            >
              {` ${format(registrationDate, 'dd.MM.yyyy')}`}
            </CustomText>
          </View>

          <Divider height={responsiveWidth(4)} />
          <View style={referalElementStyles.descriptionRow}>
            <CustomText
              lineHeight={responsiveWidth(16)}
              fontSize={responsiveWidth(12)}
            >
              {t(T_KEYS.PURCHASE)}:
            </CustomText>
            <CustomText
              lineHeight={responsiveWidth(16)}
              fontSize={responsiveWidth(12)}
              color={theme.colors.textColorQuaternary}
            >
              {` ${purchaseDate ? format(purchaseDate, 'dd.MM.yyyy') : '--'}`}
            </CustomText>
          </View>
        </View>
        <View style={referalElementStyles.amountWrapper}>
          <CustomText
            lineHeight={responsiveWidth(22)}
            fontSize={responsiveWidth(16)}
          >
            {amountSpentByReferralsInUSD
              ? `$${amountSpentByReferralsInUSD}`
              : '--'}
          </CustomText>
        </View>
      </TouchableOpacity>
      <Divider height={responsiveWidth(8)} />
    </>
  );
};

const referalElementStyles = StyleSheet.create({
  elementWrapper: {
    // height: responsiveWidth(80),
    borderRadius: responsiveWidth(12),
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(12),
    paddingVertical: responsiveWidth(10),
  },
  roundedAvatar: {
    backgroundColor: '#D9C28D',
    width: responsiveWidth(40),
    height: responsiveWidth(40),
    borderRadius: responsiveWidth(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionWrapper: {
    marginLeft: responsiveWidth(12),
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    flexDirection: 'row',
    height: responsiveWidth(20),
    alignItems: 'center',
  },
  interestTag: {
    marginLeft: responsiveWidth(8),
    flexDirection: 'row',
    height: responsiveWidth(20),
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(4),
    borderRadius: responsiveWidth(6),
  },
  descriptionRow: { flexDirection: 'row' },
  amountWrapper: {
    marginLeft: responsiveWidth(12),
    flexDirection: 'column',
    width: responsiveWidth(40),
  },
});

export default ReferralElement;
