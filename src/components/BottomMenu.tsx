import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import Prayer from '../assets/img/icons/prayers.svg';
import Pastors from '../assets/img/icons/pastors.svg';
import Home from '../assets/img/icons/home.svg';
import Donations from '../assets/img/icons/donations.svg';
import { responsiveWidth } from '../common/utils';
import { useRoute } from '@react-navigation/native';
import HomePng from '../assets/img/homePng.png';
import HomePngLight from '../assets/img/homePngLight.png';
import Routes from '../navigation/Routes';
import StandartBottomMenuButton from './StandartBottomMenuButton';
import { T_KEYS } from 'assets/translations';
import useOwnTranslation from 'hooks/useOwnTranslation';
import { useTheme } from '@rneui/themed';
import { CustomizationColors } from 'styles/customization';

import * as Assets from '../assets';

const BottomMenu = () => {
  const route = useRoute();
  const t = useOwnTranslation;
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View
          style={{
            ...styles.leftItemsWrapper,
            backgroundColor: theme.colors.backgroundSecondary,
          }}
        >
          <StandartBottomMenuButton
            style={{
              ...styles.leftItems,
              backgroundColor: theme.colors.backgroundSecondary,
            }}
            direction={Routes.PRAYERS}
            icon={
              <Prayer
                fill={
                  route.name === Routes.PRAYERS
                    ? theme.colors.textColorPrimary
                    : theme.colors.textColorQuaternary
                }
                width={responsiveWidth(20)}
                height={responsiveWidth(20)}
              />
            }
            title={t(T_KEYS.BOTTOM_MENU_PRAYERS)}
          />
          <StandartBottomMenuButton
            style={styles.leftItems}
            direction={Routes.PASTORS}
            icon={
              <Pastors
                fill={
                  route.name === Routes.PASTORS
                    ? theme.colors.textColorPrimary
                    : theme.colors.textColorQuaternary
                }
                width={responsiveWidth(20)}
                height={responsiveWidth(20)}
              />
            }
            title={t(T_KEYS.BOTTOM_MENU_PASTORS)}
          />
        </View>
        <View style={styles.homeItem}>
          <ImageBackground
            style={styles.tabBackground}
            source={theme.mode === 'dark' ? HomePng : HomePngLight}
          >
            <StandartBottomMenuButton
              style={{
                ...styles.homeWrapper,
                backgroundColor:
                  theme.mode === 'dark'
                    ? CustomizationColors.get('BLACK_PRIMARY')
                    : CustomizationColors.get('ORANGE_PRIMARY'),
              }}
              direction={Routes.HOME_SCREEN}
              icon={
                <Home
                  fill={
                    theme.mode === 'dark'
                      ? route.name === Routes.HOME_SCREEN
                        ? theme.colors.textColorPrimary
                        : theme.colors.textColorQuaternary
                      : CustomizationColors.get('WHITE')
                  }
                  width={responsiveWidth(40)}
                  height={responsiveWidth(40)}
                />
              }
            />
          </ImageBackground>
        </View>
        <View
          style={{
            ...styles.rightItemsWrapper,
            backgroundColor: theme.colors.backgroundSecondary,
          }}
        >
          <StandartBottomMenuButton
            style={{
              ...styles.rightItems,
              backgroundColor: theme.colors.backgroundSecondary,
            }}
            direction={Routes.CONFESSION_ROOM}
            icon={
              <Assets.Icons.ConfessionHearts
                fill={
                  route.name === Routes.ARTICLES
                    ? theme.colors.textColorPrimary
                    : theme.colors.textColorQuaternary
                }
                width={responsiveWidth(20)}
                height={responsiveWidth(20)}
              />
            }
            title="Confessions"
          />
          <StandartBottomMenuButton
            style={styles.rightItems}
            direction={Routes.DONATIONS}
            icon={
              <Donations
                fill={
                  route.name === Routes.DONATIONS
                    ? theme.colors.textColorPrimary
                    : theme.colors.textColorQuaternary
                }
                width={responsiveWidth(20)}
                height={responsiveWidth(20)}
              />
            }
            title={t(T_KEYS.BOTTOM_MENU_DONATIONS)}
          />
        </View>
      </View>
    </View>
  );
};

const btnStyle = {
  height: responsiveWidth(75),
  width: '50%',
};

const itemsWrapper = {
  width: '100%',
  height: responsiveWidth(75),
  flex: 1,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 2000,
  },
  wrapper: {
    flexDirection: 'row',
    width: '100%',
  },
  tabBackground: {
    width: '100%',
    height: responsiveWidth(75),
    alignItems: 'center',
  },
  leftItemsWrapper: {
    ...itemsWrapper,
    flexDirection: 'row',
    borderTopLeftRadius: responsiveWidth(6),
  },
  leftItems: {
    ...btnStyle,
    borderTopLeftRadius: responsiveWidth(6),
  },
  rightItemsWrapper: {
    ...itemsWrapper,
    flexDirection: 'row',
    borderTopRightRadius: responsiveWidth(6),
  },
  rightItems: {
    ...btnStyle,
    borderTopRightRadius: responsiveWidth(6),
  },
  homeItem: {
    width: responsiveWidth(95),
    height: responsiveWidth(75),
  },
  homeWrapper: {
    width: responsiveWidth(69),
    height: responsiveWidth(69),
    bottom: responsiveWidth(23),
    borderRadius: responsiveWidth(50),
  },
});

export default BottomMenu;
