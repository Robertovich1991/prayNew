import store from 'store';

export const useCurrentUser = () => {
  const {
    isUserAuth,
    accessToken,
    userName,
    isUserInited,
    isPersisting,
    isUserInAuthorization,
  } = store.userStore;

  const signOut = () => {
    // store.userStore.singOut();
  };

  return {
    accessToken,
    isUserAuth,
    userName,
    isUserInited,
    isPersisting,
    isUserInAuthorization,
    signOut,
  };
};
