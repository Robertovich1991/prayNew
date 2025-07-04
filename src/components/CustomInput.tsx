import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { StyleSheet, ViewStyle } from 'react-native';
import { responsiveWidth } from '../common/utils';
import { useTheme } from '@rneui/themed';
import { CustomizationColors } from 'styles/customization';

interface ICustomInputProps {
  style?: ViewStyle;
  onChange?: (text: string) => void;
  initialValue?: string;
}

const CustomInput = (props: ICustomInputProps) => {
  const [value, setValue] = useState(props.initialValue || '');
  const { theme } = useTheme();
  return (
    <TextInput
      style={{
        ...styles.input,
        backgroundColor: theme.colors.backgroundPrimary,
        color: theme.colors.textColorSecondary,
      }}
      onChange={e => {
        typeof props.onChange === 'function' &&
          props.onChange(e.nativeEvent.text);
        setValue(e.nativeEvent.text);
      }}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderBottomColor: CustomizationColors.get('BLACK_SECONDARY'),
    borderBottomWidth: 1,
    textAlign: 'center',
    fontSize: responsiveWidth(15),
    padding: 0,
  },
});

export default CustomInput;
