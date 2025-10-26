/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import TopBar from '../components/TopBar';
import { responsiveHeight, responsiveWidth } from '../common/utils';
import Container from '../components/Container';
import PlayfairTitle from '../components/PlayfairTitle';
import { T_KEYS } from 'assets/translations';
import useOwnTranslation from 'hooks/useOwnTranslation';
import { useNavigation } from '@react-navigation/native';
import CustomText from 'components/CustomText';
import CandleUnlight from '../assets/img/candleUnlightSmall.jpg'  
import MediumCandleUnlight from '../assets/img/candleUnlightMedium.jpg';
import BigCandleUnlight from '../assets/img/candleUnlightBig.jpg';
import { useTheme } from '@rneui/themed';
import SmallCandleLight from '../assets/img/smallCandleLight.png';
import MediumCandleLight from '../assets/img/mediumCandleLight.png';
import BigCandleLight from '../assets/img/bigCandleLight.png';

import Video from 'react-native-video';
import Routes from 'navigation/Routes';
import { StackNavigationProp } from '@react-navigation/stack';
import * as RNIap from 'react-native-iap';
import store from 'store';
const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  [Routes.CANDLES_ONLINE]: { candles: number; image: any };
};

type Props = StackNavigationProp<RootStackParamList>;

const Candles = () => {
  const t = useOwnTranslation;
  const navigation = useNavigation<Props>();
  const { theme } = useTheme();

  const allowedQuantities = [1, 5, 10];
  const [quantity, setQuantity] = useState(1);
  const [selectedDuration, setSelectedDuration] = useState(1); // default "Small"
  const [candleImage, setCandleImage] = useState(
    theme.mode === 'light' ? SmallCandleLight : MediumCandleUnlight
  );

  const sizes = [
    { value: 1, label: t(T_KEYS.CANDLE_SIZE_SMALL) },
    { value: 1.5, label: t(T_KEYS.CANDLE_SIZE_MEDIUM) },
    { value: 2, label: t(T_KEYS.CANDLE_SIZE_BIG) },
  ];

  const productIds = ["candle_1",
    "candle_5",
    "candle_10",
    "candle_medium_1",
    "candle_medium_5",
    "candle_medium_10",
    "candle_big_1",
    "candle_big_5",
    "candle_big_10",
    "candle_big_1",
    "candle_big_5",
    "candle_big_10"]

    useEffect(() => {
      async function init() {
        try {
          const suc= await RNIap.initConnection();
          setTimeout(async () => {
             await RNIap.getSubscriptions({skus:productIds});
            const x= await RNIap.getProducts({skus:productIds});           
          }, 1000); // Wait 1 second        console.log(products,'[[[[[[[[gggggggggggggggggg[[[[[[[[[[[[[[')
        } catch (err) {
          console.log(err);
        }
      }
      init();
      return () => {
      //  RNIap.endConnection();
      };
     }, []);

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
      if (size === 1) setCandleImage(MediumCandleUnlight);
      else if (size === 1.5) setCandleImage(MediumCandleUnlight);
      else if (size === 2) setCandleImage(BigCandleUnlight);
    }
  };

  // Product ID mapping based on quantity and size
  const getProductId = () => {
    // Map size to product name: 1 = small, 1.5 = medium, 2 = big
    const sizeMap: { [key: number]: string } = {
      1: '',          // Small candles (no prefix)
      1.5: 'medium_', // Medium candles
      2: 'big_',      // Big candles
    };

    const sizePrefix = sizeMap[selectedDuration] || '';
    return `candle_${sizePrefix}${quantity}`;
  };

 
  const handleBuyProducts = async () => {
    const productId = getProductId();
    console.log('Attempting to purchase:', productId);

    try {
      const skus = await RNIap.requestSubscription({
        sku: productId,
      });

      console.log('Purchase successful:', skus);
      const result = await store.donationsStore.sendCandlesTransaction(skus);
console.log(result,'==--==--==--jjjkkk==--==--==--==--kkkkkk');

      // You can add additional logic here to handle the purchase
      // For example, sending the transaction to your backend
      Alert.alert(
        t(T_KEYS.PURCHASE_SUCCESSFUL),
        `${t(T_KEYS.SUCCESSFULLY_PURCHASED)} ${quantity} ${selectedDuration === 1 ? t(T_KEYS.CANDLE_SIZE_SMALL) : selectedDuration === 1.5 ? t(T_KEYS.CANDLE_SIZE_MEDIUM) : t(T_KEYS.CANDLE_SIZE_BIG)} ${quantity > 1 ? t(T_KEYS.CANDLES) : t(T_KEYS.CANDLE)}`,
        [{ text: 'OK' }]
      );

    } catch (error) {
      if (error instanceof RNIap.PurchaseError) {
        console.log({ message: `[${error.code}]: ${error.message}`, error });
        console.log(
          'Purchase Error',
          error.message,
          [{ text: 'OK' }]
        );
      } else {
        console.log('Purchase error:', error);
        console.log(
          'Purchase Error',
          'Unable to complete purchase. Please try again later.',
          [{ text: 'OK' }]
        );
      }
    }
  };

  const subscribeCandles = useCallback(() => {
    navigation.navigate(Routes.CANDLES_ONLINE);

  }, [quantity, candleImage, navigation]);

  const getPrice = () => {
    // Price structure based on quantity and size (matching StoreKit)
    const priceMap: { [key: number]: { [key: number]: number } } = {
      1: { 1: 0.99, 1.5: 1.99, 2: 2.99 },    // Small: $0.99, Medium: $1.99, Big: $2.99
      5: { 1: 4.99, 1.5: 7.99, 2: 12.99 },   // Small: $4.99, Medium: $7.99, Big: $12.99
      10: { 1: 9.99, 1.5: 13.99, 2: 24.99 }, // Small: $9.99, Medium: $13.99, Big: $24.99
    };
    return priceMap[quantity]?.[selectedDuration] || 0;
  };

  return (
    <Container>
<View
  style={{
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor:
      theme.mode === 'light'
        ? '#FBFCFC'
        : 'black',
    paddingBottom: 50,
  }}
>        <View>
          <View style={{ zIndex: 4, paddingTop: 10, paddingHorizontal: 20 }}>
            <TopBar backArrow={true} />
          </View>
          <View style={styles.titleWrapper}>
            <PlayfairTitle>{t(T_KEYS.CANDLES_ONLINE)}</PlayfairTitle>
          </View>

        

        </View>

        <View style={styles.videoContainer}>
          <Image style={{ height: '90%', width: '90%' }} resizeMode="center" source={candleImage} />
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
                -
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
                  style={{
                    ...styles.durationText,
                    ...(selectedDuration === size.value && styles.durationTextSelected)
                  }}
                  color={'#D9C28D'}
                >
                  {size.label}
                </CustomText>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.purchaseButton} onPress={()=>handleBuyProducts()}>
            <CustomText style={styles.purchaseButtonText} color="#FFFFFF">
              {quantity > 1 ? t(T_KEYS.BUY_CANDLESTICKS) : t(T_KEYS.BUY_CANDLESTICK)} {quantity} {t(T_KEYS.FOR_PRICE)} ${getPrice()}
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
  subscriptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 8,
    backgroundColor: '#191919',
    marginHorizontal: responsiveWidth(20),
    marginBottom: responsiveHeight(30),
    paddingHorizontal: responsiveWidth(16),
    paddingVertical: responsiveWidth(12),
    borderRadius: responsiveWidth(12),
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
