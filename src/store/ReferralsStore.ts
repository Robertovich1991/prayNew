import { addMonths, startOfMonth, subMonths, subYears } from 'date-fns';
import { makeAutoObservable, runInAction } from 'mobx';

import { IRootStore } from './index';

import { mockedReferrals } from '../screens/referral-program/widgets/mocks';

class ReferralsStore {
  private _rootStore: IRootStore;

  referrals: ReferralTransaction[] = [];

  constructor(rootStore: IRootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);

    console.log('ReferralsStore store constructor');
  }

  async fetchReferrals(filterState: FilterState) {
    let start: number | undefined;
    let end: number | undefined = Date.now();

    switch (filterState) {
      case 'in-three-months': {
        start = +subMonths(Date.now(), 3);
        break;
      }
      case 'last-month': {
        start = +subMonths(Date.now(), 1);
        end = +addMonths(start, 1);
        break;
      }
      case 'over-the-year': {
        start = +subYears(Date.now(), 1);
        break;
      }
      case 'this-month': {
        start = +startOfMonth(Date.now());
        break;
      }
      default: {
        start = undefined;
      }
    }

    this._rootStore.modalStore.showSpinner('fetchReferrals');

    await new Promise(resolve => setTimeout(() => resolve(true), 350));

    runInAction(() => {
      this.referrals = mockedReferrals.filter(x => {
        if (!start) {
          return true;
        }
        if (x.purchaseDate) {
          return (
            x.purchaseDate >= start && (end ? x.purchaseDate <= end : true)
          );
        }

        return (
          x.registrationDate >= start &&
          (end ? x.registrationDate <= end : true)
        );
      });

      this._rootStore.modalStore.clearSpinner('fetchReferrals');
    });
  }
}

export default ReferralsStore;
