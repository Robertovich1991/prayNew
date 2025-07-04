import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Cross from 'assets/img/cross.png';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AuthButton from 'components/AuthButton';
import CustomInput from 'components/CustomInput';
import { responsiveWidth } from 'common/utils';
import CustomText from 'components/CustomText';
import Container from 'components/Container';
import store from 'store';
import { T_KEYS } from 'assets/translations';
import useOwnTranslation from 'hooks/useOwnTranslation';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';
import { GOOGLE_PLAY_WEBCLIENT_ID } from 'constants/AppConfig';
import { useTheme } from '@rneui/themed';
import { CustomizationColors } from 'styles/customization';

const AuthScreen = () => {
  const [name, setName] = useState('');
  const [activeGoogle, setActiveGoogle] = useState(false);

  const t = useOwnTranslation;
  const { theme } = useTheme();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          onStartShouldSetResponder={() => true}
        >
          <ScrollView
            contentContainerStyle={styles.wrapper}
            keyboardShouldPersistTaps={'handled'}
          >
            <Image source={Cross} style={styles.topImage} />
            <CustomText
              fontSize={responsiveWidth(12)}
              color={'#999999'}
              fontWeight="light"
            >
              {t(T_KEYS.YOUR_NAME)}
            </CustomText>
            <CustomInput
              onChange={text => {
                setName(text);
                if (text.length >= 2) {
                  setActiveGoogle(true);
                } else {
                  setActiveGoogle(false);
                }
              }}
            />
            <View style={styles.btnWrapper}>
              <AuthButton
                disabled={!activeGoogle}
                backgroundColor={theme.colors.buttonTertiary}
                height={responsiveWidth(60)}
                style={styles.btnStyle}
                googleSvg
                title={t(T_KEYS.CONTINUE_WITH_GOOGLE)}
                onPress={async () => {
                  // setActiveGoogle(true)
                  GoogleSignin.configure({
                    webClientId: GOOGLE_PLAY_WEBCLIENT_ID,
                    // scopes: ['https://www.googleapis.com/auth/cloud-platform'],
                    offlineAccess: true,
                  });

                  if (await GoogleSignin.isSignedIn()) {
                    console.log('Sign out google');
                    await GoogleSignin.revokeAccess();
                    await GoogleSignin.signOut();
                  }

                  try {
                    console.log('start google signin');
                    await GoogleSignin.hasPlayServices();

                    const { idToken } = await GoogleSignin.signIn();
                    console.log('idToken', idToken);

                    if (!idToken) {
                      Alert.alert(
                        'Authorization Error',
                        'Error while processing idToken in Google',
                      );
                      // store.modalsStore.hideSpinner();
                    } else {
                      store.userStore.signInWithGoogle(name, idToken);
                    }
                  } catch (error: any) {
                    console.log('Authorization Error', JSON.stringify(error));
                    Alert.alert(
                      'Authorization Error',
                      error?.message || 'Unknown error',
                    );
                  }
                }}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  topImage: {
    width: responsiveWidth(15),
    height: responsiveWidth(30),
    marginBottom: responsiveWidth(56),
    marginTop: responsiveWidth(180),
  },
  wrapper: {
    alignItems: 'center',
  },
  btnWrapper: {
    width: '100%',
    justifyContent: 'space-between',
    // height: responsiveWidth(136),
    marginBottom: responsiveWidth(48),
    marginTop: responsiveWidth(48),
  },
  btnStyle: {
    flexDirection: 'row',
  },
  btnTextStyle: {
    color: CustomizationColors.get('GREY_SECONDARY'),
  },
  btnTextStyleActive: {
    color: CustomizationColors.get('GREY_PRIMIARY'),
    fontSize: responsiveWidth(15),
    lineHeight: responsiveWidth(22),
    marginLeft: responsiveWidth(8),
    fontFamily: 'NotoSans-Regular',
  },
});

export default AuthScreen;
