import AsyncStorage from '@react-native-async-storage/async-storage';
import { configurePersistable } from 'mobx-persist-store';

import CommonStore from './CommonStore';
import ArticlesStore from './ArticlesStore';
import WebSocketStore from './WebSocketStore';
import UserStore from './UserStore';
import NetInfoStore from './NetInfoStore';
import RestApi from './RestApiStore';
import ModalStore from './ModalStore';
import PastorsStore from './PastorsStore';
import PrayersStore from './PrayersStore';
import SubscriptionsStore from './SubscriptionsStore';
import DonationsStore from './DonationsStore';
import ChatStore from './ChatStore';
import PurchaseStore from './PurchaseStore';
import PushNotificationStore from './PushNotificationStore';
import ConfessionsStore from './ConfessionStore';
import ReferralsStore from './ReferralsStore';

export interface IRootStore {
  commonStore: CommonStore;
  articlesStore: ArticlesStore;
  pastorsStore: PastorsStore;
  prayersStore: PrayersStore;
  subscriptionsStore: SubscriptionsStore;
  donationsStore: DonationsStore;
  webSocketStore: WebSocketStore;
  userStore: UserStore;
  netInfoStore: NetInfoStore;
  modalStore: ModalStore;
  restApi: RestApi;
  chatStore: ChatStore;
  purchaseStore: PurchaseStore;
  pushNotificationStore: PushNotificationStore;
  confessionsStore: ConfessionsStore;
  referralsStore: ReferralsStore;
}

class RootStore implements IRootStore {
  commonStore: CommonStore;
  articlesStore: ArticlesStore;
  pastorsStore: PastorsStore;
  prayersStore: PrayersStore;
  subscriptionsStore: SubscriptionsStore;
  donationsStore: DonationsStore;
  webSocketStore: WebSocketStore;
  userStore: UserStore;
  netInfoStore: NetInfoStore;
  restApi: RestApi;
  modalStore: ModalStore;
  chatStore: ChatStore;
  purchaseStore: PurchaseStore;
  pushNotificationStore: PushNotificationStore;
  confessionsStore: ConfessionsStore;
  referralsStore: ReferralsStore;

  constructor() {
    // All properties are optional
    configurePersistable({
      storage: AsyncStorage,
      // expireIn: 30 * 86400000,
      // removeOnExpiration: true,
      stringify: true,
      debugMode: false,
    });
    this.commonStore = new CommonStore(this);
    this.articlesStore = new ArticlesStore(this);
    this.pastorsStore = new PastorsStore(this);
    this.prayersStore = new PrayersStore(this);
    this.subscriptionsStore = new SubscriptionsStore(this);
    this.donationsStore = new DonationsStore(this);
    this.webSocketStore = new WebSocketStore(this);
    this.userStore = new UserStore(this);
    this.netInfoStore = new NetInfoStore(this);
    this.restApi = new RestApi(this);
    this.modalStore = new ModalStore();
    this.chatStore = new ChatStore(this);
    this.purchaseStore = new PurchaseStore(this);
    this.pushNotificationStore = new PushNotificationStore(this);
    this.confessionsStore = new ConfessionsStore(this);
    this.referralsStore = new ReferralsStore(this);
  }
}

const store = new RootStore();

export default store;
