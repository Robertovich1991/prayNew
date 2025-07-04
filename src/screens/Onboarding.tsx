import { useTheme } from '@rneui/themed';
import OnboardingSlider from 'components/OnboardingSlider';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Onboarding = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.backgroundPrimary,
      }}
    >
      <View style={styles.sliderWrapper}>
        <OnboardingSlider />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  sliderWrapper: {
    flex: 1,
  },
});

export default Onboarding;
