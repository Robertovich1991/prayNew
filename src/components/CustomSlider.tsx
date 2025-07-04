import { Dimensions, View, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import React, { useEffect, useState } from 'react';
import { responsiveWidth } from '../common/utils';
import store from 'store';
import CarouselItem from './CarouselItem';
import { observer } from 'mobx-react';
import { CustomizationColors } from 'styles/customization';

const { width } = Dimensions.get('window');

const CustomSlider = () => {
  const settings = {
    sliderWidth: width - responsiveWidth(40),
    sliderHeight: width,
    itemWidth: width - responsiveWidth(40),
  };

  const [state, setState] = useState({ activeIndex: 0 });

  useEffect(() => {
    store.subscriptionsStore.fetchSubscriptions();
  }, []);

  return (
    <View style={styles.wrapper}>
      <Carousel
        renderItem={item => <CarouselItem {...item} />}
        pagingEnabled
        onSnapToItem={index => setState({ activeIndex: index })}
        data={store.subscriptionsStore.subscriptions}
        {...settings}
      />
      <View style={styles.paginationWrapper}>
        <Pagination
          dotStyle={styles.paginationWrapperDotStyle}
          containerStyle={styles.paginationWrapperContainerStyle}
          inactiveDotScale={1}
          inactiveDotStyle={styles.paginationWrapperInactiveDotStyle}
          dotsLength={store.subscriptionsStore.subscriptions.length}
          activeDotIndex={state.activeIndex}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
  },
  paginationWrapper: {
    height: responsiveWidth(35),
    justifyContent: 'center',
  },
  paginationWrapperDotStyle: {
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    borderRadius: responsiveWidth(50),
    backgroundColor: CustomizationColors.get('WHITE'),
  },
  paginationWrapperContainerStyle: {
    paddingVertical: 0,
  },
  paginationWrapperInactiveDotStyle: {
    backgroundColor: CustomizationColors.get('GREY_TERTIARY'),
  },
});

export default observer(CustomSlider);
