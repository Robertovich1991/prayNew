import RenewSubCard from 'components/cards/RenewSubCard';
import { WINDOW_WIDTH } from 'helpers/dimensions';
import React from 'react';
import { View } from 'react-native';

interface IRenewSubModal {
  buttonAction: () => void;
}

const RenewSubModal = ({ buttonAction }: IRenewSubModal) => {
  return (
    <View style={{ width: WINDOW_WIDTH, height: WINDOW_WIDTH * 0.8 }}>
      <RenewSubCard
        buttonAction={() => {
          typeof buttonAction === 'function' && buttonAction();
        }}
      />
    </View>
  );
};

export default RenewSubModal;
