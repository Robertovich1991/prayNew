import { THANKS_MODAL_DEFAULT_PHRASES } from 'constants/phrases';
import { restApiRoutes } from 'constants/rest-api';
import { makeAutoObservable, runInAction } from 'mobx';
import store, { IRootStore } from '.';
import {
  DonationsListResponse,
  GratitudesListResponse,
} from './responses/donations';
import axios from 'axios';

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


 async sendTransaction(data: { transactionId: string }) {
  try {    
    const result = await this._rootStore.restApi.request<GratitudesListResponse>({
      method: 'POST',
      path: restApiRoutes.SEND_TRANSACTION,
      withToken: true,
      body: {
        transactionId: data.transactionId,
        productId:data.productId,
        receiptData:data.transactionReceipt
      },
    });

    console.log(result, 'RESULT TRANSACTION ------');
    return result;
  } catch (error) {
    console.error('Transaction request failed:', error);
    this._rootStore.modalStore.clearSpinner('fetchGratitudes');
    return null;
  }
}

// async sendTransactionSub(data: { transactionId: string }) {
//   try {
//     console.log(data,'......................');
    
//     const result = await this._rootStore.restApi.request<any>({
//       method: 'POST',
//       path: restApiRoutes.SEND_TRANSACTION_SUB,
//       withToken: true,
//       body: {
//         transactionId: '2000000978977217',
//         productId:'12',
//         receiptData:
// "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"

//       },
//     });
//             console.log('ZZZZZZ');
//         console.log('ZZZZZZ');
//         console.log('ZZZZZZ');
//         console.log('ZZZZZZ');
//         console.log('ZZZZZZ');

//     console.log(result,'ZZZZZZ');
//         console.log('ZZZZZZ');        console.log('ZZZZZZ');
//         console.log('ZZZZZZ');
//         console.log('ZZZZZZ');
//         console.log('ZZZZZZ');
//         console.log('ZZZZZZ');


//      if (result?.result) {
//       console.log('ooooooooooooooooooooooooooooooooooooo1111111');
      
//           runInAction(() => {
//             console.log('0000000000000022----222222222222222222222222222222222222222222222222222');
            
//             if (this._rootStore.userStore.user) {
//               const { user } = this._rootStore.userStore;
//               user.subscription = result.result;
//               this._rootStore.userStore.user = {
//                 ...user,
//               };
//             }
//           });
//         }
//      this._rootStore.userStore.updateUserSubscription(result.result);

//     console.log(result, 'RESULT TRANSACTION ------');
//     return result;
//   } catch (error) {
//     console.error('Transaction request failed:', error);
//     this._rootStore.modalStore.clearSpinner('fetchGratitudes');
//     return null;
//   }
// }
// }

async sendTransactionSub(data: { transactionId: string }) {
  try {

    // Construct the full URL based on your API base URL and route
    const url = 'https://app.prayersforafrica.org/api/purchases/apple-subscription'

    // Prepare the request body
    const body = {
      transactionId: data.transactionId,
        productId:data.productId,
        receiptData:data.transactionReceipt
    }
console.log(body,url,'============================pplollllllllllll');

    // Set headers, including authorization token if needed
    const headers = {
      'Content-Type': 'application/json',
      // Assuming your token is stored somewhere accessible, e.g. in your rootStore or context
      Authorization: `Bearer ${this._rootStore.userStore.accessToken}`, 
    };

    // Send POST request with axios
    const response = await axios.post(url, body, { headers });
    const result = response.data;
    if (result?.result) {
      runInAction(() => {
        if (this._rootStore.userStore.user) {
          const { user } = this._rootStore.userStore;
          user.subscription = result.result;
          this._rootStore.userStore.user = {
            ...user,
          };
        }
      });
    }
    return result;
  } catch (error) {
    console.error('Transaction request failed:', error);
    this._rootStore.modalStore.clearSpinner('fetchGratitudes');
    return null;
  }
}}

export default DonationsStore;
