/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Alert, Button, Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import TopBar from '../components/TopBar';
import { responsiveHeight, responsiveWidth } from '../common/utils';
import Container from '../components/Container';
import useOwnTranslation from 'hooks/useOwnTranslation';
import CustomText from 'components/CustomText';
import { useTheme } from '@rneui/themed';
import { T_KEYS } from 'assets/translations';
import store from 'store';
import { restApiRoutes } from 'constants/rest-api';
import MediumCandleUnlight from '../assets/img/candleUnlightMedium.jpg';
import BigCandleUnlight from '../assets/img/candleUnlightBig.jpg';
import SmallCandle from '../assets/img/smallCandle.png';
import MediumCandle from '../assets/img/mediumCandle.jpg';
import BigCandle from '../assets/img/bigCandle.jpg';
import SmallCandleLight from '../assets/img/smallCandleLight.png';
import MediumCandleLight from '../assets/img/mediumCandleLight.png';
import BigCandleLight from '../assets/img/bigCandleLight.png';
import LightCandle from '../assets/img/lightCandleLight.gif'
import { useTranslation } from 'react-i18next';

import Video from 'react-native-video';
// import ToggleSwitch from 'components/ToggleSwitch';
import { useNavigation, useRoute } from '@react-navigation/native';
import Amount from '../assets/img/icons/amount.svg';
import Routes from 'navigation/Routes';
const { width, height } = Dimensions.get('window');

interface CandleData {
  small: number;
  medium: number;
  large: number;
}

interface CandleItem {
  id: number;
  userId: number;
  candleSize: 'small' | 'medium' | 'large';
  durationMinutes: number;
  lightedAt: string | null;
  expiresAt: string | null;
  status: 'purchased' | 'lighted' | 'active' | 'expired';
  purchaseId: string;
  transactionId: string;
  createdAt: string;
}

const CandlesOnline = () => {
  const {t} = useTranslation();
  const { theme } = useTheme();
  const route = useRoute();
  const navigation=useNavigation()
  const candles = (route.params as any)?.candles;
  const candleImage = (route.params as any)?.image;
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('small');
  const [candleData, setCandleData] = useState<CandleData>({
    small: 0,
    medium: 0,
    large: 0,
  });
  const [candlesArray, setCandlesArray] = useState<CandleItem[]>([]);
  const [activeCandle, setActiveCandle] = useState<CandleItem | null>(null);
  const [activeCandleSize, setActiveCandleSize] = useState<'small' | 'medium' | 'large' | ''>('');
  const sizes = React.useMemo(() => [
    { value: 'small', label: t(T_KEYS.CANDLE_SIZE_SMALL) },
    { value: 'medium', label: t(T_KEYS.CANDLE_SIZE_MEDIUM) },
    { value: 'large', label: t(T_KEYS.CANDLE_SIZE_BIG) },
  ], [t]);

  useEffect(() => {
    fetchMyCandlesData();
  }, []);


const candleQuotes = [
  "Light a candle, and darkness will disappear.",
  "One candle can light a thousand others without losing its flame.",
  "Even the smallest candle shines in the darkest night.",
  "In lighting a candle, we share our hope with the world.",
  "Let your light be a prayer the world can see.",
  "A candle loses nothing by lighting another candle.",
  "Light a candle for those we love, for those we’ve lost, and for the hope that still burns.",
  "Every candle lit is a prayer rising to the heavens.",
  "To light a candle is to declare that darkness will not win.",
  "A candle burns not only for remembrance, but for renewal.",
];

const getRandomQuote = React.useCallback(() => {
  if (!candleQuotes || candleQuotes.length === 0) {
    return "Light a candle, and darkness will disappear.";
  }
  const randomIndex = Math.floor(Math.random() * candleQuotes.length);
  return candleQuotes[randomIndex];
}, [candleQuotes]);

 
  const showRandomCandleAlert = () => {
    const quote = getRandomQuote();

    Alert.alert(
      t(T_KEYS.LIGHT_A_CANDLE_ALERT_TITLE),
      quote,
      [
        {
          text: t(T_KEYS.LIGHT_A_CANDLE_ALERT_CANCEL),
          style: 'cancel', // makes it look like a cancel action
        },
        {
          text: t(T_KEYS.LIGHT_A_CANDLE_ALERT_OK),
          onPress: () => {
            handleLightCandle()// Logs after pressing OK
          },
        },
      ],
      { cancelable: true }
    );
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Light a Candle" onPress={showRandomCandleAlert} />
    </View>
  );
}


  // Check for expired candles periodically
  useEffect(() => {
    const checkExpiration = () => {
      if (activeCandle && activeCandle.expiresAt) {
        const expiresAtTime = new Date(activeCandle.expiresAt).getTime();
        const nowTime = Date.now();

        console.log('Expires at:', expiresAtTime, 'Now:', nowTime, 'Expired:', expiresAtTime < nowTime);

        if (expiresAtTime < nowTime) {
          console.log('Candle has expired, refetching data...');
          fetchMyCandlesData();
          getCurrentCandleImage();
        }
      }
    };

    // Check immediately
    checkExpiration();

    // Set up interval to check every 10 seconds
    const interval = setInterval(checkExpiration, 10000);

    return () => clearInterval(interval);
  }, [activeCandle]);

  const fetchMyCandlesData = async () => {
    try {
      const result = await store.restApi.request<any>({
        method: 'GET',
        path: restApiRoutes.MY_CANDLES,
        withToken: true,
      });

      console.log('My Candles API Response:', result);

      if (result.purchased && !result.error) {
        // The response is an array of candle objects
        const fetchedCandles: CandleItem[] = result.purchased || result.data?.purchased || result;
        console.log('Candles Array:', fetchedCandles);
        const activeFetchedCandles: CandleItem[] = result.active || result.data?.active || [];
        if (Array.isArray(fetchedCandles)) {
          // Store the full array
          setCandlesArray(fetchedCandles);
          console.log('Fetched candles array:', fetchedCandles);
          console.log('Active candles array:', activeFetchedCandles);
        if(Array.isArray(activeFetchedCandles) && activeFetchedCandles.length > 0) { 
          setActiveCandleSize(activeFetchedCandles[0].candleSize);
        }
          // Check for active (lit) candles
          const litCandle = Array.isArray(activeFetchedCandles)
            ? activeFetchedCandles.find((candle: CandleItem) => candle.status === 'active')
            : null;

          // Check if the lit candle has expired
          if (litCandle && litCandle.expiresAt) {
            const expiresAtTime = new Date(litCandle.expiresAt).getTime();
            const nowTime = Date.now();

            console.log('Lit candle check - Expires at:', expiresAtTime, 'Now:', nowTime);

            if (expiresAtTime < nowTime) {
              console.log('Lit candle has expired at:', new Date(expiresAtTime).toISOString(), 'Current time:', new Date(nowTime).toISOString());
              // Refetch data to get updated status from backend
              setTimeout(() => fetchMyCandlesData(), 1000);
              setActiveCandle(null);
              setActiveCandleSize('')
            } else {
              setActiveCandle(litCandle);
              console.log('Active candle found:', litCandle);
              console.log('Candle expires at:', new Date(expiresAtTime).toISOString());
            }
          } else {
            setActiveCandle(litCandle || null);
            if (litCandle) {
              console.log('Active candle found:', litCandle);
            }
          }

          // Count candles by size, only counting 'purchased' status
          const counts = {
            small: 0,
            medium: 0,
            large: 0,
          };

          if (Array.isArray(fetchedCandles)) {
            fetchedCandles.forEach((candle: CandleItem) => {
              if (candle.status === 'purchased' && candle.candleSize) {
                counts[candle.candleSize] = (counts[candle.candleSize] || 0) + 1;
              }
            });
          }

          setCandleData(counts);
          console.log('Candle sizes counted:', counts);
          console.log('Total purchhhhhhhhhhhhhhhhased candles:', fetchedCandles.filter((c: CandleItem) => c.status === 'purchased').length);
        }
      }
    } catch (error) {
      console.error('Error fetching candles data:', error);
    }
  };

  // Get the current candle image based on selected size and theme
  const getCurrentCandleImage = () => {
    console.log('hhhhhhhhhhdfsdhvbdshvcdsjhbvcdjshbcdsjhcbjdshcbjhdscjdscbjhdsbcjdshbcjdscbjhdscbdscjsdbjcbds');
    
    // If there's an active candle, show the image for that size
    const sizeToShow = activeCandle ? activeCandle.candleSize : selectedSize;

    console.log('Getting image for size:', sizeToShow, 'Theme mode:', theme.mode);

    if (theme.mode === 'light') {
      if (sizeToShow === 'small' && !activeCandleSize) return SmallCandleLight;
      else if (sizeToShow === 'medium' && !activeCandleSize) return MediumCandleLight;
      else if (sizeToShow === 'large' && !activeCandleSize)  return BigCandleLight;
      else if (activeCandleSize === 'small') return LightCandle
      else if (activeCandleSize === 'medium') return LightCandle;
      else if (activeCandleSize === 'large') return LightCandle;
    } else {
      // Dark mode
      if (sizeToShow === 'small'&& !activeCandleSize) return SmallCandle;
      else if (sizeToShow === 'medium' && !activeCandleSize) return MediumCandle;
      else if (sizeToShow === 'large' && !activeCandleSize ) return BigCandleUnlight;
      else if (activeCandleSize === 'small') return LightCandle;
      else if (activeCandleSize === 'medium') return LightCandle;
      else if (activeCandleSize === 'large') return LightCandle
    }
    return SmallCandle; // default
  };

  // Get the quantity of currently selected size
  const currentQuantity = candleData[selectedSize] || 0;

  // Handle lighting a candle
  const handleLightCandle = async () => {
    try {
      // Find the first purchased candle of the selected size
      const candleToLight = Array.isArray(candlesArray) ? candlesArray.find(
        (candle) => candle.candleSize === selectedSize && candle.status === 'purchased'
      ) : null;

      if (!candleToLight) {
        console.log('No candle found to light');
        return;
      }

      console.log('Lighting candle with ID:', candleToLight.id);

      // Make POST request to light the candle
      const result = await store.restApi.request<any>({
        method: 'POST',
        path: restApiRoutes.LIGHT_CANDLE,
        withToken: true,
        body: {
          candleId: candleToLight.id,
        },
      });

      console.log('Light candle response:', result);

      if (result && !result.error) {
        console.log('Candle lit successfully!');
        // Refresh the candles data to update the UI
        await fetchMyCandlesData();
        await getCurrentCandleImage();
      } else {
        console.error('Error lighting candle:', result?.error);
      }
    } catch (error) {
      console.error('Error in handleLightCandle:', error);
    }
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
>
        <View>
          <View style={{ zIndex: 4 }}>
            <TopBar
              backArrow={true}
              textStyle={{ color: 'black' }}
           //   text={t(T_KEYS.MY_CANDLES)}
            />
          </View>
          {/* <ToggleSwitch /> */}
          {/* <CustomText fontSize={32} style={{ zIndex: 10, textAlign: 'center', fontWeight: '700', paddingTop: 50 }}>{candles} MY CANDLES</CustomText> */}
          {/* <Amount style={{ zIndex: 77, alignSelf: 'center', marginTop: 5 }} /> */}
          {/* Active Candle Message */}
          {/* Candle Size Selector */}
          <View style={styles.sizeContainer}>
            {sizes.map((size) => {
              const quantity = candleData[size.value as keyof CandleData] || 0;
              const isDisabled = !!activeCandle;
              return (
                <TouchableOpacity
                  key={size.value}
                  style={[
                    styles.sizeButton,
                    { backgroundColor: theme.mode === 'light' ? theme.colors.buttonPrimary : '#0F0F0F' },
                    selectedSize === size.value && styles.sizeButtonSelected,
                    isDisabled && styles.sizeButtonDisabled,
                  ]}
                  onPress={() => !isDisabled && setSelectedSize(size.value as 'small' | 'medium' | 'large')}
                  disabled={isDisabled}
                >
                  <CustomText
                    style={{
                      ...styles.sizeText,
                      ...(selectedSize === size.value && styles.sizeTextSelected)
                    }}
                    color={isDisabled ? '#666' : '#D9C28D'}
                  >
                    {size.label} candles {quantity}
                  </CustomText>
                </TouchableOpacity>
              );
            })}
          </View>

        </View>
        <View style={styles.videoContainer}>
          <Image style={{ height: '50%', width: '50%' }} resizeMode='center' source={getCurrentCandleImage()} />

          {/* <Video
            source={require('../assets/videos/sin-cards/online-candles.mp4')}
            resizeMode="cover"
            repeat
            style={styles.video}
          /> */}
        </View>
        {/* Message or Button */}
        <View style={{gap:8}}>
          {activeCandle ? (
            <View style={styles.messageContainer}>
              <CustomText
                fontSize={18}
                style={{ textAlign: 'center', fontWeight: '600' }}
                color={theme.colors.textColorPrimary}
              >
                A candle is currently burning
              </CustomText>
            </View>
          ) : currentQuantity === 0 ? (
            <View style={styles.messageContainer}>
              <CustomText
                fontSize={18}
                style={{ textAlign: 'center', fontWeight: '600' }}
                color={theme.colors.textColorPrimary}
              >
                You haven't got candle of that size
              </CustomText>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.purchaseButton}
              onPress={showRandomCandleAlert}
            >
              <CustomText style={styles.purchaseButtonText} color="#FFFFFF">
                Light a candle
                {t(T_KEYS.LIGHT_A_CANDLE)}
              </CustomText>
            </TouchableOpacity>
            
          )}
          <TouchableOpacity
              style={styles.purchaseButton}
              onPress={()=>navigation.navigate (Routes.CANDLES_SCREEN)}
            >
               <CustomText style={styles.purchaseButtonText} color="#FFFFFF">
                 {t(T_KEYS.BUY_CANDLES)}
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
  sizeContainer: {
    flexDirection: 'row',
    marginHorizontal: responsiveWidth(20),
    marginTop: responsiveHeight(20),
    marginBottom: responsiveHeight(10),
    zIndex: 8,
  },
  sizeButton: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    paddingVertical: responsiveWidth(12),
    paddingHorizontal: responsiveWidth(8),
    borderRadius: responsiveWidth(12),
    alignItems: 'center',
    marginHorizontal: responsiveWidth(4),
  },
  sizeButtonSelected: {
    borderColor: '#D9C28D',
    borderRadius: 12,
    borderWidth: 1,
  },
  sizeButtonDisabled: {
    opacity: 0.5,
    backgroundColor: '#333',
  },
  sizeText: {
    fontSize: responsiveWidth(12),
    fontWeight: '500',
    textAlign: 'center',
  },
  sizeTextSelected: {
    fontWeight: '600',
  },
  messageContainer: {
    backgroundColor: 'transparent',
    marginHorizontal: responsiveWidth(20),
    paddingVertical: responsiveWidth(20),
    borderRadius: responsiveWidth(12),
    alignItems: 'center',
    justifyContent: 'center',
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
    top:height/6,
    left:width/5,
    height: height,
  },
  video: {
    width: '90%',
    height: '80%',
  },
});

export default CandlesOnline;

