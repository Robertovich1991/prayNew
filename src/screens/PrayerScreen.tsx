import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
} from 'react-native';
import TopBar from '../components/TopBar';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native';
import { responsiveWidth, useCndUrl } from '../common/utils';
import CustomButton from '../components/CustomButton';
import CustomLine from '../components/CustomLine';
import PrayGradient from 'assets/img/prayGradient.png';
import PrayWhiteGradient from 'assets/img/prayWhiteGradient.png';
import CustomText from '../components/CustomText';
import PlayfairTitle from '../components/PlayfairTitle';
import { T_KEYS } from 'assets/translations';
import useOwnTranslation from 'hooks/useOwnTranslation';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import store from 'store';
import ThanksModal from './modals/ThanksModal';
import SubscribeFreeForMonthModal from './modals/GetFreeMonthModal';
import ErrorModal from './modals/ErrorModal';
import Routes from 'navigation/Routes';
import { StackNavigationProp } from '@react-navigation/stack';
import NotBlessedCardModal from './modals/NotBlessedCardModal';
import { useTheme } from '@rneui/themed';
import { CustomizationColors } from 'styles/customization';

type RootStackParamList = {
  [Routes.TARIF_SCREEN]: undefined;
};

type Props = StackNavigationProp<RootStackParamList>;

const PrayerScreen: React.FC<RouteProp<any>> = () => {
  const { params } = useRoute() as any;
  const navigation = useNavigation<Props>();
  const [prayer, setPrayer] = useState<Prayer>();
  const itemImg = useCndUrl(prayer?.titleImageUrl);
  const { theme } = useTheme();
  useEffect(() => {
    console.log('PrayerScreen', params?.prayerId);
    const targetPrayer = store.prayersStore.prayers.find(
      x => x.id === params?.prayerId,
    );
    if (targetPrayer) {
      setPrayer(targetPrayer);
    }
  }, [params?.prayerId]);

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

  const [prayerRequest, setPrayerRequest] = useState('');

  const t = useOwnTranslation;

  const title = t(T_KEYS.PRAYER_REQUEST_SUCCESS_THANKS);

  const onSendPrayerRequestButtonClick = async () => {
    console.log('send prayer button click', prayerRequest);
    Keyboard.dismiss();
    const sendRequest = async () => {
      const res = await store.prayersStore.sendPrayerRequest(
        prayer!.id,
        prayerRequest,
      );
      if (res) {
        store.modalStore.open(
          <ThanksModal
            title={title}
            onCloseAction={() => {
              setPrayerRequest('');
              navigation.goBack();
            }}
            source={'request-gratitude'}
          />,
        );
      } else {
        store.modalStore.open(<ErrorModal title="An error occured" />);
      }
    };
    if (prayer && prayerRequest.length > 2) {
      if (store.userStore.isUserNew) {
        store.modalStore.open(
          <SubscribeFreeForMonthModal
            closeAction={() => {
              setPrayerRequest('');
              navigation.goBack();
            }}
            onGetFreeMonthSubscriptionClick={async () => {
              navigation.navigate(Routes.TARIF_SCREEN);
              store.modalStore.close();
            }}
          />,
        );
      } else if (store.userStore.isUserBlessed) {
        sendRequest();
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
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View>
        <View style={styles.topBar}>
          <TopBar backArrow={true} />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          onStartShouldSetResponder={() => true}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={{
              ...styles.container,
              backgroundColor: theme.colors.backgroundPrimary,
            }}
          >
            <View>
              <Image style={styles.image} source={{ uri: itemImg }} />
              <Image
                style={styles.gradient}
                source={
                  theme.mode === 'dark' ? PrayGradient : PrayWhiteGradient
                }
              />
              <View style={styles.imageItems}>
                <View style={styles.imageText}>
                  <View style={styles.titleWrapper}>
                    <PlayfairTitle>
                      {t(prayer?.text || 'UNKNOWN_VALUE')}
                    </PlayfairTitle>
                  </View>
                  <CustomText
                    fontFamily="NotoSans-Italic"
                    color={theme.colors.textColorSecondary}
                    lineHeight={responsiveWidth(27)}
                    style={styles.backgroundText}
                  >
                    {t(prayer?.biblioPhrase || 'UNKNOWN_VALUE')}
                  </CustomText>
                  <CustomText
                    fontWeight="light"
                    lineHeight={responsiveWidth(27)}
                    style={styles.backgroundText}
                  >
                    {`— ${t(prayer?.biblioPhraseSource || 'UNKNOWN_VALUE')}`}
                  </CustomText>
                </View>
              </View>
            </View>
            <View style={styles.wrapper}>
              <CustomLine />
              <CustomText
                fontWeight="light"
                lineHeight={responsiveWidth(22)}
                color={theme.colors.textColorSecondary}
                style={styles.text}
              >
                {t(prayer?.description || 'UNKNOWN_VALUE')}
              </CustomText>
              <TextInput
                style={{
                  ...styles.textInput,
                  color: theme.colors.textColorPrimary,
                }}
                multiline={true}
                textAlignVertical="top"
                placeholder={t(T_KEYS.TEXT_INPUT_PLACEHOLDER)}
                placeholderTextColor={theme.colors.textColorTertiary}
                onChangeText={setPrayerRequest}
              />
              <CustomButton
                onPress={onSendPrayerRequestButtonClick}
                title={t(T_KEYS.PRAYER_SCREEN_SEND)}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  topBar: {
    paddingTop: responsiveWidth(71),
    paddingLeft: responsiveWidth(20),
    position: 'absolute',
    zIndex: 2,
  },
  container: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: responsiveWidth(360),
  },
  gradient: {
    width: '100%',
    // height: responsiveWidth(188),
    position: 'absolute',
    bottom: 0,
  },
  imageItems: {
    width: '100%',
    height: responsiveWidth(360),
    position: 'absolute',
    paddingHorizontal: responsiveWidth(20),
    justifyContent: 'flex-end',
  },
  imageText: {
    height: responsiveWidth(230),
    justifyContent: 'space-between',
  },
  titleWrapper: {
    width: responsiveWidth(200),
    alignSelf: 'center',
  },
  backgroundText: {
    textAlign: 'center',
  },
  wrapper: {
    marginTop: responsiveWidth(36),
    paddingHorizontal: responsiveWidth(20),
    paddingBottom: responsiveWidth(20),
  },
  text: {
    marginTop: responsiveWidth(44),
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: CustomizationColors.get('BLACK_SECONDARY'),
    borderRadius: responsiveWidth(12),
    height: responsiveWidth(290),
    padding: responsiveWidth(16),
    fontFamily: 'NotoSans-Light',
    fontSize: responsiveWidth(15),
    lineHeight: responsiveWidth(27),
    marginBottom: responsiveWidth(20),
    marginTop: responsiveWidth(24),
  },
});

export default PrayerScreen;
