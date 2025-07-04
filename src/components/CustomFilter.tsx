import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { responsiveWidth } from '../common/utils';
import CustomButton from './CustomButton';
import CustomText from './CustomText';
import { Picker } from '@react-native-picker/picker';
import DownArrow from '../assets/img/icons/downArrow.svg';
import { T_KEYS } from 'assets/translations';
import useOwnTranslation from 'hooks/useOwnTranslation';
import { useTheme } from '@rneui/themed';
import { CustomizationColors } from 'styles/customization';

interface ICustomFilterProps {
  onPress: (value: any) => void;
  items: { label: string; value: string }[];
}

const CustomFilter = (props: ICustomFilterProps) => {
  const [selectedValue, setSelectedValue] = useState();
  const t = useOwnTranslation;
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={() => props.onPress(undefined)}
      style={styles.filterBackground}
    >
      <View
        onStartShouldSetResponder={() => true}
        style={{
          ...styles.filterCard,
          backgroundColor: theme.colors.blackPrimaryToWhite,
        }}
      >
        <CustomText
          style={styles.close}
          onPress={() => props.onPress(undefined)}
        >
          {t(T_KEYS.CLOSE)}
        </CustomText>
        <CustomText
          fontWeight="light"
          style={styles.prayer}
          fontSize={responsiveWidth(12)}
          lineHeight={responsiveWidth(16)}
          color={theme.colors.textColorQuaternary}
        >
          {t(T_KEYS.REQUEST_SCREEN_PRAYER)}
        </CustomText>
        <View style={styles.filterWrapper}>
          <Picker
            dropdownIconRippleColor={theme.colors.blackPrimaryToWhite}
            dropdownIconColor={theme.colors.blackPrimaryToWhite}
            style={{ ...styles.filter, color: theme.colors.textColorSecondary }}
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedValue(itemValue);
            }}
          >
            <Picker.Item value="" label="Please, select prayer..." />
            {props.items.map((item, index) => {
              return (
                <Picker.Item
                  key={index}
                  label={item.label}
                  value={item.value}
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
        <View style={styles.btnMargin}>
          <CustomButton
            onPress={() => {
              console.log(selectedValue);
              props.onPress(selectedValue);
            }}
            title={t(T_KEYS.SAVE_BUTTON)}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  filterBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0e0e0e80',
    position: 'absolute',
  },
  filterCard: {
    width: '100%',
    bottom: 0,
    position: 'absolute',
    padding: responsiveWidth(20),
    paddingBottom: responsiveWidth(48),
    borderTopRightRadius: responsiveWidth(14),
    borderTopLeftRadius: responsiveWidth(14),
  },
  close: {
    alignSelf: 'flex-end',
  },
  prayer: {
    textTransform: 'uppercase',
  },
  filterWrapper: {
    height: responsiveWidth(52),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: CustomizationColors.get('BLACK_SECONDARY'),
    borderRadius: responsiveWidth(12),
    marginTop: responsiveWidth(8),
    paddingRight: responsiveWidth(14),
  },
  filter: {
    flex: 1,
    height: responsiveWidth(52),
  },
  btnMargin: {
    marginTop: responsiveWidth(32),
  },
});

export default CustomFilter;
