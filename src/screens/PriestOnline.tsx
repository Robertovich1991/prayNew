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
  ActivityIndicator,
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
import TypingIndicator from 'components/messages/TypingIndicator';
import WaitingIndicator from 'components/messages/WaitingIndicator';
import AnimatedDots from 'components/AnimatedDots';
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
import { Text } from 'react-native';

const PriestOnline = () => {
  const navigation = useNavigation();
  const t = useOwnTranslation;
  const [prayerRequestText, setPrayerRequestText] = useState('');
  const [forceUpdate, setForceUpdate] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { theme } = useTheme();
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const waitingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  useFocusEffect(
    useCallback(() => {
      (async () => {
        // Ensure WebSocket is connected
        if (!store.webSocketStore.isServerConnected) {
          store.webSocketStore.wsInit();
        }
        
        await store.chatStore.getChats({});
        await store.chatStore.getMessages({});
        store.chatStore.setUnattendedMessagesCount(0);
        store.chatStore.attendadMessage();

        // Start polling as fallback
        pollingIntervalRef.current = setInterval(async () => {
          await store.chatStore.getMessages({});
        }, 5000); // Poll every 5 seconds
      })();

      return () => {
        store.chatStore.setUnattendedMessagesCount(0);
        store.chatStore.attendadMessage();
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = null;
        }
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
          typingTimeoutRef.current = null;
        }
        if (waitingTimeoutRef.current) {
          clearTimeout(waitingTimeoutRef.current);
          waitingTimeoutRef.current = null;
        }
      };
    }, []),
  );

  const { keyboardShown } = useKeyboard();

  useEffect(() => {
    console.log(
      'store.chatStore.currentChat?.messages count',
      store.chatStore.currentChat?.messages.length,
    );
    console.log('WebSocket connected:', store.webSocketStore.isServerConnected);
    console.log('WebSocket error:', store.webSocketStore.isServerError);
    console.log('Current messages:', store.chatStore.currentChat?.messages?.map(m => ({ id: m.id, text: m.text, authorId: m.authorId, createdAt: m.createdAt })));
    
    // Hide typing indicator when new messages are added (in case WebSocket is slow)
    if (store.chatStore.currentChat?.messages && store.chatStore.currentChat.messages.length > 0) {
      const lastMessage = store.chatStore.currentChat.messages[store.chatStore.currentChat.messages.length - 1];
      if (lastMessage.authorId !== store.userStore.user?.id) {
        // Last message is from pastor, hide typing indicator
        store.chatStore.setPastorTyping(false);
        console.log('New pastor message detected, hiding typing indicator');
      }
    }
    
    setForceUpdate(prev => prev + 1);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [store.chatStore.currentChat?.messages.length || 0]);

  useEffect(() => {
    console.log('Pastor typing state changed:', store.chatStore.isPastorTyping);
    console.log('Current typing state:', store.chatStore.isPastorTyping);
    console.log('Force update triggered for typing state');
    setForceUpdate(prev => prev + 1);
  }, [store.chatStore.isPastorTyping]);

  useEffect(() => {
    console.log('Waiting for response state changed:', store.chatStore.isWaitingForResponse);
    console.log('Current waiting state:', store.chatStore.isWaitingForResponse);
    console.log('Force update triggered for waiting state');
    setForceUpdate(prev => prev + 1);
  }, [store.chatStore.isWaitingForResponse]);

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
            <TouchableOpacity
              onPress={() => {
                store.chatStore.setPastorTyping(!store.chatStore.isPastorTyping);
                console.log('Manual toggle typing state:', !store.chatStore.isPastorTyping);
                setForceUpdate(prev => prev + 1);
              }}
              style={{
                marginLeft: responsiveWidth(10),
                padding: responsiveWidth(5),
                backgroundColor: theme.colors.backgroundSecondary,
                borderRadius: responsiveWidth(5),
              }}
            >
              <CustomText color={theme.colors.textColorSecondary} fontSize={responsiveWidth(10)}>
                {store.chatStore.isPastorTyping ? 'Hide' : 'Show'} Typing
              </CustomText>
            </TouchableOpacity>



          </View>
          <CustomLine />

          <FlatList
            ref={flatListRef}
            inverted
            key={`${store.chatStore.currentChat?.messages?.length || 0}-${forceUpdate}`}
            data={store.chatStore.currentChat?.messages || []}
            renderItem={({
              item,
              index,
            }: {
              item: ChatMessage;
              index: number;
            }) => {
              if (item.authorId === store.userStore.user?.id) {
                return <MyMessage key={`${item.id}-${index}`} {...item} />;
              } else {
                return <IncomingMessage key={`${item.id}-${index}`} {...item} />;
              }
            }}
            onEndReached={() =>
              console.log('End reached TODO: fetch next chunk')
            }
          />
          
          {/* Animated Typing Indicator */}
          {isLastMessageMine() && (
            <View style={styles.typingContainer}>
              <View style={styles.typingBubble}>
                <CustomText style={styles.typingText}>
                  Pastor is typing 
                </CustomText>{ ''}
                <AnimatedDots />
              </View>
            </View>
                    )}
            <View
            style={
              keyboardShown ? styles.inputWrapperKeyboard : styles.inputWrapper
            }
          >
            <View style={styles.inputContainer}>
              <TextInput
                value={prayerRequestText}
                onChangeText={text => {
                  setPrayerRequestText(text);
                  // Send typing indicator when user starts typing
                  if (text.length > 0) {
                    store.chatStore.sendTypingIndicator(true);
                    
                    // Clear existing timeout
                    if (typingTimeoutRef.current) {
                      clearTimeout(typingTimeoutRef.current);
                    }
                    
                    // Set new timeout to stop typing indicator after 3 seconds of inactivity
                    typingTimeoutRef.current = setTimeout(() => {
                      store.chatStore.sendTypingIndicator(false);
                    }, 3000);
                  }
                }}
                onEndEditing={() => {
                  // Stop typing indicator when user stops typing
                  if (typingTimeoutRef.current) {
                    clearTimeout(typingTimeoutRef.current);
                  }
                  store.chatStore.sendTypingIndicator(false);
                }}
                style={{
                  ...styles.textInput,
                  color: theme.colors.textColorTertiary,
                  paddingRight: responsiveWidth(16),
                }}
                multiline
                placeholder={t(T_KEYS.TEXT_INPUT_PLACEHOLDER)}
                placeholderTextColor={theme.colors.textColorTertiary}
                editable={!store.chatStore.isWaitingForResponse}
              />
            </View>
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
                      const messageText = prayerRequestText;
                      console.log('Sending message:', messageText);
                      
                      // Clear input first
                      setPrayerRequestText('');
                      
                      // Send message immediately
                      store.chatStore.sendNewMessage(messageText);
                      console.log('Message sent');
                      
                      // Show typing indicator after a short delay
                      setTimeout(() => {
                        console.log('Setting pastor typing to true');
                        store.chatStore.setPastorTyping(true);
                        console.log('Pastor typing state set to:', store.chatStore.isPastorTyping);
                        
                        // Set timeout to hide typing indicator after 30 seconds
                        if (waitingTimeoutRef.current) {
                          clearTimeout(waitingTimeoutRef.current);
                        }
                        waitingTimeoutRef.current = setTimeout(() => {
                          console.log('Timeout reached, hiding typing indicator');
                          store.chatStore.setPastorTyping(false);
                        }, 30000); // 30 seconds
                      }, 500); // Show typing indicator after 500ms
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
    alignItems: 'flex-end',
    marginTop: responsiveWidth(16),
    marginBottom: responsiveWidth(48),
    paddingHorizontal: responsiveWidth(20),
    width: '100%',
  },
  inputWrapperKeyboard: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: responsiveWidth(16),
    marginBottom: responsiveWidth(16),
    paddingHorizontal: responsiveWidth(20),
    width: '100%',
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
    width: responsiveWidth(44),
    height: responsiveWidth(52),
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  svgWrapper: {
    width: responsiveWidth(36),
    justifyContent: 'center',
    height: responsiveWidth(52),
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
  },
  typingContainer: {
    alignItems: 'flex-start',
    marginLeft: responsiveWidth(16),
    marginRight: responsiveWidth(60),
    marginBottom: responsiveWidth(8),
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CustomizationColors.get('GREY_PRIMIARY'),
    borderRadius: responsiveWidth(16),
    paddingHorizontal: responsiveWidth(12),
    paddingVertical: responsiveWidth(8),
  },
  typingText: {
    fontSize: responsiveWidth(14),
    color: '#666',
    fontStyle: 'italic',
  },
});

export default observer(PriestOnline);
