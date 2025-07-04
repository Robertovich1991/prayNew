import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { CardDivider } from '@rneui/base/dist/Card/Card.Divider';
import { useTheme } from '@rneui/themed';

import * as Assets from '../../assets/index';

import { responsiveWidth } from '../../common/utils';
import { restApiRoutes } from '../../constants/rest-api';

import store from '../../store';

import Container from '../../components/Container';
import TopBar from '../../components/TopBar';
import Divider from '../../components/Divider';
import CustomText from '../../components/CustomText';

const ReferalProgramCalculationScheme = () => {
  const { theme } = useTheme();

  const referalCode =
    restApiRoutes.API_BACKED_URL.replace('/api', '/referal-code?') +
      store.userStore.referalCode || '';

  console.log({ referalCode });

  return (
    <View>
      <Container>
        <TopBar text={'Calculation scheme'} backArrow={true} />
        <ScrollView>
          <Divider height={responsiveWidth(20)} />
          <View
            style={{
              ...styles.container,
              backgroundColor: theme.colors.backgroundSecondary,
            }}
          >
            <View style={styles.textHeader}>
              <Assets.Icons.HexNut
                width={responsiveWidth(15.83)}
                height={responsiveWidth(18.33)}
                fill={theme.colors.textColorPrimary}
              />
              <CustomText
                color={theme.colors.textColorPrimary}
                fontSize={responsiveWidth(15)}
                style={{ marginLeft: responsiveWidth(8) }}
                fontWeight={'bold'}
              >
                Discount terms
              </CustomText>
            </View>
            <Divider height={responsiveWidth(8)} />
            <CustomText
              color={theme.colors.textColorPrimary}
              fontSize={responsiveWidth(15)}
            >
              Invite 1 to 10 users to get 10% discount. Invite more than 30
              users to receive bonuses of up to 25%.
            </CustomText>
            <Divider height={responsiveWidth(12)} />
            <CardDivider />
            <View style={styles.textHeader}>
              <Assets.Icons.Calendar
                width={responsiveWidth(16.67)}
                height={responsiveWidth(16.67)}
                fill={theme.colors.textColorPrimary}
              />
              <CustomText
                color={theme.colors.textColorPrimary}
                fontSize={responsiveWidth(15)}
                style={{ marginLeft: responsiveWidth(8) }}
                fontWeight={'bold'}
              >
                Expiration date
              </CustomText>
            </View>
            <Divider height={responsiveWidth(8)} />
            <CustomText>
              All bonuses and discounts are active for 30 days from the date of
              receipt.
            </CustomText>
            <Divider height={responsiveWidth(12)} />
            <CardDivider />
            <View style={styles.textHeader}>
              <Assets.Icons.Percent
                width={responsiveWidth(15)}
                height={responsiveWidth(15)}
                fill={theme.colors.textColorPrimary}
              />
              <CustomText
                color={theme.colors.textColorPrimary}
                fontSize={responsiveWidth(15)}
                style={{ marginLeft: responsiveWidth(8) }}
                fontWeight={'bold'}
              >
                Max bonuses
              </CustomText>
            </View>
            <CustomText>
              Once you reach 100 referrals, your bonus reaches 25% of each new
              user's subscription amount.
            </CustomText>
          </View>
          {/* Тут табличка рефералки */}
          <Divider height={responsiveWidth(12)} />
          <View
            style={{
              ...styles.referalsTableContainer,
              backgroundColor: theme.colors.backgroundSecondary,
            }}
          >
            <View style={styles.referalsTableColumn}>
              <CustomText style={styles.referalsTableText} fontWeight={'bold'}>
                Ref's
              </CustomText>
              <CustomText style={styles.referalsTableText}>1-10</CustomText>
              <CustomText style={styles.referalsTableText}>11-30</CustomText>
              <CustomText style={styles.referalsTableText}>31-50</CustomText>
            </View>
            <View style={{ width: responsiveWidth(24) }} />
            <View style={styles.referalsTableColumn}>
              <CustomText style={styles.referalsTableText} fontWeight={'bold'}>
                Bonus
              </CustomText>
              <CustomText style={styles.referalsTableText}>10%</CustomText>
              <CustomText style={styles.referalsTableText}>15%</CustomText>
              <CustomText style={styles.referalsTableText}>20%</CustomText>
            </View>
          </View>
          <Divider height={responsiveWidth(20)} />
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
    height: responsiveWidth(20),
    alignItems: 'center',
  },
  referalsTableContainer: {
    borderRadius: responsiveWidth(12),
    padding: responsiveWidth(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  referalsTableText: {
    fontSize: responsiveWidth(15),
    lineHeight: responsiveWidth(20),
    marginBottom: responsiveWidth(4),
  },
  referalsTableColumn: {
    flex: 1,
  },
});

export default ReferalProgramCalculationScheme;
