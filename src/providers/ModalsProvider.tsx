/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import store from 'store';
import ModalContainer from './ModalContainer';
import NetInfo from '@react-native-community/netinfo';
import useDebounce from 'hooks/useDebounce';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from 'helpers/dimensions';
import CustomText from 'components/CustomText';

NetInfo.configure({
  reachabilityUrl: 'https://clients3.google.com/generate_204',
  reachabilityTest: async response => response.status === 204,
  reachabilityLongTimeout: 60 * 1000, // 60s
  reachabilityShortTimeout: 5 * 1000, // 5s
  reachabilityRequestTimeout: 15 * 1000, // 15s
  reachabilityShouldRun: () => true,
});

const ModalsProvider = () => {
  const [netInfoState, setNetInfoState] = useState<boolean | null>(false);
  const [netInfoStateDebounced, handler] = useDebounce<boolean>(
    netInfoState,
    5000,
  );
  const [showNoInternet, setShowNoInternet] = useState(false);

  useEffect(() => {}, [store.modalStore.changes]);

  useEffect(() => {
    console.log(
      'store.userStore.isPersisting',
      store.userStore.isPersisting,
      store.userStore.isHydrated,
    );
  }, [store.userStore.isPersisting, store.userStore.isHydrated]);

  useEffect(() => {
    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      setNetInfoState(state.isConnected);
    });

    return () => {
      typeof unsubscribeNetInfo === 'function' && unsubscribeNetInfo();
      handler && clearTimeout(handler);
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (!netInfoStateDebounced) {
        const state = await NetInfo.fetch();
        if (!state.isConnected) {
          setShowNoInternet(true);
        }
      } else {
        setShowNoInternet(false);
      }
    })();
  }, [netInfoStateDebounced]);

  if (showNoInternet) {
    return (
      <>
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="transparent"
        />

        <View style={styles.modalContainer}>
          <CustomText children="No internet connection" />
        </View>
      </>
    );
  }

  if (!store.userStore.isHydrated) {
    return (
      <>
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="transparent"
        />

        <View style={styles.modalContainer}>
          <CustomText style={styles.modalText} color={'#cccccc'}>
            Loading...
          </CustomText>
        </View>
      </>
    );
  }

  if (store.modalStore.modals[0]) {
    return (
      <>
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="transparent"
        />
        <View
          style={styles.modalContainer}
          onTouchEnd={() => {
            store.modalStore.close();
          }}
        >
          <ModalContainer
            close={() => {
              store.modalStore.close();
            }}
          >
            {store.modalStore.modals[0]?.modal || <></>}
          </ModalContainer>
        </View>
      </>
    );
  } else {
    return <></>;
  }
};

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flex: 1,
    zIndex: 1000,
    position: 'absolute',
  },
  modalText: {
    position: 'absolute',
    top: WINDOW_HEIGHT / 2,
    left: WINDOW_WIDTH / 2,
  },
});

export default observer(ModalsProvider);
