export const wsRoutes = {
  API_URL:
    process.env.NODE_ENV === 'development'
      ? 'wss://prayers.nsstms.ru/websocket/'
      : 'wss://app.prayersforafrica.org/websocket/',
  SING_IN_CALL: 'api/v1/auth/signIn',
  SING_UP_CALL: 'api/v1/auth/signUp',
  SET_TOKEN_CALL: 'api/v1/auth/setToken',
  GET_EVENTS_CALL: 'api/v1/play/get',
  JOIN_CALL: 'api/v1/play/join',
  LEFT_CALL: 'api/v1/play/left',
  JOIN_SUB_CALL: 'client/v1/play/control',
};
