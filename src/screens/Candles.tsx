/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import TopBar from '../components/TopBar';
import { responsiveHeight, responsiveWidth } from '../common/utils';
import Container from '../components/Container';
import PlayfairTitle from '../components/PlayfairTitle';
import { T_KEYS } from 'assets/translations';
import useOwnTranslation from 'hooks/useOwnTranslation';
import { useNavigation } from '@react-navigation/native';
import CustomText from 'components/CustomText';
import SmallCandle from '../assets/img/smallCandle.png';
import MediumCandle from '../assets/img/mediumCandle.jpg';
import BigCandle from '../assets/img/bigCandle.jpg';
import { useTheme } from '@rneui/themed';
import BackArrow from '../assets/img/icons/backArrow.svg';
import SmallCandleLight from '../assets/img/smallCandleLight.jpg';
import MediumCandleLight from '../assets/img/mediumCandleLight.jpg';
import BigCandleLight from '../assets/img/bigCandleLight.jpg';

import Video from 'react-native-video';
import Routes from 'navigation/Routes';
const { width, height } = Dimensions.get('window');

const Candles = () => {
  const t = useOwnTranslation;
  const navigation = useNavigation();
  const { theme } = useTheme();

  const allowedQuantities = [1, 5, 10];
  const [quantity, setQuantity] = useState(1);
  const [selectedDuration, setSelectedDuration] = useState(1); // default "Little"
  const [candleImage, setCandleImage] = useState(
    theme.mode === 'light' ? SmallCandleLight : SmallCandle
  );

  const sizes = [
    { value: 1, label: 'Little' },
    { value: 1.5, label: 'Medium' },
    { value: 2, label: 'Big' },
  ];

  const handleQuantityChange = (change: number) => {
    const currentIndex = allowedQuantities.indexOf(quantity);
    let newIndex = currentIndex + change;
    
    // Cycle through the allowed quantities
    if (newIndex < 0) {
      newIndex = allowedQuantities.length - 1;
    } else if (newIndex >= allowedQuantities.length) {
      newIndex = 0;
    }
    
    setQuantity(allowedQuantities[newIndex]);
  };

  const handleDurationSelect = (size: number) => {
    setSelectedDuration(size);
    if (theme.mode === 'light') {
      if (size === 1) setCandleImage(SmallCandleLight);
      else if (size === 1.5) setCandleImage(MediumCandleLight);
      else if (size === 2) setCandleImage(BigCandleLight);
    } else {
      if (size === 1) setCandleImage(SmallCandle);
      else if (size === 1.5) setCandleImage(MediumCandle);
      else if (size === 2) setCandleImage(BigCandle);
    }
  };

  const handlePurchase = () => {
    console.log(`Purchasing ${quantity} candle(s) for ${selectedDuration} minute(s)`);
  };

  const subscribeCandles = useCallback(() => {
    if (quantity > 3) {
      navigation.navigate(Routes.CANDLES_ONLINE, { candles: quantity, image: candleImage });
    }
  }, [quantity,candleImage]);

  const getPrice = () => {
    return quantity * 1; // $1 per candle
  };

  return (
    <Container>
      <View style={{ justifyContent: 'space-between', flex: 1, paddingBottom: 50 }}>
        <View>
          <View style={{ zIndex: 4 }}>
            <TopBar backArrow={true} />
          </View>
          <View style={styles.titleWrapper}>
            <PlayfairTitle>{t(T_KEYS.CANDLES_ONLINE)}</PlayfairTitle>
          </View>

          <TouchableOpacity
            onPress={subscribeCandles}
            style={[
              styles.promoBanner,
              { backgroundColor: theme.mode === 'light' ? theme.colors.buttonPrimary : '#191919' },
            ]}
          >
            {quantity < 4 && (
              <View style={styles.giftIcon}>
                <CustomText style={styles.giftText}>🎁</CustomText>
              </View>
            )}
            {quantity < 4 ? (
              <CustomText style={styles.promoText} color={theme.colors.textColorPrimary}>
                First three candles free just for you
              </CustomText>
            ) : (
              <CustomText>Candles Subscription</CustomText>
            )}
            {quantity > 3 && (
              <BackArrow
                color={theme.colors.textColorPrimary}
                width={responsiveWidth(20)}
                height={responsiveWidth(20)}
                style={{ transform: [{ rotate: '180deg' }] }}
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.videoContainer}>
          <Image style={{ height: '100%', width: '90%' }} resizeMode="cover" source={candleImage} />
          {/* <Video
            source={require('../assets/videos/sin-cards/online-candles.mp4')}
            resizeMode="cover"
            repeat
            style={styles.video}
          /> */}
        </View>

        <View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={[
                styles.quantityButton,
                { backgroundColor: theme.mode === 'light' ? theme.colors.buttonPrimary : '#0F0F0F' },
              ]}
              onPress={() => handleQuantityChange(-1)}
            >
              <CustomText style={styles.quantityButtonText} color={theme.colors.textColorPrimary}>
                --
              </CustomText>
            </TouchableOpacity>

            <View
              style={[
                styles.quantityDisplay,
                { backgroundColor: theme.mode === 'light' ? theme.colors.buttonPrimary : '#0F0F0F' },
              ]}
            >
              <CustomText style={styles.quantityText} color={'#D9C28D'}>
                {quantity} CANDLE{quantity > 1 ? 'S' : ''}
              </CustomText>
            </View>

            <TouchableOpacity
              style={[
                styles.quantityButton,
                { backgroundColor: theme.mode === 'light' ? theme.colors.buttonPrimary : '#0F0F0F' },
              ]}
              onPress={() => handleQuantityChange(1)}
            >
              <CustomText style={styles.quantityButtonText} color={theme.colors.textColorPrimary}>
                +
              </CustomText>
            </TouchableOpacity>
          </View>

          <View style={styles.durationContainer}>
            {sizes.map(size => (
              <TouchableOpacity
                key={size.value}
                style={[
                  styles.durationButton,
                  { backgroundColor: theme.mode === 'light' ? theme.colors.buttonPrimary : '#0F0F0F' },
                  selectedDuration === size.value && styles.durationButtonSelected,
                ]}
                onPress={() => handleDurationSelect(size.value)}
              >
                <CustomText
                  style={[
                    styles.durationText,
                    selectedDuration === size.value && styles.durationTextSelected,
                  ]}
                  color={'#D9C28D'}
                >
                  {size.label}
                </CustomText>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase}>
            <CustomText style={styles.purchaseButtonText} color="#FFFFFF">
              Buy {quantity} candlestick{quantity > 1 ? 's' : ''} for ${getPrice()}
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  titleWrapper: {
    marginVertical: responsiveWidth(10),
    zIndex: 4,
  },
  sliderWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(20),
    paddingTop: responsiveHeight(20),
    paddingBottom: responsiveHeight(10),
  },
  backButton: {
    padding: responsiveWidth(5),
  },
  title: {
    fontSize: responsiveWidth(24),
    fontFamily: 'PlayfairDisplay-Bold',
    letterSpacing: 1,
  },
  placeholder: {
    width: responsiveWidth(30),
  },
  promoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 8,
    backgroundColor: '#191919',
    marginHorizontal: responsiveWidth(20),
    marginBottom: responsiveHeight(30),
    paddingHorizontal: responsiveWidth(16),
    paddingVertical: responsiveWidth(12),
    borderRadius: responsiveWidth(12),
    justifyContent: 'space-between',
  },
  giftIcon: {
    marginRight: responsiveWidth(8),
  },
  giftText: {
    fontSize: responsiveWidth(16),
  },
  promoText: {
    fontSize: responsiveWidth(14),
    flex: 1,
  },
  candleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(40),
  },
  candle: {
    alignItems: 'center',
  },
  wick: {
    width: responsiveWidth(2),
    height: responsiveWidth(8),
    backgroundColor: '#000',
    marginBottom: responsiveWidth(8),
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: responsiveWidth(20),
    marginBottom: responsiveHeight(20),
  },
  quantityButton: {
    width: responsiveWidth(44),
    height: responsiveWidth(44),
    backgroundColor: '#0F0F0F',
    borderRadius: responsiveWidth(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: responsiveWidth(20),
    fontWeight: 'bold',
  },
  quantityDisplay: {
    flex: 1,
    borderColor: '#2A2A2A',
    backgroundColor: '#191919',
    borderWidth: 1,
    marginHorizontal: responsiveWidth(16),
    paddingVertical: responsiveWidth(12),
    paddingHorizontal: responsiveWidth(16),
    borderRadius: responsiveWidth(8),
    alignItems: 'center',
  },
  quantityText: {
    fontSize: responsiveWidth(14),
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  durationContainer: {
    flexDirection: 'row',
    marginHorizontal: responsiveWidth(20),
    marginBottom: responsiveHeight(20),
  },
  durationButton: {
    flex: 1,
    backgroundColor: '#191919',
    paddingVertical: responsiveWidth(12),
    paddingHorizontal: responsiveWidth(8),
    borderRadius: responsiveWidth(12),
    alignItems: 'center',
    marginHorizontal: responsiveWidth(4),
  },
  durationButtonSelected: {
    borderColor: '#D9C28D',
    borderRadius: 12,
    borderWidth: 1,
  },
  durationText: {
    fontSize: responsiveWidth(12),
    fontWeight: '500',
    textAlign: 'center',
  },
  durationTextSelected: {
    fontWeight: '600',
  },
  purchaseButton: {
    backgroundColor: '#D9C28D',
    marginHorizontal: responsiveWidth(20),
    paddingVertical: responsiveWidth(16),
    borderRadius: responsiveWidth(12),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: responsiveWidth(4),
    elevation: 5,
  },
  purchaseButtonText: {
    fontSize: responsiveWidth(16),
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  videoContainer: {
    position: 'absolute',
    width: width,
    height: height,
  },
  video: {
    width: '90%',
    height: '80%',
  },
});

export default Candles;
