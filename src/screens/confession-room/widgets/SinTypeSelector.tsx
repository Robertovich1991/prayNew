import React, { useCallback, useState, useMemo } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@rneui/themed';
import CustomText from '../../../components/CustomText';
import { responsiveWidth } from '../../../common/utils';
import { sinTypeDescription } from './common';
import { sinElements } from '../sin-mocks';

const SinTypeSelector = ({ initialValue, onValueChanged, sinSeverity }) => {
  const { theme } = useTheme();

  // Get available sin types that have content for the given severity
  const availableSinTypes = useMemo(() => {
    const types = new Set<string>();
    sinElements.forEach(sin => {
      // Filter by severity if provided
      const matchesSeverity = !sinSeverity || sin.severity === sinSeverity;
      
      if (matchesSeverity &&
          sin.machineName && 
          sin.headerTitle && 
          (sin.headerTitle.en?.trim() !== '' || sin.headerTitle.fr?.trim() !== '') &&
          sin.description && 
          (sin.description.en?.trim() !== '' || sin.description.fr?.trim() !== '') &&
          sin.confessionTasks && 
          Array.isArray(sin.confessionTasks) && 
          sin.confessionTasks.length > 0) {
        types.add(sin.type);
      }
    });
    return Array.from(types);
  }, [sinSeverity]);

  // Set initial value to first available type if current initial value is not available
  const validInitialValue = availableSinTypes.includes(initialValue) 
    ? initialValue 
    : availableSinTypes[0] || 'against-god';

  const [type, setType] = useState(validInitialValue);

  // Update type if current type is not available
  React.useEffect(() => {
    if (!availableSinTypes.includes(type)) {
      const newType = availableSinTypes[0] || 'against-god';
      setType(newType);
      onValueChanged(newType);
    }
  }, [availableSinTypes, type, onValueChanged]);

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
        {availableSinTypes.map(sinType => (
          <Element key={sinType} elementType={sinType} />
        ))}
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
