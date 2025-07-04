import { makeAutoObservable, runInAction } from 'mobx';
import {
  clearPersistedStore,
  isHydrated,
  isPersisting,
  makePersistable,
} from 'mobx-persist-store';
import { restApiRoutes } from 'constants/rest-api';

import { IRootStore } from '.';
import { BaseAuthSuccessResult, UserResponse } from './responses/auth';
import { Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_PLAY_WEBCLIENT_ID } from 'constants/AppConfig';
import { BaseResponse } from './responses';
import { LogEvent, af_complete_registration } from 'helpers/logEvents';

class UserStore {
  private _rootStore: IRootStore;

  accessToken: string | null = null;
  accessTokenCreatedAt: number = 0;

  refreshToken: string | null = null;
  user: UserResponse | null = null;
  userName: string = '';

  referalCode: string | null = null;

  // persistedUser: IHydrateResult<UserStore> | null = null;
  // isUserHydrated: boolean = false;
  isUserInited = false;
  isUserInAuthorization = false;
  userInitCallbacks: Set<() => void> = new Set();
  userAuthorizedCallbacks: Set<() => void> = new Set();

  constructor(rootStore: IRootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);
    makePersistable(this, {
      name: 'UserStore',
      properties: ['refreshToken', 'user', 'userName'],
    }).then(async () => {
      this.userInitCallbacks.forEach(
        callback => typeof callback === 'function' && callback(),
      );
      this.userInitCallbacks.clear();
      console.log('User Inited', this.user);
      runInAction(() => {
        this.isUserInited = true;
      });
      await this.getAccessToken();
    });

    console.log('USER store constructor');
  }

  get isPersisting() {
    return isPersisting(this);
  }

  get isHydrated() {
    return isHydrated(this);
  }

  get isUserAuth() {
    return !!(this.accessToken && this.refreshToken);
  }

  get isUserBlessed() {
    const expired = +new Date(this.user?.subscription?.expiredAt || 0);
    console.log('isUserBlessed', expired);
    return expired > Date.now();
  }

  get isUserNew() {
    let isNew = false;
    if (this.user?.isUserNew) {
      isNew = true;
    }
    console.log('isUserNew', isNew);
    return isNew;
  }

  async signInWithGoogle(name: string, googleToken: string) {
    console.log('Name', name);
    const token = await this._rootStore.restApi.request<BaseAuthSuccessResult>({
      method: 'POST',
      path: restApiRoutes.GOOGLE_SIGN_IN,
      body: { name, googleToken },
      successStatus: 201,
    });

    console.log('signInWithGoogle result', token?.result);
    if (token?.result) {
      const { accessToken, refreshToken, user, referalCode } = token.result;
      runInAction(() => {
        this.accessToken = accessToken;
        this.accessTokenCreatedAt = Date.now();
        this.refreshToken = refreshToken;
        this.user = user;
        this.userName = name;
        this.referalCode = referalCode;
      });
      this.userAuthorizedHandler();
      if (user?.isFirstRegistration) {
        LogEvent('af_complete_registration', { af_complete_registration });
      }
      return accessToken;
    }
    if (token?.error) {
      Alert.alert('An error in signInWithGoogle has occured: ', token?.error);
    }
    return null;
  }

  async signOut() {
    if (this.isUserAuth) {
      this._rootStore.restApi.request<BaseAuthSuccessResult>({
        method: 'POST',
        path: restApiRoutes.USER_LOGOUT,
        body: { deviceId: this._rootStore.commonStore.deviceId },
        successStatus: 201,
        withToken: true,
      });
    }
    clearPersistedStore(this);
    this._rootStore.confessionsStore.clear();
    GoogleSignin.configure({
      webClientId: GOOGLE_PLAY_WEBCLIENT_ID,
      offlineAccess: true,
    });
    if (await GoogleSignin.isSignedIn()) {
      console.log('Sign out google');
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }
    runInAction(() => {
      this.accessToken = null;
      this.accessTokenCreatedAt = 0;
      this.refreshToken = null;
      this.user = null;
      this.referalCode = null;
      this._rootStore.commonStore.settings = { theme: 'dark' };
    });
    this.userAuthorizedHandler();
  }

  async setCurrentUserName(name: string) {
    const response = await this._rootStore.restApi.request<
      BaseResponse<{ name: string }, string>
    >({
      method: 'POST',
      path: '/users/me',
      body: { name },
      successStatus: 201,
      withToken: true,
    });

    if (response?.result) {
      runInAction(() => {
        this.userName = name;
      });
    }
  }

  async getAccessToken() {
    runInAction(() => {
      this.isUserInAuthorization = true;
    });
    try {
      console.log('Get Access Token start');
      await this.awaitUserInited();
      if (!this.refreshToken) {
        this.signOut();
        return null;
      }
      const token =
        await this._rootStore.restApi.request<BaseAuthSuccessResult>({
          method: 'POST',
          path: '/auth/refresh-token',
          body: { refreshToken: this.refreshToken },
          successStatus: 201,
          withBlock: true,
        });

      console.log('Get Access Token Result', token);
      if (!token) {
        return null;
      }
      if (token?.result) {
        const { accessToken, refreshToken, user, referalCode } = token.result;
        runInAction(() => {
          this.accessToken = accessToken;
          this.accessTokenCreatedAt = Date.now();
          this.refreshToken = refreshToken;
          this.user = user;
          this.referalCode = referalCode;
        });
        return accessToken;
      }
      if (token?.error) {
        Alert.alert('Authorization error: ', token.error);
      }
      this.signOut();
      return null;
    } catch (e) {
      this.signOut();
      Alert.alert('An error has occured: ', JSON.stringify(e));
      console.log('An error has occured: ', e);
      return null;
    } finally {
      this.userAuthorizedHandler();
      runInAction(() => {
        this.isUserInAuthorization = false;
      });
    }
  }
  awaitUserInited() {
    console.log('awaitUserInited', this.isUserInited);
    if (this.isUserInited) {
      return true;
    }
    return new Promise(resolve => {
      this.userInitCallbacks.add(() => resolve(true));
    });
  }

  awaitUserAuthorized() {
    if (this.isUserAuth) {
      return true;
    }
    return new Promise(resolve => {
      this.userAuthorizedCallbacks.add(() => {
        resolve(true);
      });
    });
  }

  userAuthorizedHandler() {
    this.userAuthorizedCallbacks.forEach(
      callback => typeof callback === 'function' && callback(),
    );
    this.userAuthorizedCallbacks.clear();
  }
}

export default UserStore;
