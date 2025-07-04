/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, FlatList } from 'react-native';
import Container from '../components/Container';
import CustomText from '../components/CustomText';
import { useNavigation, useRoute } from '@react-navigation/native';
import BackArrow from '../assets/img/icons/backArrow.svg';
import { TouchableOpacity } from 'react-native';
import { responsiveWidth } from '../common/utils';
import Cross from '../assets/img/cross.png';
import CustomLine from '../components/CustomLine';
import CustomButton from '../components/CustomButton';
import MyMessage from 'components/messages/MyMessage';
import IncomingMessage from 'components/messages/IncomingMessage';
import { T_KEYS } from 'assets/translations';
import useOwnTranslation from 'hooks/useOwnTranslation';
import { StackNavigationProp } from '@react-navigation/stack';
import Routes from 'navigation/Routes';
import store from 'store';
import { useTheme } from '@rneui/themed';
import { CustomizationColors } from 'styles/customization';

type RootStackParamList = {
  [Routes.PRAYERS]: undefined;
};
type Props = StackNavigationProp<RootStackParamList>;

const ChatWithPriest: React.FC<Props> = () => {
  const navigation = useNavigation<Props>();
  const { params } = useRoute<any>();
  const request: PrayerRequest = params.request;
  const t = useOwnTranslation;
  const { theme } = useTheme();
  useEffect(() => {
    if (request.id) {
      store.prayersStore.attendadRequest(request.id);
    }
  }, []);

  console.log('ChatWithPriest params', request);

  return (
    <View>
      <Container>
        <View style={styles.topBarWrapper}>
          <TouchableOpacity>
            <BackArrow
              color={theme.colors.textColorPrimary}
              onPress={() => {
                navigation.goBack();
              }}
              width={responsiveWidth(20)}
              height={responsiveWidth(20)}
            />
          </TouchableOpacity>
          <View style={styles.crossWrapper}>
            <Image style={styles.cross} source={Cross} />
          </View>
          <CustomText color={theme.colors.textColorSecondary}>
            {t(T_KEYS.REQUEST_SCREEN_PERSONAL_PRIEST)}
          </CustomText>
        </View>
        <CustomLine />

        <FlatList
          data={request.messages}
          renderItem={({ item, index }) => {
            if (item.authorId === store.userStore.user?.id) {
              return <MyMessage key={index} {...item} />;
            } else {
              return <IncomingMessage key={index} {...item} />;
            }
          }}
        />

        <View style={styles.btnWrapper}>
          <CustomButton
            onPress={() => {
              navigation.navigate(Routes.PRAYERS);
            }}
            title={t(T_KEYS.REQUEST_SCREEN_SEND_REQUEST)}
          />
        </View>
      </Container>
    </View>
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
  btnWrapper: {
    marginTop: responsiveWidth(16),
    marginBottom: responsiveWidth(48),
  },
  scrollViewStyles: {
    justifyContent: 'flex-end',
    flexGrow: 1,
  },
});

export default ChatWithPriest;
