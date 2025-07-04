import { responsiveWidth } from 'common/utils';
import { format } from 'date-fns';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ChatMessage } from 'store/responses/chats';
import CustomText from '../CustomText';
import { useTheme } from '@rneui/themed';
import { CustomizationColors } from 'styles/customization';

const MyMessage = (props: ChatMessage | PrayerRequestMessage) => {
  const date = (props as any).createdAt || props.timestamp;
  const { theme } = useTheme();
  return (
    <View
      style={{
        ...styles.message,
        backgroundColor:
          theme.mode === 'dark'
            ? CustomizationColors.get('BLACK_SECONDARY')
            : CustomizationColors.get('ORANGE_PRIMARY'),
      }}
    >
      <CustomText
        color={CustomizationColors.get('GREY_PRIMIARY')}
        lineHeight={responsiveWidth(22)}
        style={styles.messageText}
      >
        {props.text}
      </CustomText>
      <CustomText
        fontWeight="light"
        color={CustomizationColors.get('GREY_PRIMIARY')}
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
    borderBottomRightRadius: 0,
    borderRadius: responsiveWidth(14),
    padding: responsiveWidth(20),
    paddingBottom: responsiveWidth(16),
    width: responsiveWidth(280),
    alignSelf: 'flex-end',
    marginBottom: responsiveWidth(16),
  },
  messageText: {
    textAlign: 'left',
    marginBottom: responsiveWidth(16),
  },
  messageDate: {
    textAlign: 'left',
    textTransform: 'uppercase',
  },
});

export default MyMessage;
