import React from 'react';
import { View, StyleSheet } from 'react-native';
import { intervalToDuration } from 'date-fns';

import { responsiveWidth } from '../../../common/utils';

import CustomText from '../../../components/CustomText';

type CountdownTimerProps = {
  secondsLeft: number;
};

const SurveyCountdownTimer: React.FC<CountdownTimerProps> = ({
  secondsLeft,
}) => {
  const duration = intervalToDuration({
    start: 0,
    end: secondsLeft * 1000,
  });
  const formattedTime =
    duration.minutes?.toString().padStart(2, '0') +
    ':' +
    duration.seconds?.toString().padStart(2, '0');

  return (
    <View style={styles.counterWrapper}>
      <CustomText
        fontSize={responsiveWidth(24)}
        lineHeight={responsiveWidth(33)}
        fontWeight="bold"
        color="#D9C28D"
      >
        {formattedTime}
      </CustomText>
      <CustomText
        fontSize={responsiveWidth(12)}
        lineHeight={responsiveWidth(16)}
        color="#FFF"
      >
        time left
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  counterWrapper: { alignItems: 'center' },
});

export default SurveyCountdownTimer;
