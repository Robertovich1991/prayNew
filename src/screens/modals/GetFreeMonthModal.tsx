import SubscribeFreeForMonth from 'components/cards/SubscribeFreeForMonth';
import { WINDOW_WIDTH } from 'helpers/dimensions';
import React from 'react';
import { View } from 'react-native';
import store from 'store';

interface ISubscribeFreeForMonthModal {
  closeAction: () => void;
  onGetFreeMonthSubscriptionClick: () => void;
}

const SubscribeFreeForMonthModal = ({
  closeAction,
  onGetFreeMonthSubscriptionClick,
}: ISubscribeFreeForMonthModal) => {
  return (
    <View style={{ width: WINDOW_WIDTH, height: WINDOW_WIDTH * 0.8 }}>
      <SubscribeFreeForMonth
        closeCard={() => {
          store.modalStore.close();
          typeof closeAction === 'function' && closeAction();
        }}
        onGetFreeMonthSubscriptionClick={() => {
          // store.modalStore.close()
          onGetFreeMonthSubscriptionClick();
        }}
      />
    </View>
  );
};

export default SubscribeFreeForMonthModal;
