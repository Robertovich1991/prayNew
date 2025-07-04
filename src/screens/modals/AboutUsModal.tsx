import AboutCard from 'components/cards/AboutCard';
import { WINDOW_WIDTH } from 'helpers/dimensions';
import React from 'react';
import { View } from 'react-native';
import store from 'store';

interface IAboutUsModalProps {
  continueAction: () => void;
}

const AboutUsModal = ({ continueAction }: IAboutUsModalProps) => {
  return (
    <View style={{ width: WINDOW_WIDTH, height: WINDOW_WIDTH * 0.8 }}>
      <AboutCard
        continueAction={() => {
          store.commonStore.setSettings({
            ...store.commonStore.settings,
            isAboutUsGreetingCompleted: true,
          });
          typeof continueAction === 'function' && continueAction();
          store.modalStore.close();
        }}
      />
    </View>
  );
};

export default AboutUsModal;
