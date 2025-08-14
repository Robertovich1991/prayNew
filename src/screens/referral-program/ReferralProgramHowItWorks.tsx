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
             Copy your unique link and send it to the person you want to invite.
After they register in the app, the bonus will be credited according to the Calculation Scheme.
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
              Click the SHARE button and the link will be copied to your clipboard, so you can paste it into a message for a potential invitee to the app.
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
              Once the person you invited registers, we will credit your bonus within 24 hours. You can see the bonus amount in the Calculation Scheme section, and check your current referrals in the YOUR REFERRALS list.
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
