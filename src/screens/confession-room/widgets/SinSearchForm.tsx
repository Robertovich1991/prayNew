import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';

import { responsiveWidth } from '../../../common/utils';

import * as Assets from '../../../assets';

type NewCustomInputProps = {
  initialValue: string;
  onValueChanged: (text: string) => void;
  isAutoFocus?: boolean;
};

const SinSearchForm = React.forwardRef<TextInput, NewCustomInputProps>(
  (props, ref) => {
    const { initialValue, onValueChanged, isAutoFocus } = props;

    const { theme } = useTheme();
    const [valueLength, setValueLength] = useState(0);

    const containerBackgroundColor = theme.colors.backgroundSecondary;

    const placeholderTextColor = theme.colors.textColorTertiary;

    const inputTextColor = theme.colors.textColorPrimary;

    const onChangedText = (text: string) => {
      onValueChanged(text);
      setValueLength(text.length);
    };

    return (
      <>
        <View
          style={{
            ...styles.container,
            backgroundColor: containerBackgroundColor,
          }}
        >
          {valueLength < 1 && (
            <Assets.Icons.SearchMagnifier
              height={responsiveWidth(14)}
              width={responsiveWidth(14)}
              fill={placeholderTextColor}
              style={{ marginLeft: responsiveWidth(12) }}
            />
          )}
          <TextInput
            ref={ref}
            placeholderTextColor={placeholderTextColor}
            placeholder={'Search'}
            style={{
              ...styles.textInput,
              color: inputTextColor,
            }}
            defaultValue={initialValue}
            onChangeText={onChangedText}
            autoFocus={isAutoFocus}
          />
        </View>
      </>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: responsiveWidth(10),
    paddingHorizontal: responsiveWidth(6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    paddingLeft: responsiveWidth(12),
    fontSize: responsiveWidth(12),
    fontFamily: 'NotoSans-Regular',
    lineHeight: responsiveWidth(15),
    height: responsiveWidth(44),
    flex: 1,
  },
});

export default SinSearchForm;
