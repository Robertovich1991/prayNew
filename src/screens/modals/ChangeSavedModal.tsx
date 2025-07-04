import ChangeSavedCard from 'components/cards/ChangesSavedCard';
import { WINDOW_WIDTH } from 'helpers/dimensions';
import React from 'react';
import { View } from 'react-native';
import store from 'store';

interface IChangeSavedModal {
  continueAction: () => void;
}

const ChangeSavedModal = ({ continueAction }: IChangeSavedModal) => {
  return (
    <View style={{ width: WINDOW_WIDTH, height: WINDOW_WIDTH * 0.8 }}>
      <ChangeSavedCard
        continueAction={() => {
          typeof continueAction === 'function' && continueAction();
          store.modalStore.close();
        }}
      />
    </View>
  );
};

export default ChangeSavedModal;
