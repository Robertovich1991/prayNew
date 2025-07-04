import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { CardDivider } from '@rneui/base/dist/Card/Card.Divider';
import { useTheme } from '@rneui/themed';

import { responsiveWidth } from '../../common/utils';

import Container from '../../components/Container';
import TopBar from '../../components/TopBar';
import Divider from '../../components/Divider';
import CustomText from '../../components/CustomText';

const ReferalProgramHowItWorks = () => {
  const { theme } = useTheme();

  return (
    <View>
      <Container>
        <TopBar text={'How it works?'} backArrow={true} />
        <ScrollView>
          <Divider height={responsiveWidth(20)} />
          <View
            style={{
              ...styles.container,
              backgroundColor: theme.colors.backgroundSecondary,
            }}
          >
            <View style={styles.textHeader}>
              <CustomText
                color={theme.colors.textColorPrimary}
                fontSize={responsiveWidth(18)}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ textTransform: 'uppercase' }}
                lineHeight={responsiveWidth(27)}
              >
                How referral link works
              </CustomText>
            </View>
            <Divider height={responsiveWidth(12)} />
            <CardDivider />
            <CustomText
              color={theme.colors.textColorPrimary}
              fontSize={responsiveWidth(15)}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </CustomText>
          </View>
          <Divider height={responsiveWidth(12)} />
          <View
            style={{
              ...styles.container,
              backgroundColor: theme.colors.backgroundSecondary,
            }}
          >
            <View style={styles.textHeader}>
              <CustomText
                color={theme.colors.textColorPrimary}
                fontSize={responsiveWidth(18)}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ textTransform: 'uppercase' }}
                lineHeight={responsiveWidth(27)}
              >
                How to share a link
              </CustomText>
            </View>
            <Divider height={responsiveWidth(12)} />
            <CardDivider />
            <CustomText
              color={theme.colors.textColorPrimary}
              fontSize={responsiveWidth(15)}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </CustomText>
          </View>
          <Divider height={responsiveWidth(12)} />
          <View
            style={{
              ...styles.container,
              backgroundColor: theme.colors.backgroundSecondary,
            }}
          >
            <View style={styles.textHeader}>
              <CustomText
                color={theme.colors.textColorPrimary}
                fontSize={responsiveWidth(18)}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ textTransform: 'uppercase' }}
                lineHeight={responsiveWidth(27)}
              >
                How discounts and bonuses are awarded
              </CustomText>
            </View>
            <Divider height={responsiveWidth(12)} />
            <CardDivider />
            <CustomText
              color={theme.colors.textColorPrimary}
              fontSize={responsiveWidth(15)}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </CustomText>
          </View>
        </ScrollView>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: responsiveWidth(12),
    padding: responsiveWidth(16),
  },
  textHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ReferalProgramHowItWorks;
