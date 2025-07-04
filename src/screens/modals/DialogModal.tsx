import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@rneui/themed';

import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../helpers/dimensions';
import CustomButton from '../../components/CustomButton';
import store from '../../store';
import { responsiveWidth } from '../../common/utils';
import CustomText from '../../components/CustomText';

interface DialogModalProps {
  title: string;
  onCancelAction?: () => void;
  onConfirmAction?: () => void;
}

const DialogModal: React.FC<DialogModalProps> = ({
  title,
  onCancelAction,
  onConfirmAction,
}) => {
  const { theme } = useTheme();
  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: theme.colors.backgroundPrimary,
      }}
    >
      <View style={styles.titleWrapper}>
        <CustomText>{title}</CustomText>
      </View>
      <View style={styles.buttonWrapper}>
        <CustomButton
          onPress={async () => {
            if (typeof onConfirmAction === 'function') {
              onConfirmAction();
            }
            store.modalStore.close();
          }}
          title={'OK'}
          style={styles.button}
        />
        <View style={styles.buttonDivider} />
        <CustomButton
          onPress={async () => {
            if (typeof onCancelAction === 'function') {
              onCancelAction();
            }
            store.modalStore.close();
          }}
          title={'Cancel'}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    height: '100%',
    flex: 1,
    padding: responsiveWidth(20),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: responsiveWidth(44),
  },
  titleWrapper: {
    marginTop: WINDOW_HEIGHT / 2,
    justifyContent: 'center',
  },
  buttonWrapper: {
    width: '100%',
    flexDirection: 'row',
  },
  buttonDivider: { width: responsiveWidth(8) },
  button: { opacity: 0.8, flex: 1 },
});

export default DialogModal;
