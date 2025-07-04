import React, { useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import Cross from '../assets/img/animatedCross.png';
import CrossLight from '../assets/img/animatedCrossLight.png';
import BlessedCross from '../assets/img/blessedCross.png';
import CrossBg from '../assets/img/animatedCrossBg.png';
import Ray from '../assets/img/animatedCrossRay.png';
import { useTheme } from '@rneui/themed';

interface IAnimatedCrossProps {
  isBlessed?: boolean;
}

const AnimatedCross = (props: IAnimatedCrossProps) => {
  const { theme } = useTheme();

  const firstBeat = useRef(new Animated.Value(0)).current;
  const secondBeat = useRef(new Animated.Value(0)).current;
  const thirdBeat = useRef(new Animated.Value(0)).current;
  const fourthBeat = useRef(new Animated.Value(0)).current;

  const resize = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const rotateRays = useRef(new Animated.Value(0)).current;

  Animated.loop(
    Animated.sequence([
      Animated.timing(firstBeat, {
        toValue: 1,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(firstBeat, {
        toValue: 0,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
        delay: 100,
      }),
      Animated.timing(secondBeat, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(secondBeat, {
        toValue: 0,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(thirdBeat, {
        toValue: 1,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(thirdBeat, {
        toValue: 0,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
        delay: 50,
      }),
      Animated.timing(fourthBeat, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(fourthBeat, {
        toValue: 0,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
        delay: 100,
      }),
    ]),
    {
      iterations: -1,
    },
  ).start();

  Animated.loop(
    Animated.sequence([
      Animated.timing(resize, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(resize, {
        toValue: 0,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]),
    {
      iterations: -1,
    },
  ).start();

  Animated.loop(
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]),
    {
      iterations: -1,
    },
  ).start();

  Animated.loop(
    Animated.sequence([
      Animated.timing(rotateRays, {
        toValue: 1,
        duration: 50000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]),
    {
      iterations: -1,
    },
  ).start();

  return (
    <View style={styles.animationWrapper}>
      {theme.mode === 'dark' && (
        <>
          <Animated.Image
            source={Ray}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
              top: '-25%',
              opacity: 0.5,
              zIndex: props.isBlessed ? 1 : 0,
              transform: [
                {
                  rotate: rotateRays.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
                {
                  scaleX: resize.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.85, 1.65],
                  }),
                },
                {
                  scaleY: resize.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.85, 1.65],
                  }),
                },
              ],
            }}
          />
          <Animated.Image
            source={Ray}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
              top: '-25%',
              opacity: props.isBlessed ? 1 : 0.5,
              zIndex: props.isBlessed ? 1 : 0,
              transform: [
                {
                  rotate: rotateRays.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['360deg', '0deg'],
                  }),
                },
                {
                  scaleX: resize.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1.15, 1.65],
                  }),
                },
                {
                  scaleY: resize.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1.15, 1.65],
                  }),
                },
              ],
            }}
          />

          {/* нижний луч */}
          {/* нижний луч */}
          <Animated.Image
            source={Ray}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
              top: '20%',
              opacity: props.isBlessed ? 1 : 0.5,
              transform: [
                {
                  scaleX: resize.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.85, 1.35],
                  }),
                },
                {
                  scaleY: resize.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.85, 1.35],
                  }),
                },
              ],
            }}
          />

          {/* подложка */}
          {/* подложка */}
          <Animated.Image
            source={CrossBg}
            style={{
              position: 'absolute',
              width: '100%',
              resizeMode: 'contain',
              height: '100%',
              top: '8%',
              opacity: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0.4, 0.6],
              }),
              transform: [
                {
                  scaleX: resize.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1.8, 2.1],
                  }),
                },
                {
                  scaleY: resize.interpolate({
                    inputRange: [0, 1],
                    outputRange: [2.1, 2.15],
                  }),
                },
              ],
            }}
          />
        </>
      )}

      {/* крест */}
      {/* крест */}
      {!props.isBlessed && (
        <Animated.Image
          source={theme.mode === 'dark' ? Cross : CrossLight}
          style={{
            transform: [
              {
                scaleX: firstBeat.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.995],
                }),
              },
              {
                scaleY: firstBeat.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.995],
                }),
              },
              {
                scaleX: secondBeat.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.015],
                }),
              },
              {
                scaleY: secondBeat.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.015],
                }),
              },
              {
                scaleX: thirdBeat.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.99],
                }),
              },
              {
                scaleY: thirdBeat.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.99],
                }),
              },
              {
                scaleX: fourthBeat.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.005],
                }),
              },
              {
                scaleY: fourthBeat.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.005],
                }),
              },
            ],
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
        />
      )}
      {props.isBlessed && (
        <Animated.Image
          source={BlessedCross}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
            transform: [
              {
                scaleX: resize.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1.1, 1],
                }),
              },
              {
                scaleY: resize.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1.1, 1],
                }),
              },
            ],
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  animationWrapper: {
    width: '100%',
    height: '100%',
  },
});

export default AnimatedCross;
