import { restApiRoutes } from 'constants/rest-api';
import { makeAutoObservable } from 'mobx';
import messaging from '@react-native-firebase/messaging';
import { Notifications } from 'react-native-notifications';
import { IRootStore } from '.';
import { platform } from 'common/utils';
import { navigate } from 'navigation/RefNavigation';
import Routes from 'navigation/Routes';
import { Linking } from 'react-native';
import { LogEvent, af_opened_push_notification } from 'helpers/logEvents';

class PushNotificationStore {
  private _rootStore: IRootStore;

  isInited = false;

  receivedMessagesCount = 0;
  currentPushToken?: string;

  constructor(rootStore: IRootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);

    console.log('PushNotificationStore constructor done');
  }

  async initPushNotifications() {
    console.log(
      new Date().toJSON(),
      'initPushNotifications start',
      this.isInited,
    );
    if (this.isInited) {
      return;
    }
    await this._rootStore.userStore.awaitUserInited();
    await this._rootStore.userStore.awaitUserAuthorized();
    // await this._rootStore.userStore.getAccessToken();
    const allowStatus = await messaging().hasPermission();
    const authStatus = await messaging().requestPermission();
    const pushToken = await messaging().getToken();
    if (pushToken && this.currentPushToken !== pushToken) {
      this.currentPushToken = pushToken;
      const { deviceId } = this._rootStore.commonStore;
      if (deviceId) {
        this._rootStore.restApi.request({
          method: 'POST',
          path: restApiRoutes.PUSH_NOTIFICATION_TOKEN,
          body: {
            pushToken,
            deviceId,
            platform,
          },
          successStatus: 201,
          withToken: true,
        });
      }
    }
    messaging().onTokenRefresh(token => {
      console.log('!!!Refresh token!!!', token);
    });
    messaging().onMessage(message => {
      console.log('messaging().onMessage', message);
    });
    messaging().setBackgroundMessageHandler(async message => {
      console.log('messaging().setBackgroundMessageHandler', message);
      if (message.notification) {
        this.receivedMessagesCount += this.receivedMessagesCount + 1;
        const { title, body } = message.notification;
        Notifications.postLocalNotification(
          {
            body: body || 'Body undefined',
            title: title || 'Title undefined',
            identifier: message.messageId!,
            payload: message,
            sound: undefined as any, // 'chime.aiff',
            badge: this.receivedMessagesCount,
            type: 'type',
            thread: message.messageId!,
          },
          this.receivedMessagesCount,
        );
      }
    });
    messaging().onNotificationOpenedApp(message => {
      console.log('messaging().onNotificationOpenedApp', message, navigate);
      if (message.data?.feedbackTarget) {
        try {
          const { target, id } = JSON.parse(message.data.feedbackTarget);
          if (target && target === 'OPEN_URL' && id) {
            try {
              Linking.openURL(id);
              LogEvent('af_opened_push_notification', {
                af_opened_push_notification,
              });
            } catch {}
            return;
          }
          if (target) {
            const targetRoute = String(
              target,
            ).toUpperCase() as keyof typeof Routes;
            if (targetRoute) {
              navigate(Routes[targetRoute], {});
              LogEvent('af_opened_push_notification', {
                af_opened_push_notification,
              });
            }
          }
        } catch (e) {
          console.log('Error in JSON.parse(message.data.feedbackTarget)', e);
        }
      }
    });
    console.log(new Date().toJSON(), 'initPushNotifications end', {
      allowStatus,
      authStatus,
      pushToken,
    });
    this.isInited = true;
  }
}

export default PushNotificationStore;
