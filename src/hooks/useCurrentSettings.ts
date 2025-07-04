import store from 'store';

export const useCurrentSettings = () => {
  const { settings, settingsInited, setSettings } = store.commonStore;

  return {
    settings,
    settingsInited,
    setSettings,
  };
};
