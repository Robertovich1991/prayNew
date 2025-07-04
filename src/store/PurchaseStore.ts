import { restApiRoutes } from 'constants/rest-api';
import { makeAutoObservable, runInAction } from 'mobx';
import { IRootStore } from '.';
import * as RNIap from 'react-native-iap';
import { EmitterSubscription, Platform } from 'react-native';
import { PurchaseBaseResponse } from './responses/purchases';
import { RegisteredSubscriptionBaseResponse } from './responses/subscriptions';

class PurchaseStore {
  private _rootStore: IRootStore;
  isInitedRNIap = false;

  purchaseUpdateListener: EmitterSubscription;
  purchaseErrorListener: EmitterSubscription;

  public availableSubscriptions: RNIap.SubscriptionAndroid[] = [];

  constructor(rootStore: IRootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);

    console.log('PurchaseStore constructor done');
  }

  async initRNIap() {
    if (this.isInitedRNIap) {
      return true;
    }
    let connected = false;
    try {
      connected = await RNIap.initConnection();
      console.log('RNIap', !!RNIap, connected);
      // Alert.alert(JSON.stringify({ RNIap }));
      if (Platform.OS === 'android') {
        const pending =
          await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
        console.log('Pending purchases android', pending);
      } else {
        await RNIap.clearTransactionIOS();
      }
      return connected;
    } catch (err) {
      console.error('Handled error in initRNIap', err);
      return false;
    } finally {
      runInAction(() => {
        this.isInitedRNIap = connected;
      });
    }
  }

  async getActiveProducts(productsSKUs: string[]) {
    await this.initRNIap();
    const products = await RNIap.getProducts({ skus: productsSKUs });
    console.log('getActiveDonations', products);
    return products;
  }

  async getActiveSubscriptions(subscriptionsSKUs: string[]) {
    await this.initRNIap();
    const subscriptions = await RNIap.getSubscriptions({
      skus: subscriptionsSKUs,
    });
    console.log('get subscriptions', subscriptions);
    runInAction(() => {
      this.availableSubscriptions =
        subscriptions as RNIap.SubscriptionAndroid[];
    });
    return subscriptions;
  }

  async getAvailablePurchases() {
    await this.initRNIap();
    const purchases = await RNIap.getAvailablePurchases();
    const history = await RNIap.getPurchaseHistory();
    return {
      purchases,
      history,
    };
  }

  async purchaseProduct(
    product: RNIap.Product | RNIap.SubscriptionAndroid,
    type: 'donation' | 'sub' = 'donation',
  ): Promise<PurchaseBaseResponse | RegisteredSubscriptionBaseResponse> {
    return new Promise((resolve, reject) => {
      console.log('purchaseProduct', JSON.stringify({ product, type }));
      const path =
        type === 'donation'
          ? restApiRoutes.PURCHASE_DONATION
          : restApiRoutes.PURCHASE_SUBSCRIPTION;

      try {
        this.purchaseUpdateListener = RNIap.purchaseUpdatedListener(
          async (purchase: RNIap.SubscriptionPurchase) => {
            console.log(
              'purchaseUpdateListener',
              JSON.stringify({
                purchase,
              }),
            );

            if (purchase) {
              console.log('Purchase done');
              const purchaseOnBackend = await this._rootStore.restApi.request<
                PurchaseBaseResponse | RegisteredSubscriptionBaseResponse
              >({
                method: 'POST',
                path,
                withToken: true,
                body: {
                  purchase,
                  productId: product.productId,
                },
                successStatus: 201,
              });
              console.log('purchaseOnBackend', purchaseOnBackend);
              if (purchaseOnBackend && purchaseOnBackend.result) {
                this.clearListeners();
                resolve(purchaseOnBackend);
              } else if (purchaseOnBackend?.error) {
                this.clearListeners();
                reject(`Backend Error: ${purchaseOnBackend.error}`);
              }
            } else {
              console.log('Purchase error');
              this.clearListeners();
              reject(
                'Code: SELF, Message: Error occured, Reason: Purchase unavailable',
              );
            }
            return;
          },
        );

        this.purchaseErrorListener = RNIap.purchaseErrorListener(
          (error: RNIap.PurchaseError) => {
            console.log('purchaseErrorListener', error);
            reject(
              `Code: ${error.code}, Message: ${error.message}, Reason: ${error.debugMessage}`,
            );
            this.clearListeners();
            return;
          },
        );

        if (type === 'sub') {
          const subscriptionOffersAndroid = (
            product as RNIap.SubscriptionAndroid
          ).subscriptionOfferDetails;

          const offerToken = subscriptionOffersAndroid[0]?.offerToken;

          RNIap.requestSubscription({
            sku: product.productId,
            ...(offerToken && {
              subscriptionOffers: [{ sku: product.productId, offerToken }],
            }),
          }).catch(err => {
            console.log('Request Purchase Subscription error', err);
          });
        } else {
          RNIap.requestPurchase({
            skus: [product.productId],
          }).catch(err => {
            console.log('Request Purchase error', err);
          });
        }
      } catch (e) {
        this.clearListeners();
        reject(`Code: SELF, Message: Handled exception, Reason: ${e}`);
      }
    });
  }

  clearListeners() {
    if (this.purchaseUpdateListener) {
      this.purchaseUpdateListener.remove();
      this.purchaseUpdateListener = undefined as any;
    }
    if (this.purchaseErrorListener) {
      this.purchaseErrorListener.remove();
      this.purchaseErrorListener = undefined as any;
    }
  }

  async activatePromoSubscription(): Promise<RegisteredSubscriptionBaseResponse> {
    if (!this._rootStore.userStore.isUserNew) {
      throw 'This method not allowed for you';
    }

    return new Promise(async (resolve, reject) => {
      console.log(
        'activatePromoSubscription',
        this._rootStore.userStore.isUserNew,
      );
      const path = restApiRoutes.ACTIVATE_PROMO_SUBSCRIPTION;

      try {
        const purchaseOnBackend =
          await this._rootStore.restApi.request<RegisteredSubscriptionBaseResponse>(
            {
              method: 'POST',
              path,
              withToken: true,
              body: {},
              successStatus: 201,
            },
          );
        if (purchaseOnBackend && purchaseOnBackend.result) {
          this._rootStore.subscriptionsStore.updateSubscription(
            purchaseOnBackend.result! as RegisteredSubscription,
          );
          resolve(purchaseOnBackend);
        } else if (purchaseOnBackend?.error) {
          reject(`Backend Error: ${purchaseOnBackend.error}`);
        }
      } catch (e) {
        reject(`Code: SELF, Message: Handled exception, Reason: ${e}`);
      }
    });
  }
}

export default PurchaseStore;
