import { createTheme } from '@rneui/themed';

import { defaultColors, lightThemeColors } from './defaultColors';
export const theme = createTheme({
  lightColors: {
    backgroundPrimary: lightThemeColors.WHITE,
    backgroundSecondary: lightThemeColors.GREY_SECONDARY,
    buttonPrimary: lightThemeColors.GREY_SECONDARY,
    buttonTertiary: lightThemeColors.GREY_SECONDARY,
    textColorPrimary: lightThemeColors.BLACK,
    textColorSecondary: lightThemeColors.BLACK,
    textColorTertiary: lightThemeColors.BLACK,
    textColorQuaternary: lightThemeColors.GREY_TERTIARY,
    blackPrimaryToWhite: lightThemeColors.WHITE,
  },
  darkColors: {
    backgroundPrimary: defaultColors.BLACK_TERTIARY,
    backgroundSecondary: defaultColors.BLACK_PRIMARY,
    buttonPrimary: defaultColors.BLACK_SECONDARY,
    buttonTertiary: defaultColors.BLACK_PRIMARY,
    textColorPrimary: defaultColors.WHITE,
    textColorSecondary: defaultColors.GREY_PRIMIARY,
    textColorTertiary: defaultColors.GREY_SECONDARY,
    textColorQuaternary: defaultColors.GREY_TERTIARY,
    blackPrimaryToWhite: defaultColors.BLACK_PRIMARY,
  },
  mode: 'dark',
});
