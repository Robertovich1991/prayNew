import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';

import * as CustomNavigationProps from '../../navigation/navigationProps';
import Routes from '../../navigation/Routes';

import Container from '../../components/Container';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import Divider from '../../components/Divider';
import ReferralBalance from '../../components/ReferralBalance';
import TopBar from '../../components/TopBar';

import { convertDateForTitles, responsiveWidth } from '../../common/utils';

const RenderDetailRow: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => {
  const { theme } = useTheme();
  return (
    <View key={title}>
      <Divider height={responsiveWidth(8)} />
      <View style={styles.textHeader}>
        <CustomText
          color={theme.colors.textColorTertiary}
          fontSize={responsiveWidth(15)}
          lineHeight={responsiveWidth(20)}
        >
          {title}
        </CustomText>
        <CustomText
          color={theme.colors.textColorPrimary}
          fontSize={responsiveWidth(15)}
          lineHeight={responsiveWidth(20)}
          style={styles.value}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {value}
        </CustomText>
      </View>
    </View>
  );
};

const ReferalProgramPaySubscription = () => {
  const { params } =
    useRoute<
      RouteProp<
        CustomNavigationProps.WithDrawBonusWidget,
        Routes.REFERRAL_PROGRAM_PAY_SUBSCRIPTION
      >
    >();

  const { subscription } = params;
  const { bonusCost, periodInDays, title } = subscription;

  const { theme } = useTheme();

  const details = [
    {
      title: 'Amount',
      value: String(bonusCost),
    },
    {
      title: 'Subscription period',
      value: convertDateForTitles(Date.now() + periodInDays * 24 * 3600 * 1000),
    },
  ];

  const onConfirm = () => {};

  return (
    <View>
      <Container>
        <View style={styles.container}>
          <View>
            <TopBar text={'Pay for subscription'} backArrow={true} />

            <Divider height={responsiveWidth(20)} />
            <ReferralBalance totalReferralBalance={'-' + bonusCost} />
            <Divider height={responsiveWidth(6)} />
            <CustomText
              color={theme.colors.textColorQuaternary}
              fontSize={responsiveWidth(14)}
              lineHeight={responsiveWidth(19)}
              style={styles.referralName}
            >
              {title}
            </CustomText>
            <Divider height={responsiveWidth(24)} />
            <View
              style={{
                ...styles.contentWrapper,
                backgroundColor: theme.colors.backgroundSecondary,
              }}
            >
              <View style={styles.textHeader}>
                <CustomText
                  color={theme.colors.textColorPrimary}
                  fontSize={responsiveWidth(15)}
                  lineHeight={responsiveWidth(20)}
                  fontWeight="bold"
                >
                  Referral Details
                </CustomText>
              </View>
              {details.map(RenderDetailRow)}
            </View>
          </View>

          <View>
            <CustomButton
              title={'CONFIRM'}
              onPress={onConfirm}
              style={{
                ...styles.confirmButton,
              }}
            />
            <Divider height={responsiveWidth(54)} />
          </View>
        </View>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  contentWrapper: {
    borderRadius: responsiveWidth(12),
    padding: responsiveWidth(16),
  },
  notificationContainer: {
    height: responsiveWidth(56),
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#22C55E1A',
    borderRadius: responsiveWidth(8),
    paddingVertical: responsiveWidth(8),
    paddingHorizontal: responsiveWidth(12),
  },
  referralName: { textAlign: 'center' },
  textHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  value: {
    paddingLeft: responsiveWidth(15),
    textAlign: 'right',
    maxWidth: '70%',
  },
  confirmButton: {
    marginTop: responsiveWidth(12),
    height: responsiveWidth(43),
    borderRadius: responsiveWidth(8),
    backgroundColor: '#D9C28D',
  },
});

export default ReferalProgramPaySubscription;
