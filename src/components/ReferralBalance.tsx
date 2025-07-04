import React from 'react';
import { View, StyleSheet } from 'react-native';

import CustomText from '../components/CustomText';

import { responsiveHeight, responsiveWidth } from '../common/utils';
import * as Assets from '../assets';

import { useTheme } from '@rneui/themed';

const ReferralBalance: React.FC<{ totalReferralBalance: string }> = props => {
  const { theme } = useTheme();

  const { totalReferralBalance } = props;

  return (
    <View style={styles.container}>
      <CustomText
        fontSize={responsiveWidth(36)}
        lineHeight={responsiveWidth(49)}
        color={theme.colors.textColorPrimary}
        fontWeight={'bold'}
      >
        {totalReferralBalance}
      </CustomText>
      <View
        style={{
          ...styles.crossImageContainer,
          backgroundColor: theme.colors.textColorPrimary,
        }}
      >
        <Assets.Icons.ChristCross style={styles.crossImage} fill={'#D9C28D'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  crossImageContainer: {
    marginLeft: responsiveWidth(6),
    width: responsiveWidth(24),
    height: responsiveWidth(24),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(12),
  },
  crossImage: { height: responsiveHeight(13), resizeMode: 'contain' },
});

export default ReferralBalance;
