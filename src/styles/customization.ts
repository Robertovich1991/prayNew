import { defaultColors } from './defaultColors';

type ColorsList = keyof typeof defaultColors;

export class CustomizationColors {
  static get(color: ColorsList, alpha?: number) {
    let currentAlpha = 'FF';
    if (alpha && typeof alpha !== 'number') {
      console.log('typeof alpha in customization color wrong');
      return defaultColors.WHITE;
    }
    if (alpha && (alpha < 0 || alpha > 1)) {
      console.log('alpha must be in range');
      return defaultColors.WHITE;
    }
    if (alpha) {
      currentAlpha = Math.ceil(alpha * 255).toString(16);
    }
    if (defaultColors[color]?.startsWith('#')) {
      return defaultColors[color] + currentAlpha;
    } else {
      return defaultColors[color];
    }
  }
}
