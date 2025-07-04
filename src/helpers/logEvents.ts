import appsFlyer from 'react-native-appsflyer';
import { AppEventsLogger, Params } from 'react-native-fbsdk-next';

const initOptions = {
  devKey: 'aVDwWKkqyfNVAxmcWTmziP',
  // devKey: 'Df7wjF5Mqs3iL3S74iJhnN',
  isDebug: true,
  // appId: 'ru.nsstms.prayersforafrica.app',
  onInstallConversionDataListener: true, //Optional
  onDeepLinkListener: true, //Optional
  // timeToWaitForATTUserAuthorization: 10 //for iOS 14.5
};

// раскрытие статьи нажатием на "show more"
export const af_content_view = 'af_content_view';
// пройденная регистрация
export const af_complete_registration = 'af_complete_registration';
// открытие пуш-уведомления
export const af_opened_push_notification = 'af_opened_push_notification';
// попытка отправки доната
export const af_donation_started = 'af_donation_started';
// успешная отправка доната
// export const af_donation_completed - объект в Donations
// попытка оплатить подписку
export const af_paid_subscription_started = 'af_paid_subscription_started';
// успешная подписка
// export const af_paid_subscription_completed - объект в SubscriptionStore
// продление подписки
export const af_renew_subscription = 'af_renew_subscription';
// отписка
export const af_unsubscribe = 'af_unsubscribe';

export function ApsFlyerInit() {
  appsFlyer.initSdk(
    initOptions,
    res => {
      console.log('init appsflyer', res);
    },
    err => {
      console.error('init appsflyer', err);
    },
  );
}

function FacebookSdkEvent(name: string, object: Params) {
  try {
    AppEventsLogger.logEvent(name, object);
    console.log('FacebookSdkEvent', name);
  } catch (e) {
    console.error('Error in FacebookSdkEvent', e);
  }
}

export function LogEvent(name: string, object: object) {
  try {
    appsFlyer.logEvent(
      name,
      object,
      res => {
        console.log(`${name}`, res);
      },
      err => {
        console.error(`${name}`, err);
      },
    );

    FacebookSdkEvent(name, object as any);
  } catch (e) {
    console.error('Error in LogEvent', e);
  }
}
