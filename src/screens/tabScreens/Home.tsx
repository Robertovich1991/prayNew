import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import CustomButton from '../../components/CustomButton';
import Routes from '../../navigation/Routes';
import TopBar from '../../components/TopBar';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { responsiveWidth } from '../../common/utils';
import BottomMenu from '../../components/BottomMenu';
import useOwnTranslation from 'hooks/useOwnTranslation';
import { T_KEYS } from 'assets/translations';
import store from 'store';
import { observer } from 'mobx-react';
import AnimatedCross from 'components/AnimatedCross';
import AboutUsModal from 'screens/modals/AboutUsModal';
import GetFirstWeekForFreeModalModal from 'screens/modals/GetFirstWeekForFreeModal';
import { WINDOW_HEIGHT } from 'helpers/dimensions';
import NotBlessedCardModal from 'screens/modals/NotBlessedCardModal';
import { CustomizationColors } from 'styles/customization';
import { useTheme } from '@rneui/themed';
import RenewSubModal from 'screens/modals/RenewSubModal';

type RootStackParamList = {
  [Routes.TARIF_SCREEN]: undefined;
  [Routes.PRIEST_ONLINE]: undefined;
  [Routes.SELECT_LANGUAGE]: undefined;
  [Routes.MUSICAL_ACCOMPANIMENT]: undefined;
  [Routes.PRAYERS]: undefined;
};

type Props = StackNavigationProp<RootStackParamList>;

const Home = () => {
  const navigation = useNavigation<Props>();
  const t = useOwnTranslation;
  const { theme } = useTheme();

  useEffect(() => {
    store.chatStore.getChats({});
    store.prayersStore.getRequests({});
    store.donationsStore.fetchGratitudes();
  }, []);

  useEffect(() => {
    if (!store.commonStore.settings.isAboutUsGreetingCompleted) {
      store.modalStore.open(
        <AboutUsModal
          continueAction={() => {
            navigation.navigate(Routes.PRAYERS);
          }}
        />,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.commonStore.settings.isAboutUsGreetingCompleted]);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }, []),
  );

  const blessedStatus = store.userStore.isUserBlessed
    ? t(T_KEYS.HOME_SCREEN_PASTOR_ALREADY_BLESSED)
    : t(T_KEYS.HOME_SCREEN_PASTOR_NOT_BLESSED);

  const showRenewSubModal = () => {
    store.modalStore.open(
      <RenewSubModal
        buttonAction={() => {
          navigation.navigate(Routes.TARIF_SCREEN);
          store.modalStore.close();
        }}
      />,
    );
  };

  const showGetSubPopup = () => {
    if (store.userStore.isUserNew) {
      store.modalStore.open(
        <GetFirstWeekForFreeModalModal
          onBecomeBlessedClick={() => {
            navigation.navigate(Routes.TARIF_SCREEN);
            store.modalStore.close();
          }}
        />,
      );
    } else {
      store.modalStore.open(
        <NotBlessedCardModal
          buttonAction={() => {
            navigation.navigate(Routes.TARIF_SCREEN);
            store.modalStore.close();
          }}
        />,
      );
    }
  };

  return (
    <View
      style={{
        ...styles.wrapper,
        backgroundColor: theme.colors.backgroundPrimary,
      }}
    >
      <View style={styles.topBar}>
        <TopBar text={t(T_KEYS.HOME_SCREEN_TITLE)} />
      </View>
      <View style={styles.crossWrapper}>
        <AnimatedCross isBlessed={false} />
      </View>
      <View style={styles.btnWrapper}>
        <CustomButton
          title={blessedStatus}
          onPress={() => {
            if (store.userStore.isUserBlessed) {
              showRenewSubModal();
            } else {
              navigation.navigate(Routes.TARIF_SCREEN);
            }
          }}
        />
        <CustomButton
          notice={store.chatStore.unattendedMessagesCount}
          style={styles.blackButton}
          backgroundColor={'transparent'}
          title={t(T_KEYS.HOME_SCREEN_PASTOR_ONLINE)}
          onPress={() => {
            if (!store.userStore.isUserBlessed) {
              showGetSubPopup();
            } else {
              navigation.navigate(Routes.PRIEST_ONLINE);
            }
          }}
        />
      </View>
      <View style={styles.bottomMenuWrapper}>
        <BottomMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  topBar: {
    height: responsiveWidth(91),
    justifyContent: 'flex-end',
    paddingHorizontal: responsiveWidth(20),
    zIndex: 2,
    marginBottom: responsiveWidth(50),
  },
  crossWrapper: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  btnWrapper: {
    marginTop: responsiveWidth(42),
    height: responsiveWidth(120),
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(44),
  },
  blackButton: {
    borderWidth: 1,
    borderColor: CustomizationColors.get('BLACK_SECONDARY'),
  },
  bottomMenuWrapper: {
    height: responsiveWidth(100),
  },
  freeModalWrapper: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    // width: '100%',
    height: WINDOW_HEIGHT,
    position: 'absolute',
    zIndex: 2000,
  },
});

export default observer(Home);
