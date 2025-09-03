import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { responsiveWidth } from 'common/utils';
import CustomText from '../CustomText';
import { useTheme } from '@rneui/themed';

const TypingIndicator = () => {
  const { theme } = useTheme();
  
  console.log('TypingIndicator component rendered');

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.backgroundSecondary,
      }}
    >
      <View style={styles.content}>
        <View style={[styles.spinner, { backgroundColor: theme.colors.textColorSecondary }]} />
        <CustomText
          color={theme.colors.textColorSecondary}
          style={styles.text}
        >
          Pastor is typing... (TEST)
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    marginLeft: responsiveWidth(16),
    marginRight: responsiveWidth(60),
    marginBottom: responsiveWidth(8),
    borderRadius: responsiveWidth(16),
    paddingHorizontal: responsiveWidth(12),
    paddingVertical: responsiveWidth(8),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spinner: {
    marginRight: responsiveWidth(8),
    width: responsiveWidth(12),
    height: responsiveWidth(12),
    borderRadius: responsiveWidth(6),
  },
  text: {
    fontSize: responsiveWidth(14),
    fontStyle: 'italic',
  },
});

export default TypingIndicator;
