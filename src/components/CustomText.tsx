import React from 'react';
import { ColorValue, Text, TextStyle } from 'react-native';
import { responsiveWidth } from '../common/utils';
import { useTheme } from '@rneui/themed';

interface ICustomTextProps {
  style?: TextStyle;
  fontSize?: number;
  lineHeight?: number;
  color?: ColorValue;
  children?: string | number | Date | React.ReactNode;
  fontFamily?: string;
  onPress?: () => void;
  numberOfLines?: number;
  fontWeight?: 'normal' | 'light' | 'bold';
  ellipsizeMode?: 'clip' | 'head' | 'middle' | 'tail';
}

const CustomText = (props: ICustomTextProps) => {
  const { theme } = useTheme();
  let {
    fontSize = responsiveWidth(15),
    color = theme.colors.textColorPrimary,
    lineHeight = responsiveWidth(20),
    fontFamily = 'NotoSans-Regular',
    fontWeight = 'normal',
  } = props;

  if (fontWeight === 'light') {
    fontFamily = 'NotoSans-Light';
  }

  if (fontWeight === 'bold') {
    fontFamily = 'NotoSans-Bold';
  }

  return (
    <Text
      ellipsizeMode={props.ellipsizeMode}
      numberOfLines={props.numberOfLines}
      onPress={props.onPress}
      style={[props.style, { fontSize, color, lineHeight, fontFamily }]}
    >
      {props.children}
    </Text>
  );
};

export default CustomText;
