import NotBlessedCard from 'components/cards/NotBlessedCard';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from 'helpers/dimensions';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface NotBlessedCardModal {
  buttonAction: () => void;
}

const NotBlessedCardModal = ({ buttonAction }: NotBlessedCardModal) => {
  return (
    <View style={styles.notBlessedCardWrapper}>
      <NotBlessedCard
        buttonAction={() => {
          typeof buttonAction === 'function' && buttonAction();
        }}
      />
    </View>
  );
};

export default NotBlessedCardModal;

const styles = StyleSheet.create({
  notBlessedCardWrapper: {
    display: 'flex',
    flex: 1,
    height: WINDOW_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    width: WINDOW_WIDTH,
  },
});
