import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { responsiveWidth } from 'common/utils';
import CustomText from '../CustomText';
import { useTheme } from '@rneui/themed';

const WaitingIndicator = () => {
  const { theme } = useTheme();
  
  console.log('WaitingIndicator component rendered');

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.backgroundSecondary,
      }}
    >
      <View style={styles.content}>
        <ActivityIndicator 
          size="small" 
          color={theme.colors.textColorSecondary}
        />
        <CustomText
          color={theme.colors.textColorSecondary}
          style={styles.text}
        >
          Processing...
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    marginLeft: responsiveWidth(60),
    marginRight: responsiveWidth(16),
    marginBottom: responsiveWidth(8),
    borderRadius: responsiveWidth(16),
    paddingHorizontal: responsiveWidth(16),
    paddingVertical: responsiveWidth(12),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: responsiveWidth(14),
    marginLeft: responsiveWidth(8),
    fontStyle: 'italic',
  },
});

export default WaitingIndicator;
