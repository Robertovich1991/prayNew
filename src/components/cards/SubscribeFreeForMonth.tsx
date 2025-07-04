import React from 'react';
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
import { observer } from 'mobx-react-lite';
import { useTheme } from '@rneui/themed';
import { CustomizationColors } from 'styles/customization';

interface ISubscribeFreeForMonthProps {
  closeCard: () => void;
  onGetFreeMonthSubscriptionClick: () => void;
}

const SubscribeFreeForMonth = (props: ISubscribeFreeForMonthProps) => {
  const t = useOwnTranslation;
  const { theme } = useTheme();
  const featuresArr = [
    t(T_KEYS.FREE_MONTH_CARD_FIRST_FEATURE),
    t(T_KEYS.FREE_MONTH_CARD_SECOND_FEATURE),
    t(T_KEYS.FREE_MONTH_CARD_THIRD_FEATURE),
  ];

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
                props.closeCard();
              }}
            >
              {t(T_KEYS.CLOSE)}
            </CustomText>
            <View style={styles.titleWrapper}>
              <PlayfairTitle>
                {t(T_KEYS.GET_THE_FIRST_MONTH_FREE)}
              </PlayfairTitle>
            </View>
            <CustomText style={styles.subtitle} fontSize={responsiveWidth(18)}>
              {t(T_KEYS.SUBSCRIBE)}
            </CustomText>
          </View>
        </View>
        <View style={styles.contentWrapper}>
          <CustomLine />
          <View style={styles.featuresWrapper}>
            {featuresArr.map((item, index) => {
              return (
                <CustomText
                  key={index}
                  style={styles.features}
                  fontWeight="light"
                  color={theme.colors.textColorSecondary}
                  lineHeight={responsiveWidth(27)}
                >
                  {`- ${item}`}
                </CustomText>
              );
            })}
          </View>
          <CustomButton
            backgroundColor={CustomizationColors.get('ORANGE_PRIMARY')}
            onPress={props.onGetFreeMonthSubscriptionClick}
            btnTextStyle={styles.brownBtnTextStyle}
            title={t(T_KEYS.TARIF_SCREEN_CHOOSE)}
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
  imageStyle: {
    width: '100%',
    borderTopLeftRadius: responsiveWidth(14),
    borderTopRightRadius: responsiveWidth(14),
    height: responsiveWidth(170),
  },
  gradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: responsiveWidth(14),
    borderTopRightRadius: responsiveWidth(14),
  },
  background: {
    width: '100%',
    marginBottom: responsiveWidth(7),
  },
  backgroundWrapper: {
    width: '100%',
    position: 'absolute',
  },
  close: {
    alignSelf: 'flex-end',
    paddingTop: responsiveWidth(18),
    paddingBottom: responsiveWidth(10),
    paddingRight: responsiveWidth(20),
  },
  titleWrapper: {
    width: responsiveWidth(200),
    alignSelf: 'center',
    marginBottom: responsiveWidth(26),
  },
  subtitle: {
    textAlign: 'center',
  },
  contentWrapper: {
    paddingHorizontal: responsiveWidth(24),
    paddingBottom: responsiveWidth(32),
  },
  featuresWrapper: {
    marginTop: responsiveWidth(36),
    marginBottom: responsiveWidth(48),
    paddingHorizontal: responsiveWidth(20),
  },
  features: {
    marginBottom: responsiveWidth(8),
  },
  brownBtnTextStyle: {
    fontSize: responsiveWidth(15),
    fontWeight: '600',
    color: CustomizationColors.get('BLACK_PRIMARY'),
  },
});

export default observer(SubscribeFreeForMonth);
