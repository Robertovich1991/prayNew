import React, { useState } from 'react';
import { View, Image, StyleSheet, Keyboard } from 'react-native';
import Cross from '../../assets/img/cross.png';
import { responsiveWidth } from '../../common/utils';
import TopBar from '../../components/TopBar';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import Container from '../../components/Container';
import store from 'store';
import { useNavigation } from '@react-navigation/native';
import { T_KEYS } from 'assets/translations';
import useOwnTranslation from 'hooks/useOwnTranslation';
import { TouchableWithoutFeedback } from 'react-native';
import ChangeSavedModal from 'screens/modals/ChangeSavedModal';
import { useTheme } from '@rneui/themed';

const EditProfile = () => {
  const navigation = useNavigation();
  const [editableName, setEditableName] = useState(store.userStore.userName);
  const { theme } = useTheme();
  const t = useOwnTranslation;

  const showChangeSavedModal = () => {
    store.modalStore.open(
      <ChangeSavedModal
        continueAction={() => {
          navigation.goBack();
        }}
      />,
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <TopBar text={t(T_KEYS.EDIT_PROFILE_TITLE)} backArrow={true} />
        <View style={styles.wrapper}>
          <Image style={styles.cross} source={Cross} />
          <CustomText
            fontSize={responsiveWidth(12)}
            color={theme.colors.textColorQuaternary}
            style={styles.customText}
            fontWeight="light"
          >
            {t(T_KEYS.YOUR_NAME)}
          </CustomText>
          <CustomInput
            onChange={newName => {
              setEditableName(newName);
            }}
            initialValue={editableName}
          />
          <View style={styles.btnWrapper}>
            <CustomButton
              onPress={() => {
                Keyboard.dismiss();
                showChangeSavedModal();
                store.userStore.setCurrentUserName(editableName);
              }}
              title={t(T_KEYS.SAVE_BUTTON)}
            />
          </View>
        </View>
      </Container>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
  },
  cross: {
    width: responsiveWidth(15),
    height: responsiveWidth(30),
    marginTop: responsiveWidth(69),
  },
  customText: {
    marginTop: responsiveWidth(40),
  },
  btnWrapper: {
    width: '100%',
    marginTop: responsiveWidth(48),
  },
});

export default EditProfile;
