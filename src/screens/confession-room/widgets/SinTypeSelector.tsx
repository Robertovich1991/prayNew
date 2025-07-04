import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@rneui/themed';
import CustomText from '../../../components/CustomText';
import { responsiveWidth } from '../../../common/utils';
import { sinTypeDescription } from './common';

const SinTypeSelector = ({ initialValue, onValueChanged }) => {
  const { theme } = useTheme();
  const [type, setType] = useState(initialValue);

  const onElementPressed = useCallback(
    (elementType) => {
      setType(elementType);
      onValueChanged(elementType);
    },
    [onValueChanged]
  );

  const Element = ({ elementType }) => {
    const isActive = type === elementType;
    const bgColor = isActive ? '#D9C28D' : theme.colors.backgroundSecondary;
    const textColor = isActive ? theme.colors.backgroundPrimary : theme.colors.textColorPrimary;

    return (
      <TouchableOpacity
        onPress={() => onElementPressed(elementType)}
        style={[styles.elementContainer, { backgroundColor: bgColor }]}
      >
        <CustomText
          numberOfLines={1}
          ellipsizeMode="tail"
          fontSize={responsiveWidth(12)}
          color={textColor}
        >
          {sinTypeDescription[elementType]}
        </CustomText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={[styles.container, { backgroundColor: theme.colors.backgroundSecondary }]}
      >
        <Element elementType="against-god" />
        <Element elementType="against-fellow" />
        <Element elementType="against-yourself" />
        <Element elementType="against-truth" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  container: {
    borderRadius: responsiveWidth(9),
  },
  scrollContent: {
    paddingHorizontal: responsiveWidth(4),
    flexDirection: 'row',
  },
  elementContainer: {
    height: responsiveWidth(36),
    borderRadius: responsiveWidth(7),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(10),
    marginRight: responsiveWidth(4),
    minWidth: responsiveWidth(40), // Important for scroll
  },
});

export default SinTypeSelector;
