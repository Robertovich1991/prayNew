import React from 'react';
import {
  ColorValue,
  TextStyle,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Text,
  View,
} from 'react-native';
import { responsiveWidth } from '../common/utils';
import CustomText from './CustomText';
import { useTheme } from '@rneui/themed';
import { CustomizationColors } from 'styles/customization';

interface ICustomButtonProps {
  title: string | number;
  style?: ViewStyle;
  onPress: () => void;
  btnTextStyle?: TextStyle;
  width?: '100%';
  height?: number;
  backgroundColor?: ColorValue;
  borderRadius?: number;
  alignItems?: 'center';
  justifyContent?: 'center';
  disabled?: boolean;
  notice?: number;
}

const CustomButton = (props: ICustomButtonProps) => {
  const { theme } = useTheme();
  const {
    height = responsiveWidth(52),
    backgroundColor = theme.colors.buttonPrimary,
    borderRadius = responsiveWidth(12),
    width = '100%',
    alignItems = 'center',
    justifyContent = 'center',
    disabled = false,
  } = props;

  return (
    <TouchableOpacity
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
      onPress={() => props.onPress()}
      disabled={disabled}
    >
      <View style={styles.noticeWrapper}>
        <Text
          style={[
            props.btnTextStyle
              ? props.btnTextStyle
              : {
                  ...styles.btnText,
                  color: theme.colors.textColorSecondary,
                },
            disabled
              ? { color: CustomizationColors.get('GREY_SECONDARY') }
              : null,
          ]}
        >
          {props.title}
        </Text>
        {typeof props.notice === 'number' && props.notice > 0 && (
          <View style={styles.notice}>
            <CustomText
              fontSize={responsiveWidth(11)}
              lineHeight={responsiveWidth(15)}
            >
              {props.notice}
            </CustomText>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnText: {
    fontSize: responsiveWidth(15),
    lineHeight: responsiveWidth(22),
    fontFamily: 'NotoSans-Regular',
  },
  btnImage: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
  },
  noticeWrapper: {
    flexDirection: 'row',
  },
  notice: {
    width: responsiveWidth(16),
    height: responsiveWidth(16),
    bottom: responsiveWidth(12),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CustomizationColors.get('GREEN_PRIMARY'),
    borderRadius: responsiveWidth(50),
    position: 'absolute',
    right: responsiveWidth(-16),
  },
});

export default CustomButton;
