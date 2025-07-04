import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { responsiveWidth } from '../common/utils';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Routes from '../navigation/Routes';
import CustomText from './CustomText';
import { useTheme } from '@rneui/themed';

interface IStandartBottomMenuButtonProps {
  direction: any;
  icon: JSX.Element;
  title?: string;
  style: ViewStyle;
}

type RootStackParamList = {
  [Routes.PRAYERS]: undefined;
  [Routes.PASTORS]: undefined;
  [Routes.HOME_SCREEN]: undefined;
  [Routes.ARTICLES]: undefined;
  [Routes.DONATIONS]: undefined;
};

type Props = StackNavigationProp<RootStackParamList>;

const StandartBottomMenuButton = (props: IStandartBottomMenuButtonProps) => {
  const navigation = useNavigation<Props>();
  const route = useRoute();
  const { theme } = useTheme();
  return (
    <View style={props.style}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(props.direction);
        }}
        style={styles.item}
      >
        {props.icon}
        {props.title ? (
          <CustomText
            numberOfLines={1}
            ellipsizeMode="clip"
            fontWeight="light"
            color={
              route.name === props.direction
                ? theme.colors.textColorPrimary
                : theme.colors.textColorQuaternary
            }
            fontSize={responsiveWidth(10)}
            lineHeight={responsiveWidth(15)}
            style={styles.titleMargin}
          >
            {props.title}
          </CustomText>
        ) : (
          []
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleMargin: {
    marginTop: responsiveWidth(2),
  },
});

export default StandartBottomMenuButton;
