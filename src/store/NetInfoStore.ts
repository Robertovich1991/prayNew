import { makeAutoObservable, runInAction } from 'mobx';
import NetInfo from '@react-native-community/netinfo';

import { IRootStore } from '.';
import { Alert } from 'react-native';

class NetInfoStore {
  private _rootStore: IRootStore;
  isNetworkConnected: boolean | null = true;

  constructor(rootStore: IRootStore) {
    console.log('NetInfoStore init');

    this._rootStore = rootStore;

    NetInfo.addEventListener(state => {
      // console.warn('NetInfo connected: ' + state.isConnected);
      if (!state.isConnected) {
        this._rootStore.webSocketStore.wsDisconnect(false, 'NetInfo');
      }
      runInAction(() => {
        console.log('NetInfo state', state);
        this.isNetworkConnected = state.isConnected;
      });
    });

    makeAutoObservable(this);
  }
}

export default NetInfoStore;
