import React from 'react';
import { View, StyleSheet } from 'react-native';

import CustomText from '../../../components/CustomText';

import { responsiveWidth } from '../../../common/utils';
import * as Assets from '../../../assets/index';

import { T_KEYS } from '../../../assets/translations';
import useOwnTranslation from 'hooks/useOwnTranslation';

import { useTheme } from '@rneui/themed';

import Divider from '../../../components/Divider';
import ReferralBalance from '../../../components/ReferralBalance';

type LoyaltyStatusWidgetProps = {
  referralCounterForFreeSub: number;
  totalReferralBalance: number;
  totalReferralCounter: number;
};

const LoyaltyStatusWidget: React.FC<LoyaltyStatusWidgetProps> = props => {
  const { theme } = useTheme();

  const t = useOwnTranslation;

  const {
    referralCounterForFreeSub,
    totalReferralBalance,
    totalReferralCounter,
  } = props;

  const progressInPercent =
    (totalReferralCounter / referralCounterForFreeSub) * 100;

  return (
    <View>
      <Divider height={responsiveWidth(20)} />
      <ReferralBalance totalReferralBalance={String(totalReferralBalance)} />
      <View style={styles.descriptionContainer}>
        <CustomText color={theme.colors.textColorTertiary}>
          {t(T_KEYS.LOYALTY_STATUS)}
        </CustomText>
        <View
          style={{
            ...styles.descriptionDivider,
            backgroundColor: theme.colors.textColorTertiary,
          }}
        />
        <CustomText color={theme.colors.textColorTertiary}>
          {totalReferralCounter + ' ' + t(T_KEYS.REFERRALS)}
        </CustomText>
      </View>
      <Divider height={responsiveWidth(20)} />
      <ProgressBar progress={progressInPercent} />
      {progressInPercent === 100 ? (
        <>
          <Divider height={responsiveWidth(12)} />
          <FreeSubscriptionAvailability />
        </>
      ) : (
        <CustomText
          color={theme.colors.textColorTertiary}
          style={styles.requiredReferralsDescription}
        >
          {t(T_KEYS.INVITE_MORE_REFERRALS_TO_GET_FREE_SUBSCRIPTION).replace(
            '%%REFERRAL_COUNTER%%',
            String(referralCounterForFreeSub - totalReferralCounter),
          )}
        </CustomText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionContainer: {
    marginTop: responsiveWidth(6),
    height: responsiveWidth(19),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionDivider: {
    marginLeft: responsiveWidth(6),
    width: responsiveWidth(4),
    height: responsiveWidth(4),
    borderRadius: responsiveWidth(2),
    marginRight: responsiveWidth(7.5),
  },
  requiredReferralsDescription: {
    marginTop: responsiveWidth(12),
    fontSize: responsiveWidth(14),
    lineHeight: responsiveWidth(19),
    textAlign: 'center',
  },
});

const ProgressBar: React.FC<{ progress: number }> = props => {
  let width = '0%';

  if (
    !Number.isNaN(props.progress) &&
    props.progress <= 100 &&
    props.progress >= 0
  ) {
    width = props.progress + '%';
  }

  return (
    <View style={barStyles.container}>
      <View style={{ ...barStyles.bar, width }} />
    </View>
  );
};

const barStyles = StyleSheet.create({
  container: {
    height: responsiveWidth(9),
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#F3F3F3',
    borderRadius: responsiveWidth(4.5),
  },
  bar: {
    height: '100%',
    backgroundColor: '#22C55E',
    borderRadius: responsiveWidth(4.5),
  },
});

const FreeSubscriptionAvailability: React.FC = () => {
  const t = useOwnTranslation;
  return (
    <View style={availabilityStyles.container}>
      <Assets.Icons.Diamond
        fill={'#22C55E'}
        width={responsiveWidth(23.7)}
        height={responsiveWidth(18.76)}
      />
      <CustomText color={'#22C55E'} style={{ marginLeft: responsiveWidth(8) }}>
        {t(T_KEYS.YOUR_NEXT_SUBSCRIPTION_WILL_BE_FREE)}
      </CustomText>
    </View>
  );
};

const availabilityStyles = StyleSheet.create({
  container: {
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
});

export default LoyaltyStatusWidget;
