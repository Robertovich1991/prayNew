export const restApiRoutes = {
  /**
   * Это хост бэкенда
   */
  API_BACKED_URL:
    process.env.NODE_ENV === 'development'
  // ? 'http://85.209.195.224:5001/api':'http://85.209.195.224:5001/api',
   ? 'https://app.prayersforafrica.org/api'
  : 'https://app.prayersforafrica.org/api',
  /**
   * Здесь живет авторизация Google
   */
  GOOGLE_SIGN_IN: '/auth/sign-in-with-google',
  APPLE_SIGN_IN:'/auth/sign-in-with-apple',
  ARTICLES_LIST: '/articles',
  PASTORS_LIST: '/pastors',
  PRAYERS_LIST: '/prayers',
  SUBSCRIPTIONS_LIST: '/subscriptions',
  DONATIONS_LIST: '/donations',
  GRATITUDES_LIST: '/donations/gratitudes',
  SEND_TRANSACTION:'/purchases/apple-purchase',
  SEND_CANDLE_TRANSACTION:'/candles/purchase',
  SEND_TRANSACTION_SUB:'/purchases/apple-subscription',

  NEW_PRAYER_REQUEST: '/requests/new-request',
  BASE_REQUESTS: '/requests',
  BASE_CHATS: '/chats/',

  SUBSCRIBE: '/subscriptions/subscribe',
  UNSUBSCRIBE: '/subscriptions/unsubscribe',
  REVOKE_SUBSCRIPTION: '/purchases/revoke-subscription',
  GOOGLE_IAP_PAYMENT: '/subscriptions/google-iap-payment',

  USER_SET_LANGUAGE: '/users/language',
  USER_LOGOUT: '/users/logout',

  PUSH_NOTIFICATION_TOKEN: '/notifications/me/token',

  PURCHASE_DONATION: '/purchases/donation',
  PURCHASE_SUBSCRIPTION: '/purchases/subscription',
  ACTIVATE_PROMO_SUBSCRIPTION: '/purchases/activate-promo-subscription',

  JOIN_OUR_COMMUNITY: '/content/join-our-community',

  MY_CANDLES: '/candles/my-candles',
  LIGHT_CANDLE: '/candles/light',
};
