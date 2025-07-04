import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from '../CustomButton';
import { responsiveWidth } from '../../common/utils';
import CustomLine from '../CustomLine';
import CustomText from '../CustomText';
import CardContainer from '../CardContainer';
import PlayfairTitle from '../PlayfairTitle';
import { T_KEYS } from 'assets/translations';
import useOwnTranslation from 'hooks/useOwnTranslation';
import { useTheme } from '@rneui/themed';
import { CustomizationColors } from 'styles/customization';
import store from 'store';

interface INotBlessedCardProps {
  buttonAction: () => void;
}

const NotBlessedCard = (props: INotBlessedCardProps) => {
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
        <CustomText
          color={theme.colors.textColorSecondary}
          style={styles.close}
          onPress={() => {
            store.modalStore.close();
          }}
        >
          {t(T_KEYS.CLOSE)}
        </CustomText>
        <View style={styles.titleWrapper}>
          <PlayfairTitle>{t(T_KEYS.NOT_BLESSED_CARD_PLAYFAIR)}</PlayfairTitle>
        </View>
        <CustomLine />
        <CustomText
          lineHeight={responsiveWidth(27)}
          color={theme.colors.textColorSecondary}
          fontWeight="light"
          style={styles.text}
        >
          {t(T_KEYS.NOT_BLESSED_CARD_TEXT)}
        </CustomText>
        <CustomButton
          backgroundColor={CustomizationColors.get('ORANGE_PRIMARY')}
          btnTextStyle={styles.brownBtnTextStyle}
          onPress={() => {
            props.buttonAction();
          }}
          title={t(T_KEYS.NOT_BLESSED_CARD_CHOSE)}
        />
      </View>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: responsiveWidth(14),
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(24),
    paddingTop: responsiveWidth(18),
    paddingBottom: responsiveWidth(32),
  },
  close: {
    marginBottom: responsiveWidth(18),
    alignSelf: 'flex-end',
  },
  titleWrapper: {
    marginBottom: responsiveWidth(24),
  },
  text: {
    textAlign: 'center',
    marginTop: responsiveWidth(24),
    marginBottom: responsiveWidth(40),
  },
  brownBtnTextStyle: {
    fontSize: responsiveWidth(15),
    fontWeight: '600',
    color: CustomizationColors.get('BLACK_PRIMARY'),
  },
});

export default NotBlessedCard;
