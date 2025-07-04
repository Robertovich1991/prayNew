import { useMemo } from 'react';
import { Dimensions, PixelRatio, Platform } from 'react-native';
import { format, secondsToMinutes } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { STORAGE_IMAGES_BUCKET_URL } from '../constants/AppConfig';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const widthScale = screenWidth / 414;
const pixelRat = PixelRatio.get();

export const platform = Platform.OS;

export const aspectRatio =
  Dimensions.get('window').height / Dimensions.get('window').width;

console.log('UTILS:', {
  screenWidth,
  screenHeight,
  widthScale,
  pixelRat,
  aspectRatio,
});

export function validateEmail(email: string): boolean {
  const regexp1 =
    // eslint-disable-next-line no-control-regex
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const regexp2 =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return (
    regexp1.test(String(email.trim()).toLowerCase()) &&
    regexp2.test(String(email.trim()).toLowerCase())
  );
}

export function responsiveWidth(number: number) {
  // const scale = screenWidth / 375;
  // const scale = screenWidth / screenWidth;
  // const newSize = number * scale
  const newSize = number;

  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export function responsiveHeight(number: number) {
  const scale = screenHeight / 812;
  const newSize = number * scale;

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export function vw(number: number) {
  return Math.round((screenWidth / 100) * number);
}

export function vh(number: number) {
  return Math.round((screenHeight / 100) * number);
}

// ToDo: add localization
/**
 *
 * @param date
 * @returns 'Something like this - 28 JUNE 2021'
 */
export const convertDateForTitles = (date: number | Date) => {
  return format(date, 'd MMMM yyyy', { locale: enGB });
};

export const formatVideoCurrentTime = (time: number) => {
  return secondsToMinutes(time) + ':' + (time % 60).toString().padStart(2, '0');
};

export const useCndUrl = (titleImageUrl: string | undefined) => {
  return useMemo(() => {
    if (titleImageUrl?.startsWith('http')) {
      return titleImageUrl;
    }
    return STORAGE_IMAGES_BUCKET_URL + titleImageUrl || '';
  }, [titleImageUrl]);
};

// ToDo
export const validateUsdtWallet = (usdtWallet: string) => {
  if (usdtWallet.length > 5) {
    return true;
  }

  return false;
};
