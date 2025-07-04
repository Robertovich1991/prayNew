import ThanksCard from 'components/cards/ThanksCard';
import { WINDOW_WIDTH } from 'helpers/dimensions';
import React from 'react';
import { View } from 'react-native';
import store from 'store';

interface ThanksModalProps {
  title: string;
  onCloseAction?: () => void;
  source?: GratitudeType;
}

const ThanksModal = ({ title, source, onCloseAction }: ThanksModalProps) => {
  return (
    <View style={{ width: WINDOW_WIDTH, height: WINDOW_WIDTH * 0.8 }}>
      <ThanksCard
        title={title}
        closeCard={() => {
          store.modalStore.close();
          typeof onCloseAction === 'function' && onCloseAction();
        }}
        source={source}
      />
    </View>
  );
};

export default ThanksModal;
