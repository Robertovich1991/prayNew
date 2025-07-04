import React from 'react';
import { View, StyleSheet } from 'react-native';

import { responsiveWidth } from '../../../common/utils';

import * as Assets from '../../../assets/index';

import { WINDOW_WIDTH } from '../../../helpers/dimensions';

const RedemptionListNoImage: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.plusWrapper}>
        <Assets.Icons.Plus
          color="#FFF"
          fill="#FFF"
          width={responsiveWidth(13)}
          height={responsiveWidth(13)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: WINDOW_WIDTH / 2 - responsiveWidth(26),
    height: WINDOW_WIDTH / 2 - responsiveWidth(26),
    marginBottom: responsiveWidth(12),
    borderWidth: responsiveWidth(2),
    borderColor: '#232323',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(10),
    backgroundColor: '#191919',
  },
  plusWrapper: {
    width: responsiveWidth(44),
    height: responsiveWidth(44),
    backgroundColor: '#191919',
    borderRadius: responsiveWidth(12),
    borderColor: '#232323',
    borderWidth: responsiveWidth(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RedemptionListNoImage;
