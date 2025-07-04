import React from 'react';
import {
  View,
  StyleSheet,
  Share,
  Clipboard,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '@rneui/themed';

import store from '../../../store/index';

import { responsiveWidth } from '../../../common/utils';
import { T_KEYS } from '../../../assets/translations/index';
import ForwardArrow from '../../../assets/img/icons/forwardArrow.svg';

import CustomText from '../../../components/CustomText';
import CustomButton from '../../../components/CustomButton';
import ToasterModal from '../../../screens/modals/ToasterModal';
import ErrorModal from '../../../screens/modals/ErrorModal';
import Divider from '../../../components/Divider';
import Routes from 'navigation/Routes';

import useOwnTranslation from 'hooks/useOwnTranslation';

const ShareReferalCodeWidget: React.FC<{ referalCode: string }> = props => {
  const navigation = useNavigation<
    StackNavigationProp<{
      [Routes.REFERRAL_PROGRAM_HOW_IT_WORKS]: undefined;
      [Routes.REFERRAL_PROGRAM_CALCULATION_SCHEME]: undefined;
    }>
  >();
  const { theme } = useTheme();

  const t = useOwnTranslation;

  const copiedToClipboardPhrase = t(T_KEYS.COPIED_TO_CLIPBOARD);

  const onShare = async () => {
    try {
      await Share.share({
        message: props.referalCode,
      });
    } catch (error: any) {
      store.modalStore.open(<ErrorModal title={error.message} />);
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString(props.referalCode);

    store.modalStore.open(<ToasterModal title={copiedToClipboardPhrase} />);
  };

  return (
    <>
      <View
        style={{
          ...styles.container,
          backgroundColor: theme.colors.backgroundSecondary,
        }}
      >
        <TouchableOpacity onPress={copyToClipboard}>
          <CustomText
            style={{
              ...styles.text,
              backgroundColor: theme.colors.backgroundPrimary,
            }}
            ellipsizeMode={'tail'}
            numberOfLines={1}
            fontSize={responsiveWidth(14)}
            lineHeight={responsiveWidth(19)}
            color={theme.colors.textColorQuaternary}
          >
            {props.referalCode}
          </CustomText>
        </TouchableOpacity>

        <CustomButton
          title={t(T_KEYS.SHARE_BUTTON_TITLE)}
          onPress={onShare}
          style={{
            ...styles.shareButton,
          }}
        />
      </View>
      <Divider height={responsiveWidth(12)} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate<any>(Routes.REFERRAL_PROGRAM_HOW_IT_WORKS);
        }}
      >
        <View
          style={{
            ...styles.button,
            backgroundColor: theme.colors.backgroundSecondary,
          }}
        >
          <CustomText color={theme.colors.textColorPrimary}>
            {t(T_KEYS.HOW_IT_WORKS)}
          </CustomText>
          <ForwardArrow
            color={theme.colors.textColorSecondary}
            width={responsiveWidth(14)}
            height={responsiveWidth(14)}
          />
        </View>
      </TouchableOpacity>
      <Divider height={responsiveWidth(8)} />
      <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: theme.colors.backgroundSecondary,
        }}
        onPress={() => {
          navigation.navigate(Routes.REFERRAL_PROGRAM_CALCULATION_SCHEME);
        }}
      >
        <CustomText color={theme.colors.textColorPrimary}>
          {t(T_KEYS.CALCULATION_SCHEME)}
        </CustomText>
        <ForwardArrow
          color={theme.colors.textColorSecondary}
          width={responsiveWidth(14)}
          height={responsiveWidth(14)}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: responsiveWidth(12),
    padding: responsiveWidth(12),
  },
  text: {
    height: responsiveWidth(43),
    borderRadius: responsiveWidth(8),
    alignItems: 'center',
    justifyContent: 'center',
    padding: responsiveWidth(12),
  },
  shareButton: {
    marginTop: responsiveWidth(12),
    height: responsiveWidth(43),
    borderRadius: responsiveWidth(8),
    backgroundColor: '#D9C28D',
  },
  button: {
    height: responsiveWidth(44),
    padding: responsiveWidth(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: responsiveWidth(12),
  },
});

export default ShareReferalCodeWidget;
