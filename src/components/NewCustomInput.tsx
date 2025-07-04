import React from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@rneui/themed';

import { responsiveWidth } from '../common/utils';

import * as Assets from '../assets';
import CustomText from './CustomText';
import Divider from './Divider';

type NewCustomInputProps = {
  placeholder?: string;
  isInBottomSheet?: boolean;
  isCheckboxEnabled?: boolean;
  initialValue: string;
  onValueChanged: (text: string) => void;
  error?: string;
  isAutoFocus?: boolean;
};

const NewCustomInput = React.forwardRef<TextInput, NewCustomInputProps>(
  (props, ref) => {
    const {
      placeholder,
      isInBottomSheet,
      isCheckboxEnabled,
      initialValue,
      onValueChanged,
      error,
      isAutoFocus,
    } = props;

    const { theme } = useTheme();

    const containerBackgroundColor = isInBottomSheet
      ? '#F3F3F3'
      : theme.colors.backgroundSecondary;

    const placeholderTextColor = isInBottomSheet
      ? '#888888'
      : theme.colors.textColorTertiary;

    const inputTextColor = isInBottomSheet
      ? '#191919'
      : theme.colors.textColorPrimary;

    const onChangedText = (text: string) => {
      onValueChanged(text);
    };

    return (
      <>
        <View
          style={{
            ...styles.container,
            backgroundColor: containerBackgroundColor,
          }}
        >
          <TextInput
            ref={ref}
            placeholderTextColor={placeholderTextColor}
            placeholder={placeholder || 'Enter your data'}
            style={{
              ...styles.text,
              color: inputTextColor,
            }}
            defaultValue={initialValue}
            onChangeText={onChangedText}
            autoFocus={isAutoFocus}
          />
          {isCheckboxEnabled && (
            <TouchableOpacity style={styles.checkbox}>
              <Assets.Icons.DoubleCheckbox
                height={responsiveWidth(20)}
                width={responsiveWidth(20)}
                fill={placeholderTextColor}
              />
            </TouchableOpacity>
          )}
        </View>
        {error && (
          <>
            <Divider height={responsiveWidth(5)} />
            <View style={styles.errorContainer}>
              <Assets.Icons.ExclamationMarkInCircle
                fill={'#F75555'}
                width={responsiveWidth(20)}
                height={responsiveWidth(20)}
              />
              <CustomText
                style={{ paddingLeft: responsiveWidth(10) }}
                color={'#F75555'}
                fontSize={15}
                lineHeight={20}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {error}
              </CustomText>
            </View>
          </>
        )}
      </>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: responsiveWidth(51),
    borderRadius: responsiveWidth(10),
    justifyContent: 'center',
  },
  text: {
    paddingLeft: responsiveWidth(14),

    fontSize: responsiveWidth(15),
    fontFamily: 'NotoSans-Regular',
  },
  checkbox: {
    position: 'absolute',
    top: responsiveWidth(15),
    right: responsiveWidth(10),
  },
  errorContainer: {
    backgroundColor: '#F755551A',
    borderRadius: responsiveWidth(8),
    width: '100%',
    height: responsiveWidth(40),
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(14),
    flexDirection: 'row',
  },
});

export default NewCustomInput;
