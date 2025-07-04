import { responsiveWidth } from 'common/utils';
import { format } from 'date-fns';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ChatMessage } from 'store/responses/chats';
import CustomText from '../CustomText';
import { useTheme } from '@rneui/themed';

const IncomingMessage = (props: ChatMessage | PrayerRequestMessage) => {
  const date = (props as any).createdAt || props.timestamp;
  const { theme } = useTheme();
  return (
    <View
      style={{
        ...styles.message,
        backgroundColor: theme.colors.backgroundSecondary,
      }}
    >
      <CustomText
        color={theme.colors.textColorSecondary}
        lineHeight={responsiveWidth(22)}
        style={styles.messageText}
      >
        {props.text}
      </CustomText>
      <CustomText
        fontWeight="light"
        color={theme.colors.textColorPrimary}
        fontSize={responsiveWidth(12)}
        lineHeight={responsiveWidth(16)}
        style={styles.messageDate}
      >
        {format(new Date(date), 'd MMMM yyyy hh:mm')}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    borderBottomLeftRadius: 0,
    borderRadius: responsiveWidth(14),
    padding: responsiveWidth(20),
    paddingBottom: responsiveWidth(16),
    width: responsiveWidth(280),
    marginBottom: responsiveWidth(16),
  },
  messageText: {
    textAlign: 'left',
    marginBottom: responsiveWidth(16),
  },
  messageDate: {
    textAlign: 'right',
    textTransform: 'uppercase',
  },
});

export default IncomingMessage;
