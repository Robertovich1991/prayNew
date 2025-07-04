import React from 'react';
import { View, Keyboard, ColorValue, TextStyle } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Tooltip from '../assets/img/icons/tooltip.svg';
import User from '../assets/img/icons/user.svg';
import BackArrow from '../assets/img/icons/backArrow.svg';
import Routes from '../navigation/Routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { responsiveWidth } from '../common/utils';
import { useNavigation } from '@react-navigation/core';
import CustomText from './CustomText';
import store from 'store';
import { observer } from 'mobx-react-lite';
import { useTheme } from '@rneui/themed';
import { CustomizationColors } from 'styles/customization';

type RootStackParamList = {
  [Routes.ABOUT_US_SCREEN]: undefined;
  [Routes.PROFILE_SCREEN]: undefined;
};

type Props = StackNavigationProp<RootStackParamList>;

interface ITopBarProps {
  text?: string;
  backArrow?: boolean;
  backArrowColor?: ColorValue;
  backArrowPrevent?: () => Promise<boolean>;
  textStyle?: TextStyle;
}

const TopBar = (props: ITopBarProps) => {
  const navigation = useNavigation<Props>();
  const { theme } = useTheme();

  const textColor = props.textStyle?.color || theme.colors.textColorTertiary;

  return (
    <View>
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={async () => {
            if (props.backArrow) {
              Keyboard.dismiss();
              if (typeof props.backArrowPrevent === 'function') {
                if (!(await props.backArrowPrevent())) {
                  return;
                }
              }
              setTimeout(() => {
                navigation.goBack();
              }, 1);
            } else {
              navigation.navigate(Routes.ABOUT_US_SCREEN);
            }
          }}
        >
          {props.backArrow ? (
            <BackArrow
              color={props.backArrowColor || theme.colors.textColorPrimary}
              width={responsiveWidth(20)}
              height={responsiveWidth(20)}
            />
          ) : (
            <Tooltip
              color={props.backArrowColor || theme.colors.textColorPrimary}
              width={responsiveWidth(20)}
              height={responsiveWidth(20)}
            />
          )}
        </TouchableOpacity>
        <CustomText
          style={{ ...styles.text, ...props.textStyle }}
          color={textColor}
          fontSize={responsiveWidth(14)}
        >
          {props.text}
        </CustomText>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Routes.PROFILE_SCREEN);
          }}
        >
          {!props.backArrow ? (
            <View>
              <User
                color={theme.colors.textColorPrimary}
                width={responsiveWidth(20)}
                height={responsiveWidth(20)}
              />
              {store.prayersStore.notViewedRequests > 0 && (
                <View style={styles.notice}>
                  <CustomText
                    fontSize={responsiveWidth(11)}
                    lineHeight={responsiveWidth(15)}
                  >
                    {store.prayersStore.notViewedRequests}
                  </CustomText>
                </View>
              )}
            </View>
          ) : (
            <User style={styles.alignTitle} width={0} height={0} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  alignTitle: {
    marginRight: responsiveWidth(20),
  },
  notice: {
    position: 'absolute',
    left: responsiveWidth(10),
    width: responsiveWidth(16),
    height: responsiveWidth(16),
    top: responsiveWidth(12),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CustomizationColors.get('GREEN_PRIMARY'),
    borderRadius: responsiveWidth(50),
  },
});

export default observer(TopBar);
