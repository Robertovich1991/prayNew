import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import CustomButton from '../CustomButton';
import { responsiveWidth } from '../../common/utils';
import CustomLine from '../CustomLine';
import CustomText from '../CustomText';
import CardContainer from '../CardContainer';
import PlayfairTitle from '../PlayfairTitle';
import { T_KEYS } from 'assets/translations';
import useOwnTranslation from 'hooks/useOwnTranslation';
import Background from '../../assets/img/aboutModalImg.png';
import BlackGradient from '../../assets/img/aboutModalBlackGradient.png';
import WhiteGradient from '../../assets/img/aboutModalWhiteGradient.png';
import { observer } from 'mobx-react';
import { useTheme } from '@rneui/themed';

interface IAboutCardProps {
  continueAction: () => void;
}

const AboutCard = (props: IAboutCardProps) => {
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
          <View style={styles.imageText}>
            <View style={styles.titleWrapper}>
              <PlayfairTitle>{t(T_KEYS.ABOUT_CARD_PLAYFAIR)}</PlayfairTitle>
            </View>
            <View style={styles.lineWrapper}>
              <CustomLine />
            </View>
          </View>
        </View>
        <View style={styles.contentWrapper}>
          <CustomText
            fontSize={responsiveWidth(44)}
            lineHeight={responsiveWidth(44)}
            fontFamily="PlayfairDisplay-SemiBold"
          >
            “
          </CustomText>
          <CustomText
            fontFamily="NotoSans-Italic"
            fontSize={responsiveWidth(13)}
            lineHeight={responsiveWidth(23)}
            style={styles.italic}
          >
            {t(T_KEYS.ABOUT_SCREEN_ITALIC)}
          </CustomText>
          <CustomText
            fontSize={responsiveWidth(13)}
            lineHeight={responsiveWidth(23)}
            fontWeight={'light'}
            style={styles.name}
          >
            {`— ${t(T_KEYS.ABOUT_SCREEN_NAME)}`}
          </CustomText>
          <CustomText
            fontSize={responsiveWidth(15)}
            lineHeight={responsiveWidth(27)}
            fontWeight={'light'}
            style={styles.text}
          >
            {t(T_KEYS.ABOUT_SCREEN_TEXT)}
          </CustomText>
          <CustomButton
            backgroundColor={theme.colors.buttonPrimary}
            onPress={() => {
              props.continueAction();
            }}
            title={t(T_KEYS.CONTINUE_BUTTON)}
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
    borderTopLeftRadius: responsiveWidth(14),
    borderTopRightRadius: responsiveWidth(14),
    height: responsiveWidth(150),
    width: '100%',
  },
  gradient: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: responsiveWidth(14),
    borderTopRightRadius: responsiveWidth(14),
  },
  imageText: {
    width: '100%',
    position: 'absolute',
  },
  titleWrapper: {
    marginTop: responsiveWidth(40),
    marginBottom: responsiveWidth(26),
  },
  lineWrapper: {
    paddingHorizontal: responsiveWidth(24),
    marginBottom: responsiveWidth(24),
  },
  contentWrapper: {
    paddingHorizontal: responsiveWidth(24),
    paddingBottom: responsiveWidth(32),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  italic: {
    textAlign: 'center',
  },
  name: {
    marginTop: responsiveWidth(16),
    marginBottom: responsiveWidth(36),
  },
  text: {
    textAlign: 'center',
    marginBottom: responsiveWidth(56),
  },
});

export default observer(AboutCard);
