import { Dimensions, View, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import React, { useState } from 'react';
import OnboardingItem from './OnboardingItem';
import Background2 from '../assets/img/onboardingBg2.png';
import Background3 from '../assets/img/onboardingBg3.png';
import Background4 from '../assets/img/onboardingBg4.png';
import Phone2 from '../assets/img/onboardingPhone2.png';
import Phone3 from '../assets/img/onboardingPhone3.png';
import Phone4 from '../assets/img/onboardingPhone4.png';
import Phone5 from '../assets/img/onboardingPhone5.png';

const { width } = Dimensions.get('window');

const OnboardingSlider = () => {
  const onboardingItems = [
    { title: 'Prayers for\nAfrica', noWidget: true },
    {
      title: 'Subscription\nbenefits',
      bgSrc: Background2,
      phoneSrc: Phone2,
      features: true,
    },
    {
      title: 'Start your day\nwith prayer',
      bgSrc: Background3,
      phoneSrc: Phone3,
    },
    { title: 'Talk to pastors\nonline', bgSrc: Background4, phoneSrc: Phone4 },
    {
      title: 'Receive a Daily\nBlessing Prayer',
      bgSrc: Background4,
      phoneSrc: Phone5,
    },
    { title: 'BE BLESSED', noWidget: true },
  ];

  const settings = {
    sliderWidth: width,
    sliderHeight: width,
    itemWidth: width,
    data: onboardingItems,
  };

  const [, setState] = useState({ activeIndex: 0 });

  return (
    <View style={styles.wrapper}>
      <Carousel
        renderItem={item => (
          <OnboardingItem arr={onboardingItems} id={item.index} {...item} />
        )}
        pagingEnabled
        onSnapToItem={index => setState({ activeIndex: index })}
        {...settings}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
  },
});

export default OnboardingSlider;
