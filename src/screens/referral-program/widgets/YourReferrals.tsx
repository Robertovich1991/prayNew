import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@rneui/themed';
import BottomSheet from '@gorhom/bottom-sheet';

import * as Assets from '../../../assets/index';
import { T_KEYS } from '../../../assets/translations/index';

import { responsiveWidth } from '../../../common/utils';
import useOwnTranslation from '../../../hooks/useOwnTranslation';

import CustomText from '../../../components/CustomText';
import PlayfairTitle from '../../../components/PlayfairTitle';
import Divider from '../../../components/Divider';

import { extractFilterStateTitle } from './common';
import ReferralElement from './ReferralElement';

const YourReferrals: React.FC<{
  bottomSheetRef: React.RefObject<BottomSheet>;
  filterState: FilterState;
  referrals: ReferralTransaction[];
}> = props => {
  const { theme } = useTheme();
  const t = useOwnTranslation;

  const { bottomSheetRef, filterState, referrals } = props;

  const onWithdrawBonusPressed = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <View>
      <View style={styles.container}>
        <PlayfairTitle style={styles.titleText}>
          {'Your referrals'}
        </PlayfairTitle>
        <Divider height={responsiveWidth(12)} />
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={onWithdrawBonusPressed}>
            <View style={styles.filtersContainer}>
              <Assets.Icons.FilterApply
                color={theme.colors.backgroundPrimary}
                width={responsiveWidth(15)}
                height={responsiveWidth(15)}
              />
              <CustomText
                color={theme.colors.backgroundPrimary}
                lineHeight={responsiveWidth(19)}
                fontSize={responsiveWidth(14)}
                style={{ marginLeft: responsiveWidth(8) }}
              >
                {t(T_KEYS.FILTERS)}
              </CustomText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.attributeContainer,
              backgroundColor: theme.colors.backgroundSecondary,
            }}
          >
            <CustomText
              color={theme.colors.textColorPrimary}
              lineHeight={responsiveWidth(19)}
              fontSize={responsiveWidth(14)}
            >
              {extractFilterStateTitle(filterState)}
            </CustomText>
            <Assets.Icons.ClosingCross
              color={theme.colors.textColorPrimary}
              width={responsiveWidth(10.61)}
              height={responsiveWidth(10.61)}
              style={{ marginLeft: responsiveWidth(13) }}
            />
          </TouchableOpacity>
        </View>
        <Divider height={responsiveWidth(12)} />
        <View style={styles.listWrapper}>
          {referrals.map((val, index) => {
            return <ReferralElement key={index} {...val} />;
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titleText: {
    width: '100%',
    textAlign: 'left',
    lineHeight: responsiveWidth(36),
  },
  listWrapper: {
    flexDirection: 'column',
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  filtersContainer: {
    height: responsiveWidth(36),
    backgroundColor: '#D9C28D',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(12),
    borderRadius: responsiveWidth(8),
  },
  attributeContainer: {
    marginLeft: responsiveWidth(8),
    paddingHorizontal: responsiveWidth(12),

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(8),
    flexDirection: 'row',
  },
});

export default YourReferrals;
