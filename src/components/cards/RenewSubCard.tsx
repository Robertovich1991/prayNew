import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import CustomButton from '../CustomButton';
import { responsiveWidth } from '../../common/utils';
import CustomLine from '../CustomLine';
import Background from '../../assets/img/renewBackground.png';
import BlackGradient from '../../assets/img/firstWeekModalBlackGradient.png';
import WhiteGradient from '../../assets/img/firstWeekModalWhiteGradient.png';
import CustomText from '../CustomText';
import CardContainer from '../CardContainer';
import PlayfairTitle from '../PlayfairTitle';
import { T_KEYS } from 'assets/translations';
import useOwnTranslation from 'hooks/useOwnTranslation';
import store from 'store';
import { format } from 'date-fns';
import { observer } from 'mobx-react';
import { useTheme } from '@rneui/themed';
import { CustomizationColors } from 'styles/customization';

interface IRenewSubCardProps {
  buttonAction: () => void;
}

const RenewSubCard = (props: IRenewSubCardProps) => {
  const currentSub = store.userStore.user
    ?.subscription as RegisteredSubscription;

  const t = useOwnTranslation;
  const { theme } = useTheme();
  useEffect(() => {
    store.purchaseStore.getActiveSubscriptions([currentSub.googleSku]);
  }, [currentSub]);

  const periodPhrase = t(T_KEYS.CAROUSEL_MONTH);

  const googleSub = store.purchaseStore.availableSubscriptions.find(
    x => x.productId === currentSub?.googleSku,
  );
  const currencyPerPeriod = () => {
    if (!googleSub) {
      return '$' + periodPhrase;
    }

    return periodPhrase;
  };

  const price = () => {
    if (!googleSub) {
      return currentSub.price;
    }

    return (
      googleSub.subscriptionOfferDetails[0]?.pricingPhases.pricingPhaseList[0]
        ?.formattedPrice || currentSub.price
    );
  };

  return (
    <CardContainer>
      <View
        style={{
          ...styles.card,
          backgroundColor: theme.colors.blackPrimaryToWhite,
        }}
      >
        <View>
          <Image source={Background} style={styles.imageStyle} />
          <Image
            source={theme.mode === 'dark' ? BlackGradient : WhiteGradient}
            style={styles.gradient}
          />
          <View style={styles.backgroundWrapper}>
            <CustomText
              color={theme.colors.textColorSecondary}
              style={styles.close}
              onPress={() => {
                store.modalStore.close();
              }}
            >
              {t(T_KEYS.CLOSE)}
            </CustomText>
            <PlayfairTitle>
              {store.userStore.isUserBlessed
                ? t(T_KEYS.RENEW_SUB_CARD_PLAYFAIR_ACTIVE)
                : t(T_KEYS.RENEW_SUB_CARD_PLAYFAIR)}
            </PlayfairTitle>
          </View>
        </View>
        {store.userStore.isUserBlessed && (
          <View style={styles.activeSubTextWrapper}>
            <CustomText
              style={styles.activeSubText}
              fontWeight="light"
              color={theme.colors.textColorSecondary}
              lineHeight={responsiveWidth(22)}
            >
              {t(T_KEYS.RENEW_SUB_CARD_TEXT)}
            </CustomText>
          </View>
        )}
        <View style={styles.contentWrapper}>
          <CustomLine />
          <View style={styles.cardItemsWrapper}>
            <View style={styles.cardItem}>
              <CustomText
                fontSize={responsiveWidth(12)}
                lineHeight={responsiveWidth(16)}
                color={theme.colors.textColorQuaternary}
                fontWeight="light"
                style={styles.contentTitle}
              >
                {t(T_KEYS.RENEW_SUB_CARD_PLAN)}
              </CustomText>
              <CustomText
                color={theme.colors.textColorSecondary}
                style={styles.contentText}
              >
                {t(currentSub.title)}
              </CustomText>
            </View>

            <View style={styles.cardItem}>
              <CustomText
                fontWeight="light"
                fontSize={responsiveWidth(12)}
                lineHeight={responsiveWidth(16)}
                color={theme.colors.textColorQuaternary}
                style={styles.contentTitle}
              >
                {t(T_KEYS.RENEW_SUB_CARD_PRICING)}
              </CustomText>
              <CustomText
                color={theme.colors.textColorSecondary}
                style={styles.contentText}
              >
                {`${price()} ${currencyPerPeriod()}`}
              </CustomText>
            </View>

            <View style={styles.cardItem}>
              <CustomText
                fontWeight="light"
                fontSize={responsiveWidth(12)}
                lineHeight={responsiveWidth(16)}
                color={theme.colors.textColorQuaternary}
                style={styles.contentTitle}
              >
                {t(T_KEYS.RENEW_SUB_CARD_ACTIVE)}
              </CustomText>
              <CustomText
                color={
                  store.userStore.isUserBlessed
                    ? CustomizationColors.get('GREEN_SECONDARY')
                    : CustomizationColors.get('RED_PRIMARY')
                }
                style={styles.contentText}
              >
                {store.userStore.isUserBlessed
                  ? format(new Date(currentSub.expiredAt), 'd MMMM yyyy')
                  : t(T_KEYS.EXPIRED)}
              </CustomText>
            </View>
          </View>
          <CustomButton
            backgroundColor={
              store.userStore.isUserBlessed
                ? theme.colors.backgroundSecondary
                : CustomizationColors.get('ORANGE_PRIMARY')
            }
            style={store.userStore.isUserBlessed ? styles.activeSubBtn : {}}
            onPress={() => {
              props.buttonAction();
            }}
            btnTextStyle={
              store.userStore.isUserBlessed
                ? {
                    ...styles.activeSubBtnTextStyle,
                    color: theme.colors.textColorQuaternary,
                  }
                : styles.brownBtnTextStyle
            }
            title={
              store.userStore.isUserBlessed
                ? t(T_KEYS.RENEW_SUB_CARD_CHANGE_PLAN)
                : t(T_KEYS.RENEW_SUB_CARD_RENEW)
            }
          />
        </View>
      </View>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: responsiveWidth(14),
  },
  background: {
    width: '100%',
    marginBottom: responsiveWidth(24),
  },
  backgroundWrapper: {
    width: '100%',
    position: 'absolute',
  },
  close: {
    alignSelf: 'flex-end',
    paddingTop: responsiveWidth(18),
    paddingRight: responsiveWidth(20),
  },
  activeSubTextWrapper: {
    paddingTop: responsiveWidth(24),
    paddingHorizontal: responsiveWidth(24),
  },
  activeSubText: {
    textAlign: 'center',
  },
  contentWrapper: {
    paddingHorizontal: responsiveWidth(24),
    paddingBottom: responsiveWidth(32),
    paddingTop: responsiveWidth(24),
  },
  cardItemsWrapper: {
    marginTop: responsiveWidth(32),
    marginBottom: responsiveWidth(16),
  },
  cardItem: {
    marginBottom: responsiveWidth(24),
  },
  contentTitle: {
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  contentText: {
    marginTop: responsiveWidth(4),
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  imageStyle: {
    borderTopLeftRadius: responsiveWidth(14),
    borderTopRightRadius: responsiveWidth(14),
    width: '100%',
    height: responsiveWidth(150),
  },
  gradient: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: responsiveWidth(14),
    borderTopRightRadius: responsiveWidth(14),
  },
  brownBtnTextStyle: {
    fontSize: responsiveWidth(15),
    fontWeight: '600',
    color: CustomizationColors.get('BLACK_PRIMARY'),
  },
  activeSubBtn: {
    borderWidth: 1,
    borderColor: CustomizationColors.get('BLACK_SECONDARY'),
  },
  activeSubBtnTextStyle: {
    fontSize: responsiveWidth(15),
    fontFamily: 'NotoSans-Regular',
  },
});

export default observer(RenewSubCard);
