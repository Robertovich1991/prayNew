/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing, ViewStyle } from 'react-native';

// import { style, styleSheetFlatten } from '../../helpers/styles';

interface SpinnerProps {
  containerStyle?: ViewStyle;
}

const Spinner: React.FC<SpinnerProps> = ({ containerStyle = {} }) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        delay: 0,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      {
        iterations: -1,
      },
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.Image
        style={[{ transform: [{ rotate: spin }] }, styles.image]}
        source={require('assets/img/spinner.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 33,
    height: 33,
  },
});

export default Spinner;
