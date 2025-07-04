import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;

export const isSmallScreen = WINDOW_WIDTH < 375;

export const platform = {
  isAndroid: Platform.OS === 'android',
  isIOS: Platform.OS === 'ios',
  name: Platform.OS as 'android' | 'ios',
};

export const DESIGN_DIMENSIONS = {
  android: { HEIGHT: 680, WIDTH: 360 },
  ios: { HEIGHT: 812, WIDTH: 375 },
};

export const convertHeight = (height: number) => {
  if (platform.isIOS) {
    return height;
  }
  const elemHeight = typeof height === 'number' ? height : parseFloat(height);

  const calculatedHeight = PixelRatio.roundToNearestPixel(
    (WINDOW_HEIGHT * elemHeight) / DESIGN_DIMENSIONS[platform.name].HEIGHT,
  );

  return calculatedHeight;
};

export const convertWidth = (width: number) => {
  if (platform.isIOS) {
    return width;
  }

  const elemWidth = typeof width === 'number' ? width : parseFloat(width);

  const calculatedWidth = PixelRatio.roundToNearestPixel(
    (WINDOW_WIDTH * elemWidth) / DESIGN_DIMENSIONS[platform.name].WIDTH,
  );
  return calculatedWidth;
};

export const IPHONE_X_TOP_PADDING = convertHeight(44);
export const IPHONE_X_STATUSBAR_HEIGHT = convertHeight(36);
export const ANDROID_WITH_STATUSBAR_PADDING = convertHeight(24);
export const ANDROID_HEIGHT_STATUSBAR_PADDING = convertHeight(24);

export const ANDROID_STATUSBAR = StatusBar.currentHeight || 0;

export const defaultBorderRadius = platform.isIOS ? 6 : 4;
