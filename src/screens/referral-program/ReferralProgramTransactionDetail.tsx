import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';

import * as CustomNavigationProps from '../../navigation/navigationProps';
import Routes from '../../navigation/Routes';

import * as Assets from '../../assets/index';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import Divider from '../../components/Divider';
import ReferralBalance from '../../components/ReferralBalance';
import TopBar from '../../components/TopBar';

import { responsiveWidth } from '../../common/utils';

const TransactionNotification: React.FC<{
  referralName: string;
  interrestPercent: number;
}> = ({ referralName, interrestPercent }) => {
  return (
    <View style={styles.notificationContainer}>
      <Assets.Icons.Diamond
        fill={'#22C55E'}
        width={responsiveWidth(23.7)}
        height={responsiveWidth(18.76)}
      />
      <CustomText color={'#22C55E'} style={{ marginLeft: responsiveWidth(8) }}>
        {`You have received a new bonus: ${interrestPercent}% for subscription of your referral ${referralName}`}
      </CustomText>
    </View>
  );
};

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

const ReferalProgramTransactionDetail = () => {
  const { params } =
    useRoute<
      RouteProp<
        CustomNavigationProps.YourReferrals,
        Routes.REFERRAL_PROGRAM_TRANSACTION_DETAIL
      >
    >();

  console.log({ params: params.referralTransaction });

  const { referralTransaction } = params;
  const {
    grade,
    referralName,
    amountSpentByReferralsInUSD,
    accruedBonus,
    totalBonusesAfterAccrual,
  } = referralTransaction;

  const { theme } = useTheme();

  const details = [
    {
      title: 'Referral Name',
      value: referralName,
    },
    {
      title: 'Amount spent by the referral',
      value: `$${amountSpentByReferralsInUSD}`,
    },
    {
      title: 'Accrued bonus',
      value: String(accruedBonus),
    },
    {
      title: 'Total bonuses after accrual',
      value: String(totalBonusesAfterAccrual),
    },
  ];

  return (
    <View>
      <Container>
        <TopBar text={'New Bonus Accrual'} backArrow={true} />
        <ScrollView>
          <Divider height={responsiveWidth(20)} />
          <ReferralBalance totalReferralBalance={'+' + accruedBonus} />
          <Divider height={responsiveWidth(6)} />
          <CustomText
            color={theme.colors.textColorQuaternary}
            fontSize={responsiveWidth(14)}
            lineHeight={responsiveWidth(19)}
            style={styles.referralName}
          >
            Charles Stanley
          </CustomText>
          <Divider height={responsiveWidth(24)} />
          <TransactionNotification
            referralName={referralName}
            interrestPercent={grade}
          />
          <Divider height={responsiveWidth(12)} />
          <View
            style={{
              ...styles.container,
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
        </ScrollView>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
});

export default ReferalProgramTransactionDetail;
