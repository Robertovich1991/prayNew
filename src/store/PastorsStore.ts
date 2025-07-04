import { restApiRoutes } from 'constants/rest-api';
import { makeAutoObservable, runInAction } from 'mobx';
import { IRootStore } from '.';
import { PastorsListResponse } from './responses/pastors';

class PastorsStore {
  private _rootStore: IRootStore;

  pastors: Pastor[] = [];
  lastPastorsFetchTimestamp = 0;

  constructor(rootStore: IRootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);

    console.log('PastorsStore store constructor');
  }

  async fetchPastors() {
    if (this.lastPastorsFetchTimestamp > Date.now() - 15 * 3600 * 1000) {
      return this.pastors;
    }
    this._rootStore.modalStore.showSpinner('fetchPastors');

    try {
      const result = await this._rootStore.restApi.request<PastorsListResponse>(
        {
          method: 'GET',
          path: restApiRoutes.PASTORS_LIST,
          withToken: true,
        },
      );

      if (result?.error) {
        this._rootStore.modalStore.clearSpinner('fetchPastors');
        return null;
      } else {
        runInAction(() => {
          if (result?.items) {
            this.pastors = result?.items;
            this.lastPastorsFetchTimestamp = Date.now();
          }
        });
        this._rootStore.modalStore.clearSpinner('fetchPastors');
        return result?.items;
      }
    } catch {
      this._rootStore.modalStore.clearSpinner('fetchPastors');
      return null;
    }
  }
}

export default PastorsStore;
