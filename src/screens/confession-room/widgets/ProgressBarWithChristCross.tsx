import { responsiveWidth } from 'common/utils';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import * as Assets from '../../../assets';

const SIZE = responsiveWidth(64);
const STROKE_WIDTH = responsiveWidth(4);
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ProgressBarWithChristCross = ({ progress = 20 }) => {
  const strokeDashoffset = CIRCUMFERENCE - (CIRCUMFERENCE * progress) / 100;

  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE} style={StyleSheet.absoluteFill}>
        {/* Back (white) */}
        <Circle
          stroke="#F6F6F6"
          fill="none"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          strokeWidth={STROKE_WIDTH}
        />
        {/* Foreground (progress) */}
        <Circle
          stroke="#CDB587"
          fill="none"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation={-90}
          originX={SIZE / 2}
          originY={SIZE / 2}
        />
      </Svg>
      {/* Cross */}
      <Assets.Icons.ChristCross
        width={responsiveWidth(18)}
        height={responsiveWidth(28)}
        fill="#CDB587"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProgressBarWithChristCross;
