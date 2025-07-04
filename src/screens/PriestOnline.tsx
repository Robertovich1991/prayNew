/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Container from '../components/Container';
import CustomText from '../components/CustomText';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import BackArrow from '../assets/img/icons/backArrow.svg';
import {
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { responsiveWidth } from '../common/utils';
import Cross from '../assets/img/cross.png';
import CustomLine from '../components/CustomLine';
import MyMessage from 'components/messages/MyMessage';
import IncomingMessage from 'components/messages/IncomingMessage';
import { T_KEYS } from 'assets/translations';
import useOwnTranslation from 'hooks/useOwnTranslation';
import SendSvg from '../assets/img/icons/sendMessage.svg';
import store from 'store';
import { observer } from 'mobx-react';
import { ChatMessage } from 'store/responses/chats';
import ErrorModal from './modals/ErrorModal';
import { useKeyboard } from 'hooks/useKeyboard';
import { useTheme } from '@rneui/themed';
import { CustomizationColors } from 'styles/customization';

const PriestOnline = () => {
  const navigation = useNavigation();
  const t = useOwnTranslation;
  const [prayerRequestText, setPrayerRequestText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const { theme } = useTheme();
  useFocusEffect(
    useCallback(() => {
      (async () => {
        await store.chatStore.getChats({});
        await store.chatStore.getMessages({});
        store.chatStore.setUnattendedMessagesCount(0);
        store.chatStore.attendadMessage();
      })();

      return () => {
        store.chatStore.setUnattendedMessagesCount(0);
        store.chatStore.attendadMessage();
      };
    }, []),
  );

  const { keyboardShown } = useKeyboard();

  useEffect(() => {
    console.log(
      'store.chatStore.currentChat?.messages count',
      store.chatStore.currentChat?.messages.length,
    );
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [store.chatStore.currentChat?.messages.length || 0]);

  const isLastMessageMine = () => {
    const currentChatMessages = store.chatStore.currentChat?.messages;
    console.log('currentChatMessages', currentChatMessages);
    if (currentChatMessages && currentChatMessages[0]) {
      const lastMessage = currentChatMessages[0];
      return lastMessage.authorId === store.userStore.user?.id;
    }
    return false;
  };

  const errorMessage = t(T_KEYS.YOU_CAN_NOT_SEND_MESSAGE_NOW);

  return (
    <TouchableWithoutFeedback>
      <Container>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ flex: 1 }}
        >
          <View style={styles.topBarWrapper}>
            <TouchableOpacity>
              <BackArrow
                color={theme.colors.textColorPrimary}
                onPress={() => {
                  Keyboard.dismiss();
                  setTimeout(() => {
                    navigation.goBack();
                  }, 100);
                }}
                width={responsiveWidth(20)}
                height={responsiveWidth(20)}
              />
            </TouchableOpacity>
            <View style={styles.crossWrapper}>
              <Image style={styles.cross} source={Cross} />
            </View>
            <CustomText color={theme.colors.textColorSecondary}>
              {t(T_KEYS.PASTOR_ONLINE_SCREEN_PERSONAL_PRIEST)}
            </CustomText>
          </View>
          <CustomLine />

          <FlatList
            ref={flatListRef}
            inverted
            data={store.chatStore.currentChat?.messages || []}
            renderItem={({
              item,
              index,
            }: {
              item: ChatMessage;
              index: number;
            }) => {
              if (item.authorId === store.userStore.user?.id) {
                return <MyMessage key={index} {...item} />;
              } else {
                return <IncomingMessage key={index} {...item} />;
              }
            }}
            onEndReached={() =>
              console.log('End reached TODO: fetch next chunk')
            }
          />

          <View
            style={
              keyboardShown ? styles.inputWrapperKeyboard : styles.inputWrapper
            }
          >
            <TextInput
              value={prayerRequestText}
              onChangeText={text => setPrayerRequestText(text)}
              style={{
                ...styles.textInput,
                color: theme.colors.textColorTertiary,
              }}
              multiline
              placeholder={t(T_KEYS.TEXT_INPUT_PLACEHOLDER)}
              placeholderTextColor={theme.colors.textColorTertiary}
            />
            <View style={styles.sendWrapper}>
              {prayerRequestText.length > 0 && (
                <TouchableOpacity
                  onPress={async () => {
                    if (isLastMessageMine()) {
                      Keyboard.dismiss();
                      store.modalStore.open(
                        <ErrorModal
                          title={errorMessage}
                          onCloseAction={() => {}}
                        />,
                      );
                      return;
                    }
                    if (prayerRequestText?.length > 0) {
                      setPrayerRequestText('');
                      console.log('My message:', prayerRequestText);
                      store.chatStore.sendNewMessage(prayerRequestText);
                      // flatListRef.current?.scrollToOffset({ offset: 0, animated: true })
                    }
                  }}
                  style={styles.svgWrapper}
                >
                  <SendSvg
                    color={theme.colors.textColorPrimary}
                    width={20}
                    height={20}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  topBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveWidth(15),
  },
  crossWrapper: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CustomizationColors.get('BLACK_SECONDARY'),
    borderRadius: responsiveWidth(10),
    marginLeft: responsiveWidth(16),
    marginRight: responsiveWidth(8),
  },
  cross: {
    width: responsiveWidth(10),
    height: responsiveWidth(21),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveWidth(16),
    marginBottom: responsiveWidth(48),
  },
  inputWrapperKeyboard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveWidth(16),
    marginBottom: responsiveWidth(16),
  },
  textInput: {
    width: '100%',
    minHeight: responsiveWidth(52),
    maxHeight: responsiveWidth(104),
    borderWidth: 1,
    borderColor: CustomizationColors.get('BLACK_SECONDARY'),
    borderRadius: responsiveWidth(12),
    fontFamily: 'NotoSans-Light',
    paddingLeft: responsiveWidth(16),
    paddingRight: responsiveWidth(40),
  },
  sendWrapper: {
    right: responsiveWidth(36),
    width: responsiveWidth(36),
    alignSelf: 'center',
  },
  svgWrapper: {
    width: responsiveWidth(36),
    justifyContent: 'center',
    height: responsiveWidth(52),
  },
});

export default observer(PriestOnline);
