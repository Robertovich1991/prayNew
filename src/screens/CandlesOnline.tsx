/* eslint-disable react-hooks/exhaustive-deps */
import React, { } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import TopBar from '../components/TopBar';
import { responsiveHeight, responsiveWidth } from '../common/utils';
import Container from '../components/Container';
import useOwnTranslation from 'hooks/useOwnTranslation';
import CustomText from 'components/CustomText';

import Video from 'react-native-video';
import ToggleSwitch from 'components/ToggleSwitch';
import { useRoute } from '@react-navigation/native';
import Amount from '../assets/img/icons/amount.svg'
const { width, height } = Dimensions.get('window');

const CandlesOnline = () => {
  const t = useOwnTranslation;
  const route = useRoute()
  const candles = route?.params?.candles
const candleImage=route?.params?.image
console.log(candleImage,'....................................................');

  return (
    <Container>
      <View
        style={{ justifyContent: 'space-between', flex: 1, paddingBottom: 50 }}
      >
        <View>
          <View style={{ zIndex: 4 }}>
            <TopBar
              backArrow={true}
              textStyle={{ color: 'white' }}
              text="Candles Subscription"
            />
          </View>
          <ToggleSwitch />
          <CustomText fontSize={32} style={{ zIndex: 10, textAlign: 'center', fontWeight: '700', paddingTop: 50 }}>{candles} CANDLES</CustomText>
          <Amount style={{ zIndex: 77, alignSelf: 'center', marginTop: 5 }} />

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
        {/* Quantity Selector */}
        <View>
          <TouchableOpacity
            style={styles.purchaseButton}
          >
            <CustomText style={styles.purchaseButtonText} color="#FFFFFF">
              Purchase a subscription
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

export default CandlesOnline;
