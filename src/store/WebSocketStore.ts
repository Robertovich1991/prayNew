import { makeAutoObservable, runInAction } from 'mobx';
import { generateUuid } from 'helpers/utils';
import { wsRoutes } from 'constants/web-socket';

import { IRootStore } from '.';
import { Alert } from 'react-native';

interface IBaseIncomingMessage<T, E = any> {
  result: T;
  method: string;
  id: string | null;
  error: E;
}

class WebSocketStore {
  private _rootStore: IRootStore;
  private _methodListeners: {
    uuid: string;
    timestamp: number;
    method: string;
    callback: (method: string, params: any, error: any) => void;
  }[] = [];
  private _subscribers: {
    uuid: string;
    timestamp: number;
    method: string;
    collection: string;
    cummulative: boolean;
  }[] = [];
  isServerConnected = false;
  isServerError = false;
  client?: WebSocket;
  reconnectHandler?: NodeJS.Timeout;

  constructor(rootStore: IRootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);
  }

  wsInit() {
    // console.warn('Websocket Init');
    this.reconnectHandler = undefined;
    if (this.client || !this._rootStore.userStore.isUserAuth) {
      this.wsDisconnect(true, 'init-start');
      return;
    }

    if (!this._rootStore.netInfoStore.isNetworkConnected) {
      this.wsDisconnect(
        true,
        '!this._rootStore.netInfoStore.isNetworkConnected',
      );
      return;
    }

    this.client = new WebSocket(wsRoutes.API_URL);
    console.log('WebSocketStore init client done');

    this.client.onopen = async () => {
      console.log('WebSocketStore client onopen');
      const token = this._rootStore.userStore.accessToken;
      if (token) {
        try {
          await this.authorize();
        } catch {
          runInAction(() => {
            this.isServerConnected = false;
            this.isServerError = true;
          });
          this.wsDisconnect(true, 'onopen authorize error');
        }
      }
      runInAction(() => {
        this.isServerConnected = true;
        this.isServerError = false;
      });
    };

    this.client.onclose = () => {
      // console.warn('ws on close');
      runInAction(() => {
        this.isServerConnected = false;
      });
      this.client = undefined;
      if (this.reconnectHandler) {
        clearTimeout(this.reconnectHandler);
        this.reconnectHandler = undefined;
      }
      this.wsDisconnect(true, 'on-close');
    };

    this.client.onerror = error => {
      runInAction(() => {
        this.isServerError = true;
      });
      console.log('Websocket error.' + JSON.stringify(error));
    };

    this.client.onmessage = message => {
      // console.log('Websocket onmessage.' + JSON.stringify(message), message);
      try {
        const data = JSON.parse(message.data) as IBaseIncomingMessage<any>;
        const { method, result, error } = data;
        console.log('Parsed message', { method, result, error });
        if (method === 'ping') {
          return this.call({
            method: 'pong',
            params: null,
          });
        }
        // console.warn('websocket message received', method);
        if (method === 'new-message') {
          this._rootStore.chatStore.addMessageFromWebsocket(result);
          return;
        }
        if (method === 'prayer-request') {
          this._rootStore.prayersStore.processPrayerEventFromWebsocket(result);
          return;
        }
        const methodListener = this._methodListeners.find(
          x => x.method === method,
        );

        if (methodListener) {
          methodListener.callback(method, data, error);
          const listenerIdx = this._methodListeners.findIndex(
            x => x.uuid === methodListener.uuid,
          );
          this._methodListeners.splice(listenerIdx, 1);
          return;
        }
        return;
      } catch (e) {
        console.error('Received non readable message', e, message);
      }
    };
  }

  async call<T>({
    method,
    params,
  }: {
    method: string;
    params: any;
  }): Promise<T> {
    if (method !== 'pong') {
      // console.warn('call websocket method', method);
    }
    return new Promise((resolve, reject) => {
      const uuid = generateUuid();
      this.client?.send(
        JSON.stringify({
          method,
          params,
          id: uuid,
        }),
      );

      const callback = (method: string, params: any, error: any) => {
        console.log('Method worked', method, params);
        if (!error) {
          resolve(params);
        } else {
          reject(error);
        }
        return;
      };

      this._methodListeners.push({
        uuid,
        timestamp: Date.now(),
        method,
        callback,
      });
    });
  }

  authorize() {
    return this.call({
      method: 'authorize',
      params: {
        access_token: this._rootStore.userStore.accessToken,
      },
    });
  }

  wsDisconnect(withRefresh = false, from?: string) {
    // console.warn('Websocket disconnect', withRefresh, from);
    try {
      this.client?.close();
      this.client = undefined;
      if (withRefresh) {
        this.reconnectHandler = setTimeout(() => {
          console.log('reconnectHandler performed');
          this.wsInit();
        }, 5000);
      }
    } catch (e) {
      console.error('Ws Disconnect error', e);
    }
  }
}

export default WebSocketStore;
