import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import AboutImage from '../assets/img/aboutImage.png';
import AboutImageBlackGradient from '../assets/img/aboutImageBlackGradient.png';
import AboutImageWhiteGradient from '../assets/img/aboutImageWhiteGradient.png';
import TopBar from '../components/TopBar';
import { responsiveWidth } from '../common/utils';
import CustomLine from '../components/CustomLine';
import CustomText from '../components/CustomText';
import { T_KEYS } from 'assets/translations';
import useOwnTranslation from 'hooks/useOwnTranslation';
import { useTheme } from '@rneui/themed';

const About = () => {
  const t = useOwnTranslation;
  const { theme } = useTheme();
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.backgroundPrimary,
      }}
    >
      <View>
        <Image style={styles.image} source={AboutImage} />
        <Image
          style={styles.gradient}
          source={
            theme.mode === 'dark'
              ? AboutImageBlackGradient
              : AboutImageWhiteGradient
          }
        />
        <View style={styles.backgroundItems}>
          <TopBar text={t(T_KEYS.ABOUT_SCREEN_TITLE)} backArrow={true} />
          <View>
            <CustomText
              fontSize={responsiveWidth(46)}
              lineHeight={responsiveWidth(61)}
              fontFamily="PlayfairDisplay-SemiBold"
              style={styles.quotes}
            >
              “
            </CustomText>
            <CustomText
              lineHeight={responsiveWidth(27)}
              color={theme.colors.textColorSecondary}
              fontFamily="NotoSans-Italic"
              style={styles.aboutItalic}
            >
              {t(T_KEYS.ABOUT_SCREEN_ITALIC)}
            </CustomText>
            <CustomText
              fontWeight="light"
              color={theme.colors.textColorSecondary}
              lineHeight={responsiveWidth(27)}
              style={styles.aboutName}
            >
              {`— ${t(T_KEYS.ABOUT_SCREEN_NAME)}`}
            </CustomText>
          </View>
        </View>
      </View>
      <View style={styles.textWrapper}>
        <CustomLine />
        <CustomText
          fontWeight="light"
          color={theme.colors.textColorSecondary}
          lineHeight={responsiveWidth(22)}
          style={styles.aboutText}
        >
          {t(T_KEYS.ABOUT_SCREEN_TEXT)}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    position: 'absolute',
    bottom: 0,
  },
  backgroundItems: {
    position: 'absolute',
    paddingTop: responsiveWidth(71),
    paddingBottom: responsiveWidth(36),
    paddingHorizontal: responsiveWidth(20),
    justifyContent: 'space-between',
    width: '100%',
    height: responsiveWidth(360),
  },
  quotes: {
    textAlign: 'center',
  },
  aboutItalic: {
    textAlign: 'center',
    paddingHorizontal: responsiveWidth(24),
  },
  aboutName: {
    textAlign: 'center',
    marginTop: responsiveWidth(16),
  },
  textWrapper: {
    paddingHorizontal: responsiveWidth(20),
  },
  aboutText: {
    marginTop: responsiveWidth(44),
  },
});

export default About;
