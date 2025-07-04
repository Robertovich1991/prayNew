import { useTheme } from '@rneui/themed';
import { T_KEYS } from 'assets/translations';
import { responsiveWidth } from 'common/utils';
import Container from 'components/Container';
import CustomButton from 'components/CustomButton';
import CustomLine from 'components/CustomLine';
import PlayfairTitle from 'components/PlayfairTitle';
import useOwnTranslation from 'hooks/useOwnTranslation';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import store from 'store';

const SelectLanguage = () => {
  const t = useOwnTranslation;
  const { theme } = useTheme();
  return (
    <Container>
      <View style={styles.container}>
        <PlayfairTitle>{t(T_KEYS.SELECT_LANGUAGE_PLAYFAIR)}</PlayfairTitle>
        <View style={styles.lineWrapper}>
          <CustomLine />
        </View>
        <View style={styles.btnWrapper}>
          <CustomButton
            btnTextStyle={{
              ...styles.btnTextStyle,
              color: theme.colors.textColorTertiary,
            }}
            height={responsiveWidth(60)}
            backgroundColor={theme.colors.buttonTertiary}
            title={t(T_KEYS.ENGLISH)}
            onPress={() => {
              store.commonStore.setSettings({
                ...store.commonStore.settings,
                language: 'en',
              });
            }}
          />
        </View>
        <View>
          <CustomButton
            btnTextStyle={{
              ...styles.btnTextStyle,
              color: theme.colors.textColorTertiary,
            }}
            height={responsiveWidth(60)}
            backgroundColor={theme.colors.buttonTertiary}
            title={t(T_KEYS.FRENCH)}
            onPress={() => {
              store.commonStore.setSettings({
                ...store.commonStore.settings,
                language: 'fr',
              });
            }}
          />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: responsiveWidth(59),
  },
  lineWrapper: {
    marginTop: responsiveWidth(24),
    marginBottom: responsiveWidth(30),
  },
  btnWrapper: {
    marginBottom: responsiveWidth(16),
  },
  btnTextStyle: {
    fontWeight: '600',
    fontSize: responsiveWidth(15),
  },
});

export default SelectLanguage;
