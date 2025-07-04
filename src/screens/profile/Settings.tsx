import { useNavigation } from '@react-navigation/native';

import { T_KEYS } from 'assets/translations';
import { responsiveWidth } from 'common/utils';
import Container from 'components/Container';
import CustomButton from 'components/CustomButton';
import CustomPicker from 'components/CustomPicker';
import TopBar from 'components/TopBar';
import useOwnTranslation from 'hooks/useOwnTranslation';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import store from 'store';
import { ICommonSettings } from 'store/CommonStore';

const Settings = () => {
  const navigation = useNavigation();
  const t = useOwnTranslation;
  const [settings, setSettings] = useState<ICommonSettings>({
    ...store.commonStore.settings,
  });

  const pushNotifications = [
    { label: t(T_KEYS.SETTINGS_SCREEN_PUSH_ACTIVE), value: true },
    { label: t(T_KEYS.SETTINGS_SCREEN_PUSH_DISABLED), value: false },
  ];

  const ambientSound = [
    { label: t(T_KEYS.SETTINGS_SCREEN_SOUND_ACTIVE), value: true },
    { label: t(T_KEYS.SETTINGS_SCREEN_SOUND_DISABLED), value: false },
  ];

  const backgroundSound = [
    { label: t(T_KEYS.SETTINGS_SCREEN_BACKGROUND_SOUND_ACTIVE), value: true },
    {
      label: t(T_KEYS.SETTINGS_SCREEN_BACKGROUND_SOUND_DISABLED),
      value: false,
    },
  ];

  const languages = [
    { label: 'English', value: 'en' },
    { label: 'French', value: 'fr' },
  ];

  const themes = [
    { label: 'Dark', value: 'dark' },
    { label: 'Light', value: 'light' },
  ];

  const _themeSettingsChangesHandler = (theme: 'dark' | 'light') => {
    setSettings({
      ...settings,
      theme: theme,
    });
  };

  const _languageSettingsChangesHandler = (lang: 'en' | 'fr') => {
    setSettings({
      ...settings,
      language: lang,
    });
  };

  const _pushNotificationsSettingsHandler = (state: boolean) => {
    setSettings({
      ...settings,
      isPushNotificationsActive: state,
    });
  };

  const _ambientSoundSettingsHandler = (soundState: boolean) => {
    setSettings({
      ...settings,
      isSoundActive: soundState,
      isBackgroundSound:
        String(soundState) === 'false' ? false : settings.isBackgroundSound,
    });
  };

  const _backgroundSoundSettingsHandler = (bgSoundState: boolean) => {
    setSettings({
      ...settings,
      isBackgroundSound: bgSoundState,
    });
  };

  const _saveButtonHandler = () => {
    store.commonStore.setSettings(settings);
    navigation.goBack();
  };

  return (
    <Container>
      <TopBar backArrow={true} text={t(T_KEYS.SETTINGS_SCREEN_TITLE)} />
      <View style={styles.wrapper}>
        <CustomPicker
          title={t(T_KEYS.SETTINGS_SCREEN_PUSH_TOGGLE)}
          options={pushNotifications}
          initialValue={settings.isPushNotificationsActive}
          onValueChangedHandler={_pushNotificationsSettingsHandler}
        />
        <CustomPicker
          title={t(T_KEYS.SETTINGS_SCREEN_AMBIENT_SOUND)}
          options={ambientSound}
          initialValue={settings.isSoundActive}
          onValueChangedHandler={_ambientSoundSettingsHandler}
        />
        <CustomPicker
          title={t(T_KEYS.SETTINGS_SCREEN_BACKGROUND_SOUND)}
          options={backgroundSound}
          initialValue={settings.isBackgroundSound}
          onValueChangedHandler={_backgroundSoundSettingsHandler}
        />
        <CustomPicker
          title={t(T_KEYS.SETTINGS_SCREEN_LANGUAGE)}
          options={languages}
          initialValue={settings.language}
          onValueChangedHandler={_languageSettingsChangesHandler}
        />
        <CustomPicker
          title={t(T_KEYS.SETTINGS_SCREEN_THEME)}
          options={themes}
          initialValue={settings.theme}
          onValueChangedHandler={_themeSettingsChangesHandler}
        />
      </View>
      <View style={styles.btnWrapper}>
        {/* <CustomText
          fontSize={responsiveWidth(12)}
          fontWeight="light"
        >
          {`Bundle Version: ${packageJson.version}`}
        </CustomText> */}
        <CustomButton
          onPress={_saveButtonHandler}
          title={t(T_KEYS.SAVE_BUTTON)}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: responsiveWidth(69),
  },
  btnWrapper: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 0,
    marginBottom: responsiveWidth(48),
  },
});
export default Settings;
