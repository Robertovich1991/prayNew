import GetFirstWeekForFree from 'components/cards/GetFirstWeekForFree';
import { WINDOW_WIDTH } from 'helpers/dimensions';
import React from 'react';
import { View } from 'react-native';
import store from 'store';

interface IGetFirstWeekForFreeModalModal {
  closeAction?: () => void;
  onBecomeBlessedClick: () => void;
}

const GetFirstWeekForFreeModalModal = ({
  closeAction,
  onBecomeBlessedClick,
}: IGetFirstWeekForFreeModalModal) => {
  return (
    <View style={{ width: WINDOW_WIDTH, height: WINDOW_WIDTH * 0.8 }}>
      <GetFirstWeekForFree
        closeAction={() => {
          typeof closeAction === 'function' && closeAction();
          store.modalStore.close();
        }}
        onBecomeBlessedClick={() => {
          typeof onBecomeBlessedClick === 'function' && onBecomeBlessedClick();
        }}
      />
    </View>
  );
};

export default GetFirstWeekForFreeModalModal;
