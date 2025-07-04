import { ANDROID_STATUSBAR, WINDOW_WIDTH } from 'helpers/dimensions';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from 'components/CustomButton';
import PlayfairTitle from 'components/PlayfairTitle';
import store from 'store';
import AnimatedCross from 'components/AnimatedCross';
import { responsiveWidth } from 'common/utils';
import { T_KEYS } from 'assets/translations';
import useOwnTranslation from 'hooks/useOwnTranslation';
import { useTheme } from '@rneui/themed';

interface ErrorModalProps {
  title: string;
  onCloseAction?: () => void;
}

const ErrorModal = ({ title, onCloseAction }: ErrorModalProps) => {
  const t = useOwnTranslation;
  const { theme } = useTheme();
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.backgroundPrimary,
      }}
    >
      <View style={styles.titleWrapper}>
        <PlayfairTitle>{title}</PlayfairTitle>
      </View>
      <View style={styles.crossWrapper}>
        <AnimatedCross />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={() => {
            store.modalStore.close();
            typeof onCloseAction === 'function' && onCloseAction();
          }}
          title={`${t(T_KEYS.TRY_AGAIN_LATER)}`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    height: '100%',
    flex: 1,
    paddingHorizontal: responsiveWidth(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrapper: {
    minHeight: 4 * ANDROID_STATUSBAR,
    justifyContent: 'center',
    position: 'absolute',
    top: 2 * ANDROID_STATUSBAR,
    zIndex: 2,
  },
  crossWrapper: {
    marginTop: 6 * ANDROID_STATUSBAR,
    width: '60%',
    flex: 1,
    marginVertical: responsiveWidth(50),
  },
  buttonContainer: {
    marginBottom: 2 * ANDROID_STATUSBAR,
    width: '100%',
  },
});

export default ErrorModal;
