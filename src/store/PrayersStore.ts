import { restApiRoutes } from 'constants/rest-api';
import { makeAutoObservable, runInAction } from 'mobx';
import { Alert } from 'react-native';
import store, { IRootStore } from '.';
import { PastorsListResponse } from './responses/pastors';
import {
  IPrayerRequestPayload,
  PrayerBaseResponse,
  PrayerRequestBaseResponse,
  PrayerRequestsListResponse,
  PrayersListResponse,
} from './responses/prayers';

class PrayersStore {
  private _rootStore: IRootStore;

  prayers: Prayer[] = [];
  lastPastorsFetchTimestamp = 0;

  requests: PrayerRequest[] = [];
  notViewedRequests = 0;
  alreadyViewedRequests: PrayerRequest[] = [];

  constructor(rootStore: IRootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);

    console.log('PrayersStore store constructor');
  }

  async fetchPrayers() {
    if (this.lastPastorsFetchTimestamp > Date.now() - 15 * 3600 * 1000) {
      return this.prayers;
    }
    this._rootStore.modalStore.showSpinner('fetchPrayers');

    try {
      const result = await this._rootStore.restApi.request<PrayersListResponse>(
        {
          method: 'GET',
          path: restApiRoutes.PRAYERS_LIST,
          withToken: true,
        },
      );

      if (result?.error) {
        this._rootStore.modalStore.clearSpinner('fetchPrayers');
        return null;
      } else {
        runInAction(() => {
          if (result?.items) {
            this.prayers = result?.items;
            this.lastPastorsFetchTimestamp = Date.now();
          }
        });
        this._rootStore.modalStore.clearSpinner('fetchPrayers');
        return result?.items;
      }
    } catch {
      this._rootStore.modalStore.clearSpinner('fetchPrayers');
      return null;
    }
  }

  async sendPrayerRequest(id: number, request: string) {
    this._rootStore.modalStore.showSpinner('sendPrayerRequest');

    try {
      const req = await this._rootStore.restApi.request<PrayerBaseResponse>({
        method: 'POST',
        path: restApiRoutes.NEW_PRAYER_REQUEST,
        withToken: true,
        successStatus: 201,
        body: {
          id,
          language: 'en',
          ownerName: this._rootStore.userStore.userName,
          text: request,
        },
      });

      this._rootStore.modalStore.clearSpinner('sendPrayerRequest');

      console.log('sendPrayerRequest result', req);
      if (!req || req.error) {
        return null;
      } else {
        return true;
      }
    } catch {
      this._rootStore.modalStore.clearSpinner('sendPrayerRequest');
      return null;
    }
  }

  async getRequests({
    pageSize = 10,
    current = 1,
    formParams,
  }: {
    pageSize?: number;
    formParams?: any;
    current?: number;
  }) {
    let path = '/requests';
    // if (formParams) path += '&form_params=' + encodeURI(JSON.stringify(formParams));
    const res =
      await this._rootStore.restApi.request<PrayerRequestsListResponse>({
        path,
        method: 'GET',
        withToken: true,
      });

    runInAction(() => {
      if (res?.items) {
        this.requests = res.items.sort(
          (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
        );

        const { id: userId } = this._rootStore.userStore.user || {};

        const notViewedMessages = res.items.reduce((acc, prayerRequest) => {
          const messagesCount = prayerRequest.messages.filter(
            x => x.authorId !== userId && !x.viewedAt,
          ).length;
          return acc + messagesCount;
        }, 0);

        this.setNotViewedRequests(notViewedMessages);
      }
    });

    return res;
  }

  get prayerNamesFromRequests() {
    if (this.requests.length === 0) {
      return [];
    }
    const prayerIds = [...new Set(this.requests.map(x => x.prayerId))];
    return this.prayers
      .filter(x => prayerIds.includes(x.id))
      .map(p => {
        return {
          label: this._rootStore.commonStore.extract(p.text),
          value: String(p.id),
        };
      });
  }

  processPrayerEventFromWebsocket(payload: IPrayerRequestPayload) {
    const { prayerRequest } = payload;

    if (prayerRequest) {
      const existsRequest = this.requests.find(x => x.id === prayerRequest.id);
      const { id: userId } = this._rootStore.userStore.user || {};
      const condition = (m: PrayerRequestMessage) => {
        return m.authorId !== userId && !m.viewedAt;
      };
      const newMessagesCount = prayerRequest.messages.filter(condition).length;
      const existsMessagesCount =
        existsRequest?.messages.filter(condition).length || 0;
      const diff = newMessagesCount - existsMessagesCount;
      if (diff > 0) {
        this.setNotViewedRequests(this.notViewedRequests + diff);
      }
    }

    runInAction(() => {
      this.requests = [
        ...this.requests.filter(x => x.id != prayerRequest.id),
        prayerRequest,
      ].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    });
  }

  async attendadRequest(requestId: string) {
    try {
      const req =
        await this._rootStore.restApi.request<PrayerRequestBaseResponse>({
          method: 'GET',
          path: restApiRoutes.BASE_REQUESTS + `/${requestId}/attended`,
          withToken: true,
          successStatus: 200,
        });

      console.log('attendadRequest result', JSON.stringify(req));
      if (req?.error) {
        Alert.alert('Oops, something went wrong:' + req.error);
        return;
      }

      if (req?.result) {
        if (!this.alreadyViewedRequests.find(x => x.id === requestId)) {
          this.setNotViewedRequests(
            this.notViewedRequests > 0 ? this.notViewedRequests - 1 : 0,
          );
          const storedRequest = this.requests.find(x => x.id === requestId);
          if (storedRequest) {
            this.alreadyViewedRequests.push(storedRequest);
          }
        }
        runInAction(() => {
          this.requests = [
            ...this.requests.filter(x => x.id !== requestId),
            req.result!,
          ].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
        });
      }
    } catch {}
  }

  setNotViewedRequests(count: number) {
    runInAction(() => {
      this.notViewedRequests = count;
    });
  }
}

export default PrayersStore;
