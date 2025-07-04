import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { CustomizationColors } from 'styles/customization';

const CustomLine = () => {
  return <View style={styles.line} />;
};

const styles = StyleSheet.create({
  line: {
    width: '100%',
    height: 1,
    backgroundColor: CustomizationColors.get('BLACK_SECONDARY'),
  },
});

export default CustomLine;
