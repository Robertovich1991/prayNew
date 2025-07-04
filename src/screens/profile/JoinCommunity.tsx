import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import TopBar from '../../components/TopBar';
import CustomButton from '../../components/CustomButton';
import { responsiveWidth, vh, validateEmail } from 'common/utils';
import CustomLine from '../../components/CustomLine';
import CustomText from '../../components/CustomText';
import PlayfairTitle from '../../components/PlayfairTitle';
import { T_KEYS } from 'assets/translations';
import useOwnTranslation from 'hooks/useOwnTranslation';
import JoinImage from '../../assets/img/joinImage.png';
import BlackGradient from '../../assets/img/joinBlackGradient.png';
import WhiteGradient from '../../assets/img/joinWhiteGradient.png';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';
import ThanksModal from 'screens/modals/ThanksModal';
import store from 'store';
import { useNavigation } from '@react-navigation/native';
import ErrorModal from 'screens/modals/ErrorModal';
import { useTheme } from '@rneui/themed';
import { CustomizationColors } from 'styles/customization';

const JoinCommunity = () => {
  const t = useOwnTranslation;
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const title = t(T_KEYS.PRAYER_REQUEST_SUCCESS_THANKS);
  const navigation = useNavigation();
  const { theme } = useTheme();
  const emailErrorPhrase = t(T_KEYS.PLEASE_ENTER_CORRECT_EMAIL);
  const textErrorPhrase = t(T_KEYS.PLEASE_ENTER_CORRECT_TEXT);
  const errorPhrase = t(T_KEYS.OOPS_SOMETHING_WENT_WRONG);

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      style={styles.container}
    >
      <>
        <Image style={styles.image} source={JoinImage} />
        <Image
          style={styles.gradient}
          source={theme.mode === 'dark' ? BlackGradient : WhiteGradient}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
          <TopBar backArrow={true} />
          <View style={styles.title}>
            <PlayfairTitle>
              {t(T_KEYS.JOIN_COMMUNITY_SCREEN_PLAYFAIR)}
            </PlayfairTitle>
          </View>
          <CustomLine />
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollView}
          >
            <View>
              <View style={styles.textWrapper}>
                <CustomText
                  lineHeight={responsiveWidth(23)}
                  color={theme.colors.textColorSecondary}
                  fontWeight={'light'}
                  style={styles.text}
                >
                  {t(T_KEYS.JOIN_COMMUNITY_SCREEN_TEXT)}
                </CustomText>
              </View>
              <View style={styles.searchSection}>
                <TextInput
                  placeholder={t(T_KEYS.YOUR_EMAIL)}
                  placeholderTextColor={theme.colors.textColorTertiary}
                  onChangeText={newEmail => setEmail(newEmail)}
                  style={{
                    ...styles.input,
                    color: theme.colors.textColorTertiary,
                  }}
                />
              </View>
              <TextInput
                style={{
                  ...styles.textInput,
                  color: theme.colors.textColorPrimary,
                }}
                multiline={true}
                textAlignVertical="top"
                placeholder={t(T_KEYS.YOUR_TEXT_HERE)}
                placeholderTextColor={theme.colors.textColorTertiary}
                onChangeText={setText}
              />
            </View>
            <View style={styles.btnWrapper}>
              <CustomButton
                title={t(T_KEYS.PRAYER_SCREEN_SEND)}
                onPress={async () => {
                  if (!validateEmail(email)) {
                    store.modalStore.open(
                      <ErrorModal title={emailErrorPhrase} />,
                    );
                    return;
                  }
                  if (!text || text.length < 5 || text.length > 40000) {
                    store.modalStore.open(
                      <ErrorModal title={textErrorPhrase} />,
                    );
                    return;
                  }
                  const request =
                    await store.commonStore.sendJoinOurCommunityData({
                      message: text,
                      email,
                    });
                  if (request?.result) {
                    store.modalStore.open(
                      <ThanksModal
                        title={title}
                        onCloseAction={() => {
                          navigation.goBack();
                        }}
                      />,
                    );
                  } else {
                    store.modalStore.open(<ErrorModal title={errorPhrase} />);
                  }
                  return;
                }}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: vh(100),
    position: 'absolute',
  },
  gradient: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  content: {
    marginTop: responsiveWidth(71),
    width: '100%',
    flex: 1,
    paddingHorizontal: responsiveWidth(20),
  },
  title: {
    marginTop: responsiveWidth(15),
    marginBottom: responsiveWidth(12),
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  textWrapper: {
    marginTop: responsiveWidth(24),
    marginBottom: responsiveWidth(30),
  },
  text: {
    textAlign: 'center',
  },
  searchSection: {
    borderWidth: 1,
    height: responsiveWidth(59),
    justifyContent: 'center',
    borderColor: CustomizationColors.get('BLACK_SECONDARY'),
    borderRadius: responsiveWidth(12),
  },
  input: {
    paddingLeft: responsiveWidth(16),
    height: responsiveWidth(59),
    fontSize: responsiveWidth(15),
    lineHeight: responsiveWidth(27),
    fontFamily: 'NotoSans-Light',
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: CustomizationColors.get('BLACK_SECONDARY'),
    borderRadius: responsiveWidth(12),
    height: responsiveWidth(244),
    padding: responsiveWidth(16),
    fontFamily: 'NotoSans-Light',
    fontSize: responsiveWidth(15),
    lineHeight: responsiveWidth(27),
    marginTop: responsiveWidth(10),
  },
  btnWrapper: {
    marginVertical: responsiveWidth(20),
  },
});

export default JoinCommunity;
