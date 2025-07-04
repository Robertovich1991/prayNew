import { AppState, AppStateStatus, Linking } from 'react-native';
import TrackPlayer, { RepeatMode, State } from 'react-native-track-player';
import { getUniqueId } from 'react-native-device-info';
import i18next from 'i18next';
import { makeAutoObservable, runInAction } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { Settings as FBSDKSettings } from 'react-native-fbsdk-next';

import { restApiRoutes } from 'constants/rest-api';
import { IRootStore } from 'store';
import { BaseResponse } from './responses';
import { ApsFlyerInit } from 'helpers/logEvents';

export interface ICommonSettings {
  language?: 'en' | 'fr';
  theme: 'dark' | 'light';
  isSoundActive?: boolean;
  isBackgroundSound?: boolean;
  isPushNotificationsActive?: boolean;
  isAboutUsGreetingCompleted?: boolean;
}

const handleAppStateChange = async (
  appState: AppStateStatus,
  store: IRootStore,
) => {
  console.log('handleAppStateChange', appState, store.commonStore.settings);
  console.log('+++ handleAppStateChange', store.commonStore.appState);

  if (
    store.commonStore.appState?.match(/inactive|background/) &&
    appState === 'active'
  ) {
    console.log('+++ App has come to the foreground!');
    if (
      !!store.commonStore.trackPlayer &&
      store.commonStore.settings?.isSoundActive
    ) {
      TrackPlayer.play();
    }
    if (store.userStore.isUserAuth) {
      await store.userStore.getAccessToken();
      store.prayersStore.getRequests({});
      store.chatStore.getChats({});
      store.articlesStore.fetchArticles();
      store.webSocketStore.wsInit();
    }
  } else {
    if (
      !!store.commonStore.trackPlayer &&
      store.commonStore.settings?.isSoundActive &&
      !store.commonStore.settings.isBackgroundSound
    ) {
      TrackPlayer.pause();
    }
    store.webSocketStore.wsDisconnect(false, 'app-status');
  }
  store.commonStore.setAppState(appState);
};

class CommonStore {
  private _rootStore: IRootStore;

  appState: AppStateStatus = 'background';
  settings: ICommonSettings = { theme: 'dark' };
  trackPlayer?: State = undefined;

  settingsInited = false;

  deviceId: string;

  constructor(rootStore: IRootStore) {
    this._rootStore = rootStore;
    AppState.addEventListener('change', state =>
      handleAppStateChange(state, this._rootStore),
    );

    try {
      getUniqueId().then(deviceId => {
        runInAction(() => {
          this.deviceId = deviceId;
        });
      });
    } catch (e) {
      console.log('Error in getUniqueId', e);
    }

    makePersistable(this, {
      name: 'CommonStore',
      properties: ['settings'],
    }).then(() => {
      console.log('CommonStore makePersistable', this.settings);
      this.initServicesBySettings(this.settings);
      runInAction(() => {
        this.settingsInited = true;
      });
    });
    makeAutoObservable(this);
    Linking.addEventListener('url', event => {
      console.log('Linking', event);
    });

    ApsFlyerInit();

    FBSDKSettings.setAppID('1022560635589446');
    FBSDKSettings.initializeSDK();
  }

  setSettings(newSettings: ICommonSettings) {
    console.log(
      'Saving settings',
      newSettings,
      this.initServicesBySettings,
      newSettings.language !== this.settings.language,
    );
    if (typeof this.initServicesBySettings === 'function') {
      this.initServicesBySettings(newSettings);
    }
    if (newSettings?.language !== this.settings.language) {
      this._rootStore.restApi.request({
        method: 'GET',
        path: restApiRoutes.USER_SET_LANGUAGE + `/${newSettings.language}`,
        withToken: true,
        successStatus: 200,
      });
      this._rootStore.chatStore.getChats({});
    }

    runInAction(() => {
      this.settings = newSettings;
    });
  }

  async initServicesBySettings(newSettings: ICommonSettings) {
    console.log('initServicesBySettings', newSettings);
    i18next.changeLanguage(newSettings.language || 'en');

    if (newSettings.isSoundActive && !this.trackPlayer) {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        stoppingAppPausesPlayback: !newSettings.isBackgroundSound,
      });
      await TrackPlayer.setRepeatMode(RepeatMode.Track);
      await TrackPlayer.add({
        id: 'trackId',
        url: require('../assets/sounds/01.mp3'),
        title: 'God Bless You',
        artist: 'Ambient track',
      });
      this.trackPlayer = await TrackPlayer.getState();
      console.log('!!! tpState', this.trackPlayer);
      console.log('TrackPlayer inited', TrackPlayer);
    }

    if (newSettings.isSoundActive && !!this.trackPlayer) {
      TrackPlayer.play();
    }

    if (!newSettings.isSoundActive && !!this.trackPlayer) {
      TrackPlayer.stop();
    }

    if (newSettings.isPushNotificationsActive) {
      this._rootStore.pushNotificationStore.initPushNotifications();
    }
  }

  setAppState(newAppState: AppStateStatus) {
    runInAction(() => {
      this.appState = newAppState;
    });
  }

  extract(entity?: LanguageBasedStructure) {
    if (!entity) {
      return '';
    }
    return entity[this.settings.language || 'en'];
  }

  async sendJoinOurCommunityData({
    message,
    email,
  }: {
    message: string;
    email: string;
  }): Promise<BaseResponse<string, string> | null> {
    if (message && email) {
      return this._rootStore.restApi.request<BaseResponse<string, string>>({
        method: 'POST',
        path: restApiRoutes.JOIN_OUR_COMMUNITY,
        withToken: true,
        successStatus: 201,
        body: {
          message,
          email,
        },
      });
    } else {
      return {
        error: 'Not available required fields',
      };
    }
  }
}

export default CommonStore;
