/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react';
import { BackHandler, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'common/utils';
import PlayfairTitle from 'components/PlayfairTitle';
import { useCurrentUser } from 'hooks';
import CustomText from 'components/CustomText';
import AnimatedCross from 'components/AnimatedCross';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Routes from 'navigation/Routes';
import useOwnTranslation from 'hooks/useOwnTranslation';
import { T_KEYS } from 'assets/translations';
import { useTheme } from '@rneui/themed';

const backAction = () => {
  return true;
};

const WelcomeScreen = () => {
  const { userName } = useCurrentUser();
  const navigation = useNavigation<any>();
  const t = useOwnTranslation;
  const { theme } = useTheme();

  useFocusEffect(
    useCallback(() => {
      const handler = setTimeout(() => {
        navigation.navigate(Routes.HOME_SCREEN);
      }, 3000);

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => {
        backHandler.remove();
        handler && clearTimeout(handler);
      };
    }, []),
  );

  return (
    <View
      style={{
        ...styles.wrapper,
        backgroundColor: theme.colors.backgroundPrimary,
      }}
    >
      <View style={styles.nameWrapper}>
        <PlayfairTitle>{`${t(T_KEYS.WELCOME)},`}</PlayfairTitle>
        <PlayfairTitle>{userName}</PlayfairTitle>
      </View>
      <View style={styles.crossWrapper}>
        <AnimatedCross isBlessed={false} />
      </View>
      <CustomText
        style={styles.finalText}
        fontSize={responsiveHeight(18)}
        fontWeight="light"
        lineHeight={responsiveWidth(27)}
      >
        {t(T_KEYS.IN_HOUSE_OF_PRAYERS)}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flex: 1,
  },
  nameWrapper: {
    height: responsiveWidth(208),
    justifyContent: 'flex-end',
  },
  crossWrapper: {
    width: '100%',
    height: '100%',
    flex: 1,
    marginVertical: responsiveWidth(30),
  },
  finalText: {
    height: responsiveWidth(103),
  },
});

export default WelcomeScreen;
