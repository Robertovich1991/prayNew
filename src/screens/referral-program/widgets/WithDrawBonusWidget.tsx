import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '@rneui/themed';
import BottomSheet from '@gorhom/bottom-sheet';

import { responsiveWidth } from '../../../common/utils';
import useOwnTranslation from '../../../hooks/useOwnTranslation';
import { T_KEYS } from '../../../assets/translations/index';

import Routes from '../../../navigation/Routes';
import * as CustomNavigationProps from '../../../navigation/navigationProps';

import * as Assets from '../../../assets/index';

import CustomText from '../../../components/CustomText';
import Divider from '../../../components/Divider';

const WithDrawBonusWidget: React.FC<{
  bottomSheetRef: React.RefObject<BottomSheet>;
}> = ({ bottomSheetRef }) => {
  const { theme } = useTheme();
  const navigation =
    useNavigation<
      StackNavigationProp<CustomNavigationProps.WithDrawBonusWidget>
    >();

  const t = useOwnTranslation;

  const onPaySubscriptionPressed = () => {
    navigation.navigate(Routes.REFERRAL_PROGRAM_PAY_SUBSCRIPTION, {
      subscription: {
        id: 'test',
        bonusCost: 250,
        periodInDays: 30,
        title: 'Monthly subscription',
      },
    });
  };

  const onWithdrawBonusPressed = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={onPaySubscriptionPressed}>
          <View style={styles.buttonWrapper}>
            <View
              style={{
                ...styles.buttonImage,
                backgroundColor: theme.colors.backgroundSecondary,
              }}
            >
              <Assets.Icons.HandOfPayment
                fill={theme.colors.textColorPrimary}
                width={responsiveWidth(23.7)}
                height={responsiveWidth(18.76)}
              />
            </View>
            <Divider height={responsiveWidth(9)} />
            <CustomText
              style={{
                backgroundColor: theme.colors.backgroundPrimary,
              }}
              ellipsizeMode={'tail'}
              numberOfLines={1}
              fontSize={responsiveWidth(14)}
              lineHeight={responsiveWidth(19)}
              color={theme.colors.textColorPrimary}
            >
              {t(T_KEYS.PAY_SUBSCRIPTION)}
            </CustomText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onWithdrawBonusPressed}>
          <View style={styles.buttonWrapper}>
            <View
              style={{
                ...styles.buttonImage,
                backgroundColor: theme.colors.backgroundSecondary,
              }}
            >
              <Assets.Icons.ArrowOut
                fill={theme.colors.textColorPrimary}
                width={responsiveWidth(23.7)}
                height={responsiveWidth(18.76)}
              />
            </View>
            <Divider height={responsiveWidth(9)} />
            <CustomText
              style={{
                backgroundColor: theme.colors.backgroundPrimary,
              }}
              ellipsizeMode={'tail'}
              numberOfLines={1}
              fontSize={responsiveWidth(14)}
              lineHeight={responsiveWidth(19)}
              color={theme.colors.textColorPrimary}
            >
              {t(T_KEYS.WITHDRAW_BONUSES)}
            </CustomText>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonWrapper: { flexDirection: 'column', alignItems: 'center' },
  buttonImage: {
    height: responsiveWidth(60),
    width: responsiveWidth(60),
    borderRadius: responsiveWidth(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WithDrawBonusWidget;
