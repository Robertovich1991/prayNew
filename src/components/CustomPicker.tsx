import { Picker } from '@react-native-picker/picker';
import { responsiveWidth } from 'common/utils';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
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
  
  // Use the first option as fallback if no initial value is provided
  const fallbackValue = options.length > 0 ? options[0].value : null;
  const [selectedValue, setSelectedValue] = useState(initialValue ?? fallbackValue);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const newValue = initialValue ?? fallbackValue;
    console.log(`CustomPicker ${title}: initialValue=${initialValue}, fallbackValue=${fallbackValue}, newValue=${newValue}`);
    setSelectedValue(newValue);
  }, [initialValue, fallbackValue, title]);

  // Get the label for the selected value
  const getSelectedLabel = () => {
    const selectedOption = options.find(option => option.value === selectedValue);
    return selectedOption ? selectedOption.label : 'Select an option';
  };

  // Don't render if no options are provided
  if (!options || options.length === 0) {
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
        <CustomText color={theme.colors.textColorSecondary}>
          No options available
        </CustomText>
      </View>
    );
  }

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
      <TouchableOpacity 
        style={[
          styles.filterWrapper, 
          { 
            backgroundColor: theme.colors.backgroundSecondary,
            borderColor: theme.colors.textColorQuaternary
          }
        ]}
        onPress={() => setIsModalVisible(true)}
      >
        <CustomText 
          style={styles.selectedText}
          color={theme.colors.textColorSecondary}
        >
          {getSelectedLabel()}
        </CustomText>
        <DownArrow
          color={theme.colors.textColorSecondary}
          width={responsiveWidth(14)}
          height={responsiveWidth(14)}
        />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.backgroundPrimary }]}>
            <CustomText style={styles.modalTitle} color={theme.colors.textColorPrimary}>
              Select {title}
            </CustomText>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionItem,
                  { backgroundColor: theme.colors.backgroundSecondary },
                  selectedValue === option.value && { backgroundColor: theme.colors.buttonPrimary }
                ]}
                onPress={() => {
                  console.log(`CustomPicker ${title}: value changed to ${option.value}`);
                  setSelectedValue(option.value);
                  onValueChangedHandler(option.value);
                  setIsModalVisible(false);
                }}
              >
                <CustomText 
                  color={selectedValue === option.value ? theme.colors.textColorPrimary : theme.colors.textColorSecondary}
                  style={selectedValue === option.value ? styles.selectedOptionText : styles.optionText}
                >
                  {option.label}
                </CustomText>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.cancelButton, { borderTopColor: theme.colors.textColorQuaternary }]}
              onPress={() => setIsModalVisible(false)}
            >
              <CustomText color={theme.colors.textColorSecondary}>
                Cancel
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  filterWrapper: {
    height: responsiveWidth(52),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: responsiveWidth(12),
    marginTop: responsiveWidth(8),
    marginBottom: responsiveWidth(20),
    paddingRight: responsiveWidth(14),
    paddingLeft: responsiveWidth(16),
    justifyContent: 'space-between',
  },
  selectedText: {
    flex: 1,
    fontSize: responsiveWidth(14),
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    borderRadius: responsiveWidth(12),
    padding: responsiveWidth(20),
    width: '80%',
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: responsiveWidth(18),
    fontWeight: 'bold',
    marginBottom: responsiveWidth(20),
    textAlign: 'center',
  },
  optionItem: {
    paddingVertical: responsiveWidth(12),
    paddingHorizontal: responsiveWidth(16),
    borderRadius: responsiveWidth(8),
    marginBottom: responsiveWidth(8),
  },
  optionText: {
    fontSize: responsiveWidth(16),
  },
  selectedOptionText: {
    fontSize: responsiveWidth(16),
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: responsiveWidth(20),
    paddingVertical: responsiveWidth(12),
    alignItems: 'center',
    borderTopWidth: 1,
  },
});

export default CustomPicker;
