import React from 'react';
import { View, StyleSheet, TouchableOpacity, ColorValue } from 'react-native';
import { useTheme } from '@rneui/themed';

import { responsiveWidth } from '../../../common/utils';

import * as Assets from '../../../assets';
import CustomText from '../../../components/CustomText';

const SinButton: React.FC<{
  title: string;
  crossColor: ColorValue;
  onPressed: () => void;
}> = ({ title, crossColor, onPressed }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPressed}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.backgroundPrimary,
            borderColor: theme.colors.backgroundSecondary,
          },
        ]}
      >
        {/* Крест */}
        <Assets.Icons.ChristCross
          style={styles.crossContainer}
          fill={crossColor}
          width={responsiveWidth(92)}
          height={responsiveWidth(150)}
        />
        {/* Текст */}
        <CustomText
          lineHeight={responsiveWidth(20)}
          fontSize={responsiveWidth(15)}
          fontWeight="bold"
          style={{
            paddingLeft: responsiveWidth(12),
            paddingBottom: responsiveWidth(12),
          }}
        >
          {title}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: {
    borderRadius: responsiveWidth(14),
    height: responsiveWidth(160),
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderWidth: responsiveWidth(2),
  },
  crossContainer: {
    position: 'absolute',
    right: -responsiveWidth(10),
    bottom: -responsiveWidth(29),
    zIndex: 1,
  },
});

export default SinButton;
