import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { T_KEYS } from 'assets/translations';
import { responsiveWidth } from 'common/utils';
import { format } from 'date-fns';
import useOwnTranslation from 'hooks/useOwnTranslation';
import Routes from 'navigation/Routes';
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import store from 'store';
import CustomLine from '../CustomLine';
import CustomText from '../CustomText';
import { useTheme } from '@rneui/themed';
import { CustomizationColors } from 'styles/customization';

type RootStackParamList = {
  [Routes.CHAT_WITH_PRIEST]: {
    request: PrayerRequest;
  };
};

type Props = StackNavigationProp<RootStackParamList>;

const WidgetMessage = ({
  request,
  prayer,
}: {
  request: PrayerRequest;
  prayer?: Prayer;
}) => {
  // console.log('WidgetMessage', JSON.stringify(request));

  const navigation = useNavigation<Props>();
  const prayerName = store.commonStore.extract(prayer?.text);
  const t = useOwnTranslation;
  const { theme } = useTheme();
  const { id: userId } = store.userStore.user || {};
  const lastMessageIdx =
    request.messages.length - 1 >= 0 ? request.messages.length - 1 : 0;
  const isReplied = request.messages[lastMessageIdx]?.authorId !== userId;
  const isNotViewedAt =
    request.messages.filter(x => x.authorId !== userId && !x.viewedAt).length >
    0;

  return (
    <View style={styles.itemWrapper}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(Routes.CHAT_WITH_PRIEST, { request });
        }}
        style={{
          ...styles.item,
          backgroundColor: theme.colors.backgroundSecondary,
        }}
      >
        <View style={styles.itemData}>
          <CustomText
            fontSize={responsiveWidth(18)}
            lineHeight={responsiveWidth(27)}
            color={theme.colors.textColorSecondary}
            style={styles.itemDate}
          >
            {format(new Date(request.createdAt), 'd MMMM yyyy')}
          </CustomText>
          <View style={styles.reply}>
            <CustomText
              fontWeight="light"
              fontSize={responsiveWidth(12)}
              lineHeight={responsiveWidth(18)}
              color={
                !isReplied
                  ? '#EDBD55'
                  : isReplied && isNotViewedAt
                  ? CustomizationColors.get('GREEN_SECONDARY')
                  : isReplied && !isNotViewedAt
                  ? theme.colors.textColorSecondary
                  : ''
              }
            >
              {isReplied
                ? t(T_KEYS.REQUEST_SCREEN_REPLIED)
                : t(T_KEYS.REQUEST_SCREEN_WAIT_REPLY)}
            </CustomText>
            {isNotViewedAt && <View style={styles.newReply} />}
          </View>
        </View>
        <CustomLine />
        <CustomText
          style={styles.prayer}
          fontSize={responsiveWidth(12)}
          lineHeight={responsiveWidth(16)}
          color={theme.colors.textColorQuaternary}
          fontWeight="light"
        >
          {t(T_KEYS.REQUEST_SCREEN_PRAYER)}
        </CustomText>
        <CustomText color={theme.colors.textColorSecondary}>
          {prayerName}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    marginBottom: responsiveWidth(8),
  },
  item: {
    borderRadius: responsiveWidth(14),
    padding: responsiveWidth(24),
    paddingBottom: responsiveWidth(32),
  },
  itemData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveWidth(12),
  },
  itemDate: {
    textTransform: 'uppercase',
  },
  reply: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newReply: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    backgroundColor: CustomizationColors.get('GREEN_SECONDARY'),
    borderRadius: responsiveWidth(50),
    marginLeft: responsiveWidth(6),
  },
  prayer: {
    textTransform: 'uppercase',
    marginTop: responsiveWidth(16),
    marginBottom: responsiveWidth(4),
  },
});

export default WidgetMessage;
