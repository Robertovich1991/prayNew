import { T_KEYS } from 'assets/translations';
import { responsiveWidth } from 'common/utils';
import CardContainer from 'components/CardContainer';
import CustomButton from 'components/CustomButton';
import CustomLine from 'components/CustomLine';
import CustomText from 'components/CustomText';
import PlayfairTitle from 'components/PlayfairTitle';
import useOwnTranslation from 'hooks/useOwnTranslation';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Background from '../../assets/img/renewBackground.png';
import BlackGradient from '../../assets/img/firstWeekModalBlackGradient.png';
import WhiteGradient from '../../assets/img/firstWeekModalWhiteGradient.png';
import { useTheme } from '@rneui/themed';
import { CustomizationColors } from 'styles/customization';

interface IGetFirstWeekForFree {
  closeAction: () => void;
  onBecomeBlessedClick: () => void;
}

const GetFirstWeekForFree = (props: IGetFirstWeekForFree) => {
  const t = useOwnTranslation;
  const { theme } = useTheme();
  return (
    <CardContainer>
      <View
        style={{
          ...styles.card,
          backgroundColor: theme.colors.blackPrimaryToWhite,
        }}
      >
        <View>
          <Image style={styles.imageStyle} source={Background} />
          <Image
            style={styles.gradient}
            source={theme.mode === 'dark' ? BlackGradient : WhiteGradient}
          />
          <View style={styles.backgroundWrapper}>
            <PlayfairTitle>{t(T_KEYS.NOT_BLESSED_CARD_PLAYFAIR)}</PlayfairTitle>
            <View style={styles.line}>
              <CustomLine />
            </View>
          </View>
        </View>
        <View style={styles.wrapper}>
          <CustomText color={theme.colors.textColorSecondary}>
            {t(T_KEYS.GET_THE_FIRST_WEEK)}
          </CustomText>
          <View style={styles.free}>
            <CustomText
              color={'#D9BA77'}
              fontSize={responsiveWidth(32)}
              lineHeight={responsiveWidth(48)}
            >
              {t(T_KEYS.FREE)}
            </CustomText>
          </View>
          <CustomButton
            backgroundColor={CustomizationColors.get('ORANGE_PRIMARY')}
            btnTextStyle={styles.brownBtnTextStyle}
            title={t(T_KEYS.BECOME_BLESSED)}
            onPress={props.onBecomeBlessedClick}
          />
          <View style={styles.btn}>
            <CustomButton title={t(T_KEYS.CLOSE)} onPress={props.closeAction} />
          </View>
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
  },
  backgroundWrapper: {
    width: '100%',
    padding: responsiveWidth(24),
    position: 'absolute',
  },
  line: {
    marginTop: responsiveWidth(24),
  },
  free: {
    marginTop: responsiveWidth(15),
    marginBottom: responsiveWidth(30),
  },
  wrapper: {
    paddingHorizontal: responsiveWidth(24),
    alignItems: 'center',
    paddingBottom: responsiveWidth(24),
  },
  imageStyle: {
    width: '100%',
    height: responsiveWidth(150),
    borderTopLeftRadius: responsiveWidth(14),
    borderTopRightRadius: responsiveWidth(14),
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
    color: CustomizationColors.get('BLACK_SECONDARY'),
  },
  btn: {
    width: '100%',
    marginTop: responsiveWidth(10),
  },
});

export default GetFirstWeekForFree;
