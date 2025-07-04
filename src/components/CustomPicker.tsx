import { Picker } from '@react-native-picker/picker';
import { responsiveWidth } from 'common/utils';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DownArrow from 'assets/img/icons/downArrow.svg';
import CustomText from './CustomText';
import { useTheme } from '@rneui/themed';
import { CustomizationColors } from 'styles/customization';

interface ICustomPickerProps {
  title: string;
  options: { label: string; value: any }[];
  initialValue?: any;
  onValueChangedHandler: (value: any) => void;
}

const CustomPicker = (props: ICustomPickerProps) => {
  const { title, options, initialValue, onValueChangedHandler } = props;
  const { theme } = useTheme();
  const [selectedValue, setSelectedValue] = useState(initialValue);

  useEffect(() => {
    if (selectedValue !== initialValue) {
      setSelectedValue(initialValue);
    }
  }, [selectedValue, initialValue]);

  return (
    <View>
      <CustomText
        fontSize={responsiveWidth(12)}
        lineHeight={responsiveWidth(16)}
        color={theme.colors.textColorQuaternary}
        fontWeight="light"
      >
        {title}
      </CustomText>
      <View style={styles.filterWrapper}>
        <Picker
          dropdownIconRippleColor={theme.colors.backgroundPrimary}
          dropdownIconColor={theme.colors.backgroundPrimary}
          style={{ ...styles.filter, color: theme.colors.textColorSecondary }}
          selectedValue={selectedValue}
          onValueChange={itemValue => {
            setSelectedValue(itemValue);
            onValueChangedHandler(itemValue);
          }}
        >
          {options.map((option, index) => {
            return (
              <Picker.Item
                key={index}
                label={option.label}
                value={option.value}
              />
            );
          })}
        </Picker>
        <DownArrow
          color={theme.colors.textColorSecondary}
          width={responsiveWidth(14)}
          height={responsiveWidth(14)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterWrapper: {
    height: responsiveWidth(52),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: CustomizationColors.get('BLACK_SECONDARY'),
    borderRadius: responsiveWidth(12),
    marginTop: responsiveWidth(8),
    marginBottom: responsiveWidth(20),
    paddingRight: responsiveWidth(14),
  },
  filter: {
    flex: 1,
    height: responsiveWidth(52),
  },
});

export default CustomPicker;
