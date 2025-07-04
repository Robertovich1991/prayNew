import { THANKS_MODAL_DEFAULT_PHRASES } from 'constants/phrases';
import { restApiRoutes } from 'constants/rest-api';
import { makeAutoObservable, runInAction } from 'mobx';
import { IRootStore } from '.';
import {
  DonationsListResponse,
  GratitudesListResponse,
} from './responses/donations';

class DonationsStore {
  private _rootStore: IRootStore;

  donations: Donation[] = [];
  gratitudes: Gratitude[] = [];
  lastDonationsFetchTimestamp = 0;
  lastGratitudesFetchTimestamp = 0;
  pulledGratitudes: Gratitude[] = [];
  lastGratitudeIndexByType: Record<string, number> = {};

  constructor(rootStore: IRootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);

    console.log('DonationsStore store constructor');
  }

  async fetchDonations() {
    if (this.lastDonationsFetchTimestamp > Date.now() - 15 * 3600 * 1000) {
      return this.donations;
    }
    this._rootStore.modalStore.showSpinner('fetchDonations');

    try {
      const result =
        await this._rootStore.restApi.request<DonationsListResponse>({
          method: 'GET',
          path: restApiRoutes.DONATIONS_LIST,
          withToken: true,
        });

      if (result?.error) {
        this._rootStore.modalStore.clearSpinner('fetchDonations');
        return null;
      } else {
        runInAction(() => {
          if (result?.items) {
            this.donations = result?.items;
            this.lastDonationsFetchTimestamp = Date.now();
          }
        });
        this._rootStore.modalStore.clearSpinner('fetchDonations');
        return result?.items;
      }
    } catch {
      this._rootStore.modalStore.clearSpinner('fetchDonations');
      return null;
    }
  }

  async fetchGratitudes() {
    if (this.lastGratitudesFetchTimestamp > Date.now() - 15 * 3600 * 1000) {
      return this.gratitudes;
    }
    try {
      const result =
        await this._rootStore.restApi.request<GratitudesListResponse>({
          method: 'GET',
          path: restApiRoutes.GRATITUDES_LIST,
          withToken: true,
        });

      if (result?.error) {
        return null;
      } else {
        runInAction(() => {
          if (result?.items) {
            this.gratitudes = result?.items;
            this.lastGratitudesFetchTimestamp = Date.now();
          }
        });
        return result?.items;
      }
    } catch {
      this._rootStore.modalStore.clearSpinner('fetchGratitudes');
      return null;
    }
  }

  getRandomGratitude(type: GratitudeType = 'default'): Gratitude {
    const availableGratitudesByType = this.gratitudes.filter(
      x => x.type === type,
    );

    if (availableGratitudesByType.length === 0) {
      const defaultGratitude = THANKS_MODAL_DEFAULT_PHRASES[type];
      const result = {
        id: 0,
        createdAt: new Date(),
        publishedAt: new Date(0),
        type,
        ...defaultGratitude,
      };
      return result;
    }

    const lastGratitudeIndex = this.lastGratitudeIndexByType[type] || 0;

    console.log('getRandomGratitude', {
      availableGratitudesByType,
      lastGratitudeIndex,
    });

    if (lastGratitudeIndex + 1 >= availableGratitudesByType.length) {
      this.lastGratitudeIndexByType[type] = 0;
      return availableGratitudesByType[0];
    } else {
      this.lastGratitudeIndexByType[type] = lastGratitudeIndex + 1;
      return availableGratitudesByType[lastGratitudeIndex + 1];
    }
  }
}

export default DonationsStore;
