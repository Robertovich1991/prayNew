import React from 'react';
import { View, StyleSheet } from 'react-native';
import { responsiveWidth } from '../common/utils';

interface ICardContainerProps {
  children: JSX.Element | JSX.Element[];
}

const CardContainer = (props: ICardContainerProps) => {
  return <View style={styles.cardContainer}>{props.children}</View>;
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 10,
    padding: responsiveWidth(20),
  },
});

export default CardContainer;
