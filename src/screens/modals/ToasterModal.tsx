import { WINDOW_WIDTH, WINDOW_HEIGHT } from 'helpers/dimensions';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import store from 'store';
import { responsiveWidth } from 'common/utils';
import CustomText from 'components/CustomText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@rneui/themed';

interface ToasterModalProps {
  title: string;
}

const ToasterModal = ({ title }: ToasterModalProps) => {
  const { theme } = useTheme();

  useEffect(() => {
    const timeout = setTimeout(() => {
      store.modalStore.close();
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView
      style={{
        paddingTop: (WINDOW_HEIGHT * 2) / 3,
      }}
      onTouchStart={() => store.modalStore.close()}
    >
      <View style={styles.container}>
        <View
          style={{
            ...styles.titleWrapper,
            backgroundColor: theme.colors.backgroundSecondary,
          }}
        >
          <CustomText
            color={theme.colors.textColorQuaternary}
            numberOfLines={1}
            ellipsizeMode={'clip'}
            style={styles.titleText}
            fontSize={responsiveWidth(14)}
            lineHeight={responsiveWidth(14)}
          >
            {title}
          </CustomText>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrapper: {
    width: '80%',
    height: responsiveWidth(32),
    borderRadius: responsiveWidth(8),
    padding: responsiveWidth(9),
  },
  titleText: { textAlign: 'center' },
});

export default ToasterModal;
