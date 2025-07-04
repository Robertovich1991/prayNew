import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { responsiveWidth, useCndUrl } from 'common/utils';
import Routes from 'navigation/Routes';
import React from 'react';
import { TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import CustomText from './CustomText';
import PrayersGradient from '../assets/img/prayItemGradient.png';
import PrayersWhiteGradient from '../assets/img/prayItemWhiteGradient.png';
import useOwnTranslation from 'hooks/useOwnTranslation';
import { useTheme } from '@rneui/themed';

interface IPrayersItemProps {
  prayer: Prayer;
}

type RootStackParamList = {
  [Routes.PRAYER_SCREEN]: {
    prayerId: number;
  };
};

type Props = StackNavigationProp<RootStackParamList>;

const PrayersItem = ({ prayer }: IPrayersItemProps) => {
  const navigation = useNavigation<Props>();
  const t = useOwnTranslation;
  const itemImg = useCndUrl(prayer.titleImageUrl);
  const { theme } = useTheme();

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(Routes.PRAYER_SCREEN, {
            prayerId: prayer.id,
          });
        }}
      >
        <View>
          <Image style={styles.image} source={{ uri: itemImg }} />
          <Image
            source={
              theme.mode === 'dark' ? PrayersGradient : PrayersWhiteGradient
            }
            style={styles.gradient}
          />
        </View>
        <CustomText style={styles.title}>{t(prayer.text)}</CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: responsiveWidth(8),
  },
  image: {
    width: '100%',
    height: responsiveWidth(160),
    borderRadius: responsiveWidth(14),
  },
  gradient: {
    width: '100%',
    bottom: 0,
    position: 'absolute',
    borderRadius: responsiveWidth(14),
  },
  title: {
    position: 'absolute',
    bottom: responsiveWidth(20),
    left: responsiveWidth(24),
  },
});

export default PrayersItem;
