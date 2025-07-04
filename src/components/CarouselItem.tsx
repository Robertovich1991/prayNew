import React from 'react';
import { View, SafeAreaView, StyleSheet, Image, Alert } from 'react-native';
import { responsiveWidth, useCndUrl } from '../common/utils';
import CustomLine from './CustomLine';
import CustomButton from './CustomButton';
import CustomText from './CustomText';
import { T_KEYS } from 'assets/translations';
import useOwnTranslation from 'hooks/useOwnTranslation';
import BlackGradient from '../assets/img/tarifBlackGradient.png';
import WhiteGradient from '../assets/img/tarifWhiteGradient.png';
import { ScrollView, TouchableOpacity } from 'react-native';
import store from 'store';
import ThanksModal from 'screens/modals/ThanksModal';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import SimpleModal from 'screens/modals/SimpleModal';
import {
  LogEvent,
  af_unsubscribe,
  af_paid_subscription_started,
} from 'helpers/logEvents';
import ErrorModal from 'screens/modals/ErrorModal';
import { useTheme } from '@rneui/themed';
import { CustomizationColors } from 'styles/customization';

const formatBillingPeriod = (billingPeriod: string) => {
  // Отрываем первую P
  const rawPeriod = billingPeriod.substring(1);

  let period = rawPeriod.replace(/\D/gi, '');

  const rest = rawPeriod.replace(period, '');

  console.log({ billingPeriod, rawPeriod, period, rest });

  // Меняем остаточную D -> days, W -> weeks, M -> months
  switch (rest) {
    case 'D': {
      period += ` day${Number(period) > 1 ? 's' : ''}`;
      break;
    }
    case 'W': {
      period += ` week${Number(period) > 1 ? 's' : ''}`;
      break;
    }
    case 'M': {
      period += ` month${Number(period) > 1 ? 's' : ''}`;
      break;
    }
  }

  return '/' + period;
};

const CarouselItem = (props: { item: Subscription; index: number }) => {
  const t = useOwnTranslation;
  const navigation = useNavigation();
  const activeTillPhrase = t(T_KEYS.RENEW_SUB_CARD_ACTIVE);
  const { theme } = useTheme();
  const { item } = props;

  const itemImg = useCndUrl(item.titleImageUrl);

  const isCurrentSubActive =
    store.userStore.user?.subscription?.isActive &&
    new Date(store.userStore.user?.subscription?.expiredAt || 0) > new Date();
  const isSelectedSub =
    isCurrentSubActive && item.id === store.userStore.user?.subscription?.id;

  const thanksPhrase = t(T_KEYS.THANKS_FOR_SUBSCRIBE);
  const modalPhrases = {
    ARE_YOU_SHURE: t(T_KEYS.ARE_YOU_SHURE_TO_REVOKE_YOUR_SUBSCRIPTION),
    PLEASE_CONFIRM: t(T_KEYS.PLEASE_CONFIRM),
    YES: t(T_KEYS.YES),
    NO: t(T_KEYS.NO),
  };
  const periodPhrase = t(T_KEYS.CAROUSEL_MONTH);
  const subWithTrialCancelledPhrase = t(
    T_KEYS.SUBSCRIPTION_WITH_TRIAL_CANCELLED,
  );

  const googleSub = store.purchaseStore.availableSubscriptions.find(
    x => x.productId === item.googleSku,
  );
  console.log('googleSub', JSON.stringify(googleSub));

  const currencyPerPeriod = () => {
    if (!googleSub) {
      return periodPhrase;
    }
    return formatBillingPeriod(
      googleSub.subscriptionOfferDetails[0].pricingPhases.pricingPhaseList[0]
        .billingPeriod,
    );
  };

  const price = () => {
    if (!googleSub) {
      return '--';
    }
    return googleSub.subscriptionOfferDetails[0].pricingPhases
      .pricingPhaseList[0].formattedPrice;
  };

  const makeSubscription = async () => {
    LogEvent('af_paid_subscription_started', { af_paid_subscription_started });
    try {
      store.modalStore.showSpinner('makeSubscription');
      const sub = await store.subscriptionsStore.subscribe(item.id);
      if (!sub) {
        throw 'Not possible to subscribe, please try again later';
      }

      if (sub.error) {
        throw sub.error;
      }

      if (!googleSub) {
        throw 'Not available subscription, please try again later';
      }

      const purchasedSub = await store.purchaseStore.purchaseProduct(
        googleSub,
        'sub',
      );

      console.log('purchasedSub', purchasedSub);

      if (purchasedSub) {
        store.subscriptionsStore.updateSubscription(
          purchasedSub.result as RegisteredSubscription,
        );
        store.modalStore.open(
          <ThanksModal
            title={thanksPhrase}
            onCloseAction={() => {
              navigation.goBack();
            }}
            source={'subscription-gratitude'}
          />,
        );
      } else {
        store.modalStore.open(<SimpleModal title={'Something went wrong'} />);
      }
    } catch (e: any) {
      store.modalStore.open(
        <SimpleModal
          title={JSON.stringify(e) || 'Something process went wrong'}
        />,
      );
    } finally {
      store.modalStore.clearSpinner('makeSubscription');
    }
  };

  const handleUnsubscribe = () => {
    Alert.alert(modalPhrases.PLEASE_CONFIRM, modalPhrases.ARE_YOU_SHURE, [
      {
        text: modalPhrases.NO,
        style: 'cancel',
      },
      {
        text: modalPhrases.YES,
        onPress: async () => {
          try {
            store.modalStore.showSpinner('handleUnsubscribe');
            const res = await store.subscriptionsStore.unsubscribe();
            if (res?.result) {
              LogEvent('af_unsubscribe', { af_unsubscribe });
              navigation.goBack();
            }
            if (res?.result?.trialExpiredAt) {
              store.modalStore.open(
                <ThanksModal
                  title={`${subWithTrialCancelledPhrase} ${format(
                    new Date(res.result.trialExpiredAt),
                    'd MMMM yyyy HH:mm',
                  )}`}
                />,
              );
            }
            if (res?.error) {
              store.modalStore.open(<ErrorModal title={res.error} />);
            }
          } catch {
          } finally {
            store.modalStore.clearSpinner('handleUnsubscribe');
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView
      style={{
        ...styles.card,
        backgroundColor: theme.colors.backgroundSecondary,
      }}
    >
      <View style={styles.backgroundWrapper}>
        <Image style={styles.imageBackground} source={{ uri: itemImg }} />
        <Image
          style={styles.gradient}
          source={theme.mode === 'dark' ? BlackGradient : WhiteGradient}
        />
        <View style={styles.titleCostWapper}>
          <CustomText fontSize={responsiveWidth(18)} style={styles.title}>
            {t(item.title)}
          </CustomText>
          <View style={styles.costWrapper}>
            <CustomText
              fontSize={responsiveWidth(26)}
              lineHeight={responsiveWidth(28)}
            >
              {price()}
            </CustomText>
            <CustomText
              fontWeight="light"
              fontSize={responsiveWidth(12)}
              color={theme.colors.textColorSecondary}
              style={styles.cents}
            >
              {currencyPerPeriod()}
            </CustomText>
          </View>
        </View>
      </View>
      <View style={styles.wrapper}>
        <CustomLine />
        <ScrollView style={styles.scrollViewText}>
          <CustomText
            fontWeight="light"
            color={theme.colors.textColorSecondary}
            lineHeight={responsiveWidth(22)}
            style={styles.customText}
          >
            {t(item.text)}
          </CustomText>
        </ScrollView>
        {!isSelectedSub && (
          <CustomButton
            onPress={makeSubscription}
            disabled={!!isCurrentSubActive}
            backgroundColor={
              isCurrentSubActive
                ? theme.colors.buttonPrimary
                : CustomizationColors.get('ORANGE_PRIMARY')
            }
            btnTextStyle={styles.brownBtnTextStyle}
            title={t(T_KEYS.TARIF_SCREEN_CHOOSE)}
          />
        )}
        {isSelectedSub && isCurrentSubActive && (
          <View style={styles.activeSubItems}>
            <View>
              <CustomText
                style={styles.activeTill}
                fontWeight="light"
                color={theme.colors.textColorQuaternary}
              >
                {activeTillPhrase}
              </CustomText>
              <CustomText color={CustomizationColors.get('GREEN_SECONDARY')}>
                {format(
                  new Date(store.userStore.user!.subscription!.expiredAt),
                  'd MMMM yyyy',
                )}
              </CustomText>
            </View>
            <TouchableOpacity onPress={handleUnsubscribe}>
              <CustomText color={theme.colors.textColorQuaternary}>
                {t(T_KEYS.CAROUSEL_UNSUBSCRIBE)}
              </CustomText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '100%',
    borderRadius: responsiveWidth(14),
  },
  backgroundWrapper: {
    width: '100%',
    height: responsiveWidth(150),
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    borderTopRightRadius: responsiveWidth(14),
    borderTopLeftRadius: responsiveWidth(14),
  },
  gradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderTopRightRadius: responsiveWidth(14),
    borderTopLeftRadius: responsiveWidth(14),
  },
  titleCostWapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(24),
    position: 'absolute',
    width: '100%',
    bottom: responsiveWidth(-11),
  },
  title: {
    textTransform: 'uppercase',
  },
  costWrapper: {
    flexDirection: 'row',
  },
  cents: {
    marginLeft: responsiveWidth(4),
    alignSelf: 'flex-end',
  },
  wrapper: {
    flex: 1,
    paddingTop: responsiveWidth(25),
    paddingHorizontal: responsiveWidth(24),
    paddingBottom: responsiveWidth(32),
  },
  scrollViewText: {
    flex: 1,
    marginBottom: responsiveWidth(10),
  },
  customText: {
    marginTop: responsiveWidth(10),
  },
  brownBtnTextStyle: {
    fontSize: responsiveWidth(15),
    fontWeight: '600',
    color: CustomizationColors.get('BLACK_TERTIARY'),
  },
  activeSubItems: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  activeTill: {
    textTransform: 'uppercase',
    marginBottom: responsiveWidth(6),
  },
});

export default CarouselItem;
