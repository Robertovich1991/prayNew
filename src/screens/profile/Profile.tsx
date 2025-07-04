import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import TopBar from '../../components/TopBar';
import Cross from '../../assets/img/cross.png';
import { responsiveWidth } from '../../common/utils';
import ForwardArrow from '../../assets/img/icons/forwardArrow.svg';
import CustomButton from '../../components/CustomButton';
import Routes from '../../navigation/Routes';
import CustomLine from '../../components/CustomLine';
import CustomText from '../../components/CustomText';
import Container from '../../components/Container';
import PlayfairTitle from '../../components/PlayfairTitle';
import { useCurrentUser } from 'hooks';
import { observer } from 'mobx-react';
import store from 'store';
import { ScrollView } from 'react-native';
import { T_KEYS } from 'assets/translations';
import useOwnTranslation from 'hooks/useOwnTranslation';
import { WINDOW_WIDTH } from 'helpers/dimensions';
import { version } from '../../../package.json';
import { useTheme } from '@rneui/themed';
import { CustomizationColors } from 'styles/customization';

type RootStackParamList = {
  [Routes.EDIT_PROFILE]: undefined;
  [Routes.PRAYER_REQUEST]: undefined;
  [Routes.ARTICLES]: undefined;
  [Routes.TARIF_SCREEN]: undefined;
  [Routes.JOIN_COMMUNITY]: undefined;
  [Routes.PRIVACY_POLICY]: undefined;
  [Routes.AVOID_SERVICE]: undefined;
  [Routes.SETTINGS]: undefined;
  [Routes.REFERRAL_PROGRAM]: undefined;
  [Routes.CONFESSION_ROOM]: undefined;
};

type Props = StackNavigationProp<RootStackParamList>;

const Profile = () => {
  const navigation = useNavigation<Props>();
  const { userName } = useCurrentUser();
  const { theme } = useTheme();
  const t = useOwnTranslation;

  return (
    <Container>
      <TopBar text={t(T_KEYS.PROFILE_SCREEN_TITLE)} backArrow={true} />
      <ScrollView style={styles.scrollWrapper}>
        <View style={styles.wrapper}>
          <Image style={styles.cross} source={Cross} />
          <View style={styles.nameWrapper}>
            <PlayfairTitle>{userName}</PlayfairTitle>
          </View>
          <CustomButton
            height={responsiveWidth(44)}
            btnTextStyle={{
              ...styles.btnText,
              color: theme.colors.textColorSecondary,
            }}
            style={styles.btn}
            onPress={() => {
              navigation.navigate(Routes.EDIT_PROFILE);
            }}
            title={t(T_KEYS.PROFILE_SCREEN_EDIT)}
          />
        </View>
        <CustomLine />
        <View style={styles.listWrapper}>
          <TouchableOpacity
            style={styles.list}
            onPress={() => {
              navigation.navigate(Routes.PRAYER_REQUEST);
            }}
          >
            <View style={styles.noticeWrapper}>
              <CustomText color={theme.colors.textColorSecondary}>
                {t(T_KEYS.PROFILE_SCREEN_PRAYER_REQUEST)}
              </CustomText>
              <View style={styles.notice}>
                <CustomText
                  fontSize={responsiveWidth(11)}
                  lineHeight={responsiveWidth(15)}
                >
                  {store.prayersStore.notViewedRequests}
                </CustomText>
              </View>
            </View>
            <ForwardArrow
              color={theme.colors.textColorSecondary}
              width={responsiveWidth(14)}
              height={responsiveWidth(14)}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.list}
            onPress={() => {
              navigation.navigate(Routes.ARTICLES);
            }}
          >
            <View style={styles.noticeWrapper}>
              <CustomText color={theme.colors.textColorSecondary}>
                {t(T_KEYS.ARTICLES_SCREEN_TITLE)}
              </CustomText>
            </View>
            <ForwardArrow
              color={theme.colors.textColorSecondary}
              width={responsiveWidth(14)}
              height={responsiveWidth(14)}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.list}
            onPress={() => {
              navigation.navigate(Routes.TARIF_SCREEN);
            }}
          >
            <CustomText color={theme.colors.textColorSecondary}>
              {t(T_KEYS.PROFILE_SCREEN_SUBSCRIPTION)}
            </CustomText>
            <ForwardArrow
              color={theme.colors.textColorSecondary}
              width={responsiveWidth(14)}
              height={responsiveWidth(14)}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.list}
            onPress={() => {
              navigation.navigate(Routes.JOIN_COMMUNITY);
            }}
          >
            <CustomText color={theme.colors.textColorSecondary}>
              {t(T_KEYS.PROFILE_SCREEN_JOIN)}
            </CustomText>
            <ForwardArrow
              color={theme.colors.textColorSecondary}
              width={responsiveWidth(14)}
              height={responsiveWidth(14)}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.list}
            onPress={() => {
              navigation.navigate(Routes.PRIVACY_POLICY);
            }}
          >
            <CustomText color={theme.colors.textColorSecondary}>
              {t(T_KEYS.PROFILE_SCREEN_POLICY)}
            </CustomText>
            <ForwardArrow
              color={theme.colors.textColorSecondary}
              width={responsiveWidth(14)}
              height={responsiveWidth(14)}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.list}
            onPress={() => {
              navigation.navigate(Routes.AVOID_SERVICE);
            }}
          >
            <CustomText color={theme.colors.textColorSecondary}>
              {t(T_KEYS.PROFILE_SCREEN_AVOID_SERVICE)}
            </CustomText>
            <ForwardArrow
              color={theme.colors.textColorSecondary}
              width={responsiveWidth(14)}
              height={responsiveWidth(14)}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.list}
            onPress={() => {
              navigation.navigate(Routes.SETTINGS);
            }}
          >
            <CustomText color={theme.colors.textColorSecondary}>
              {t(T_KEYS.PROFILE_SCREEN_SETTINGS)}
            </CustomText>
            <ForwardArrow
              color={theme.colors.textColorSecondary}
              width={responsiveWidth(14)}
              height={responsiveWidth(14)}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.list}
            onPress={() => {
              navigation.navigate(Routes.REFERRAL_PROGRAM);
            }}
          >
            <CustomText color={theme.colors.textColorSecondary}>
              {t(T_KEYS.REFERRAL_PROGRAM)}
            </CustomText>
            <ForwardArrow
              color={theme.colors.textColorSecondary}
              width={responsiveWidth(14)}
              height={responsiveWidth(14)}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPressIn={() => {
              store.userStore.signOut();
            }}
          >
            <CustomText color={CustomizationColors.get('RED_PRIMARY')}>
              {t(T_KEYS.PROFILE_SCREEN_LOG_OUT)}
            </CustomText>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.versionContainer}>
        <CustomText
          fontSize={responsiveWidth(10)}
          color={'#aaa'}
          children={`v${version}`}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollWrapper: {
    marginTop: responsiveWidth(69),
  },
  wrapper: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(90),
    marginBottom: responsiveWidth(32),
  },
  cross: {
    width: responsiveWidth(25),
    height: responsiveWidth(53),
    marginBottom: responsiveWidth(24),
  },
  nameWrapper: {
    marginBottom: responsiveWidth(14),
  },
  btn: {
    borderRadius: responsiveWidth(10),
  },
  btnText: {
    fontSize: responsiveWidth(13),
    lineHeight: responsiveWidth(19),
    fontFamily: 'NotoSans-Regular',
    fontWeight: '500',
  },
  listWrapper: {
    marginVertical: responsiveWidth(32),
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveWidth(24),
  },
  noticeWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  notice: {
    width: responsiveWidth(16),
    height: responsiveWidth(16),
    bottom: responsiveWidth(12),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CustomizationColors.get('GREEN_PRIMARY'),
    borderRadius: responsiveWidth(50),
  },
  versionContainer: {
    position: 'absolute',
    bottom: 20,
    width: WINDOW_WIDTH,
    alignItems: 'flex-end',
    paddingHorizontal: responsiveWidth(32),
  },
});

export default observer(Profile);
