import { useTheme } from '@rneui/themed';
import { T_KEYS } from 'assets/translations';
import { responsiveWidth } from 'common/utils';
import Container from 'components/Container';
import CustomButton from 'components/CustomButton';
import CustomLine from 'components/CustomLine';
import CustomText from 'components/CustomText';
import PlayfairTitle from 'components/PlayfairTitle';
import useOwnTranslation from 'hooks/useOwnTranslation';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import store from 'store';
import { CustomizationColors } from 'styles/customization';

const PushNotificationSetting = () => {
  const t = useOwnTranslation;
  const { theme } = useTheme();
  return (
    <Container>
      <View style={styles.container}>
        <PlayfairTitle>{t(T_KEYS.SETTINGS_SCREEN_PUSH_TOGGLE)}</PlayfairTitle>
        <View style={styles.lineWrapper}>
          <CustomLine />
        </View>
        <View style={styles.textWrapper}>
          <CustomText
            style={styles.text}
            fontWeight="light"
            color={theme.colors.textColorSecondary}
          >
            {t(T_KEYS.PUSH_NOTIFICATION_SETTING_MAIN_TEXT)}
          </CustomText>
        </View>
        <View style={styles.btnWrapper}>
          <CustomButton
            height={responsiveWidth(60)}
            btnTextStyle={styles.brownBtnTextStyle}
            backgroundColor={CustomizationColors.get('ORANGE_PRIMARY')}
            title={t(T_KEYS.PUSH_NOTIFICATION_SETTING_TURN_ON)}
            onPress={() => {
              store.commonStore.setSettings({
                ...store.commonStore.settings,
                isPushNotificationsActive: true,
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
            title={t(T_KEYS.SKIP)}
            onPress={() => {
              store.commonStore.setSettings({
                ...store.commonStore.settings,
                isPushNotificationsActive: false,
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
    marginBottom: responsiveWidth(20),
  },
  textWrapper: {
    marginBottom: responsiveWidth(30),
  },
  text: {
    textAlign: 'center',
  },
  btnWrapper: {
    marginBottom: responsiveWidth(16),
  },
  brownBtnTextStyle: {
    color: CustomizationColors.get('BLACK_PRIMARY'),
    fontWeight: '600',
    fontSize: responsiveWidth(15),
  },
  btnTextStyle: {
    fontWeight: '600',
    fontSize: responsiveWidth(15),
  },
});

export default PushNotificationSetting;
