import React from 'react';
import {
  ColorValue,
  StyleSheet,
  TouchableHighlight,
  ViewStyle,
  Text,
  View,
} from 'react-native';
import { responsiveWidth } from '../common/utils';
import Google from '../assets/img/icons/google.svg';
import Apple from '../assets/img/icons/apple.svg';
import { useTheme } from '@rneui/themed';

interface ICustomButtonProps {
  title: string;
  style?: ViewStyle;
  onPress: () => void;
  width?: '100%';
  appleSvg?: boolean;
  appleActive?: boolean;
  googleSvg?: boolean;
  googleActive?: boolean;
  height?: number;
  backgroundColor?: ColorValue;
  borderRadius?: number;
  alignItems?: 'center';
  justifyContent?: 'center';
  disabled?: boolean;
}

const AuthButton = (props: ICustomButtonProps) => {
  const { theme } = useTheme();
  const {
    height = responsiveWidth(52),
    backgroundColor = theme.colors.buttonPrimary,
    borderRadius = responsiveWidth(12),
    width = '100%',
    alignItems = 'center',
    justifyContent = 'center',
    disabled,
  } = props;

  return (
    <TouchableHighlight
      style={[
        {
          height,
          backgroundColor,
          borderRadius,
          width,
          alignItems,
          justifyContent,
        },
        props.style,
      ]}
      activeOpacity={1}
      underlayColor="#191919"
      onPress={() => props.onPress()}
      disabled={disabled}
    >
      <View style={styles.captionContainer}>
        {props.appleSvg && (
          <Apple
            fill={'#fff'}
            width={responsiveWidth(20)}
            height={responsiveWidth(20)}
          />
        )}
        {props.googleSvg && (
          <Google
            fill={theme.colors.textColorPrimary}
            width={responsiveWidth(20)}
            height={responsiveWidth(20)}
          />
        )}
        <Text
          style={{ ...styles.btnText, color: theme.colors.textColorPrimary }}
        >
          {props.title}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  btnText: {
    fontSize: responsiveWidth(15),
    lineHeight: responsiveWidth(22),
    fontFamily: 'NotoSans-Regular',
    marginLeft: responsiveWidth(8),
  },
  btnImage: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
  },
  captionContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.53,
  },
});

export default AuthButton;
