import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { responsiveWidth } from '../common/utils';
import { useTheme } from '@rneui/themed';

interface IPlayfairTitleProps {
  children: string;
  style?: TextStyle;
}

const PlayfairTitle = (props: IPlayfairTitleProps) => {
  const { theme } = useTheme();

  return (
    <Text
      style={{
        ...styles.playfairTitle,
        color: theme.colors.textColorPrimary,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  playfairTitle: {
    fontSize: responsiveWidth(24),
    lineHeight: responsiveWidth(36),
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay-SemiBold',
  },
});

export default PlayfairTitle;
