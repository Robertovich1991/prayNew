/* eslint-disable react-native/no-inline-styles */
import { WINDOW_WIDTH } from 'helpers/dimensions';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from 'components/CustomButton';
import store from 'store';
import { responsiveWidth } from 'common/utils';
import CustomText from 'components/CustomText';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@rneui/themed';

interface ErrorModalProps {
  title: string;
  onCloseAction?: () => void;
}

const SimpleModal = ({ title, onCloseAction }: ErrorModalProps) => {
  const { theme } = useTheme();
  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: theme.colors.backgroundPrimary,
      }}
    >
      <ScrollView>
        <View style={styles.titleWrapper}>
          <CustomText>{title}</CustomText>
        </View>
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <CustomButton
          onPress={async () => {
            if (typeof onCloseAction === 'function') {
              onCloseAction();
            } else {
              // store.modalStore.close();
            }
            store.modalStore.close();
          }}
          title={'OK'}
          style={{ opacity: 0.8 }}
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
    paddingHorizontal: responsiveWidth(10),
    paddingVertical: responsiveWidth(10),
  },
  titleWrapper: {
    justifyContent: 'center',
  },
  buttonWrapper: {
    position: 'absolute',
    width: WINDOW_WIDTH - responsiveWidth(20),
    bottom: responsiveWidth(20),
    left: responsiveWidth(10),
  },
});

export default SimpleModal;
