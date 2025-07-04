import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { responsiveWidth, useCndUrl } from '../common/utils';
import CustomText from './CustomText';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Routes from '../navigation/Routes';
import { useTheme } from '@rneui/themed';

type RootStackParamList = {
  [Routes.PASTORS_INFO]: {
    pastorId: number;
  };
  [Routes.TARIF_SCREEN]: undefined;
};

type Props = StackNavigationProp<RootStackParamList>;

interface ISearchItemProps {
  pastor: Pastor;
}

const SearchItem = ({ pastor }: ISearchItemProps) => {
  const navigation = useNavigation<Props>();
  const itemImg = useCndUrl(pastor.avatarImageUrl);
  const { theme } = useTheme();

  return (
    <View style={styles.itemWrapper}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(Routes.PASTORS_INFO, { pastorId: pastor.id });
        }}
        style={styles.wrapper}
      >
        <Image style={styles.img} source={{ uri: itemImg }} />
        <CustomText color={theme.colors.textColorSecondary}>
          {pastor.name.en}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    marginBottom: responsiveWidth(12),
  },
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: responsiveWidth(52),
    height: responsiveWidth(52),
    marginRight: responsiveWidth(10),
    borderRadius: responsiveWidth(10),
  },
});

export default SearchItem;
