import { restApiRoutes } from 'constants/rest-api';
import { makeAutoObservable, runInAction } from 'mobx';
import { SubscriptionPurchase } from 'react-native-iap';
import { IRootStore } from '.';
import {
  RegisteredSubscriptionBaseResponse,
  SubscriptionBaseResponse,
  SubscriptionsListResponse,
} from './responses/subscriptions';
import { LogEvent } from 'helpers/logEvents';

class SubscriptionsStore {
  private _rootStore: IRootStore;

  subscriptions: Subscription[] = [];
  lastSubscriptionsFetchTimestamp = 0;

  constructor(rootStore: IRootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);

    console.log('SubscriptionsStore store constructor');
  }

  async fetchSubscriptions() {
    if (this.lastSubscriptionsFetchTimestamp > Date.now() - 15 * 3600 * 1000) {
      return this.subscriptions;
    }
    this._rootStore.modalStore.showSpinner('fetchSubscriptions');

    try {
      const result =
        await this._rootStore.restApi.request<SubscriptionsListResponse>({
          method: 'GET',
          path: restApiRoutes.SUBSCRIPTIONS_LIST,
          withToken: true,
        });

      if (result?.error) {
        this._rootStore.modalStore.clearSpinner('fetchSubscriptions');
        return null;
      } else {
        if (result?.items) {
          await this._rootStore.purchaseStore.getActiveSubscriptions(
            result.items.map(x => x.googleSku),
          );
          runInAction(() => {
            this.subscriptions = result.items!;
            this.lastSubscriptionsFetchTimestamp = Date.now();
          });
        }
        this._rootStore.modalStore.clearSpinner('fetchSubscriptions');
        return result?.items;
      }
    } catch {
      this._rootStore.modalStore.clearSpinner('fetchSubscriptions');
      return null;
    }
  }

  async subscribe(id: number) {
    const { language } = this._rootStore.commonStore.settings || {
      language: 'en',
    };
    const ownerName = this._rootStore.userStore.userName;

    const body = {
      id,
      language,
      ownerName,
    };

    console.log('subscribe body', body, this._rootStore.commonStore.settings);

    try {
      const result =
        await this._rootStore.restApi.request<SubscriptionBaseResponse>({
          method: 'POST',
          path: restApiRoutes.SUBSCRIBE,
          withToken: true,
          body,
          successStatus: 201,
        });

      console.log('subscribe result', result);

      return result;
    } catch {
      return null;
    }
  }

  updateSubscription(subscription: RegisteredSubscription) {
    if (subscription) {
      runInAction(() => {
        if (this._rootStore.userStore.user) {
          this._rootStore.userStore.user = {
            ...this._rootStore.userStore.user,
            subscription,
          };
          LogEvent('af_paid_subscription_completed', {
            af_revenue: subscription.price,
            af_currency: 'USD',
          });
          if (this._rootStore.userStore.isUserNew) {
            this._rootStore.userStore.user = {
              ...this._rootStore.userStore.user,
              isUserNew: false,
            };
          }
        }
      });
    }
  }

  async unsubscribe() {
    if (
      this._rootStore.userStore.user?.subscription &&
      +new Date(this._rootStore.userStore.user.subscription.expiredAt) >
        Date.now()
    ) {
      try {
        const req =
          await this._rootStore.restApi.request<RegisteredSubscriptionBaseResponse>(
            {
              method: 'POST',
              path: restApiRoutes.REVOKE_SUBSCRIPTION,
              withToken: true,
              successStatus: 201,
            },
          );

        console.log('unsubscribe result', req);

        if (req?.result) {
          runInAction(() => {
            if (this._rootStore.userStore.user) {
              const { user } = this._rootStore.userStore;
              user.subscription = req.result;
              this._rootStore.userStore.user = {
                ...user,
              };
            }
          });
        }

        return req;
      } catch {
        return {
          error: 'Global error while googleIAPPayment fetching',
        };
      }
    }
  }
}

export default SubscriptionsStore;
