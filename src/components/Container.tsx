import React from 'react';
import { View, StyleSheet } from 'react-native';
import { responsiveWidth } from '../common/utils';
import { useTheme } from '@rneui/themed';

interface iContainerProps {
  children: JSX.Element | JSX.Element[];
}

const Container = (props: iContainerProps) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.backgroundPrimary,
      }}
    >
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: responsiveWidth(71),
    paddingHorizontal: responsiveWidth(20),
  },
});

export default Container;
