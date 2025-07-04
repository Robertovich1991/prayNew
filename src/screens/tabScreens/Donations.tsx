/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { responsiveWidth } from '../../common/utils';
import CustomButton from '../../components/CustomButton';
import CustomLine from '../../components/CustomLine';
import TopBar from '../../components/TopBar';
import DonationImage from '../../assets/img/donationImage.png';
import DonationImageBlackGradient from '../../assets/img/donationImageBlackGradient.png';
import DonationImageWhiteGradient from '../../assets/img/donationImageWhiteGradient.png';
import CustomText from '../../components/CustomText';
import BottomMenu from '../../components/BottomMenu';
import PlayfairTitle from '../../components/PlayfairTitle';
import { T_KEYS } from 'assets/translations';
import useOwnTranslation from 'hooks/useOwnTranslation';
import store from 'store';
import { observer } from 'mobx-react';
import { useFocusEffect } from '@react-navigation/native';
import SimpleModal from 'screens/modals/SimpleModal';
import { Product } from 'react-native-iap';
import ThanksModal from 'screens/modals/ThanksModal';
import { LogEvent, af_donation_started } from 'helpers/logEvents';
import { useTheme } from '@rneui/themed';
import { CustomizationColors } from 'styles/customization';

const Donations = () => {
  const [selectedDonation, setSelectedDonation] = useState(0);
  const [donationsList, setDonationsList] = useState<Donation[]>([]);
  const { theme } = useTheme();
  const t = useOwnTranslation;

  useFocusEffect(
    useCallback(() => {
      initDonations();
    }, []),
  );

  useEffect(() => {}, [store.donationsStore.donations]);

  const modalTitle = t(T_KEYS.THANKS_FOR_YOUR_DONATION);

  const initDonations = async () => {
    const donationsRaw = await store.donationsStore.fetchDonations();
    if (!donationsRaw) {
      return;
    }
    await store.purchaseStore.initRNIap();
    // Here we can receive Localized Price for products
    const donationsSKUs = donationsRaw?.map(x => x.googleSku);
    if (donationsSKUs && donationsSKUs.length > 0) {
      const activeDonations = await store.purchaseStore.getActiveProducts(
        donationsSKUs,
      );
      if (activeDonations && activeDonations.length > 0) {
        setDonationsList(
          donationsRaw.map(donat => {
            const googleDonation = activeDonations.find(
              (x: any) => x.productId === donat.googleSku,
            );
            return {
              ...donat,
              googleDonation,
            };
          }),
        );
      }
    }
  };

  const performDonationsWithModals = (): Promise<Product> =>
    new Promise(async (resolve, reject) => {
      try {
        const donation = donationsList.find(x => x.id === selectedDonation);
        if (!donation || !donation.googleDonation) {
          reject('Internal error occured. Please, try another donation');
          return;
        } else {
          const purchases = await store.purchaseStore.getAvailablePurchases();
          console.log('getAvailablePurchases', purchases);
          resolve(donation.googleDonation);
          return;
          // await new Promise(res => setTimeout(() => res(true), 3000));
        }
      } catch (purchaseError: any) {
        store.modalStore.open(
          <SimpleModal
            title={`ERROR IN GET DONATIONS OCCURED\n${String(purchaseError)}`}
          />,
        );
        reject(`Error: ${purchaseError}`);
        return;
      }
    });

  const purchaseWithModals = (product: Product): Promise<string> =>
    new Promise(async (resolve, reject) => {
      if (!product) {
        reject(undefined);
        return;
      }
      try {
        const purchaseResult = await store.purchaseStore.purchaseProduct(
          product,
        );
        console.log('Purchase Result', purchaseResult);
        if (purchaseResult?.result) {
          store.modalStore.open(
            <ThanksModal title={modalTitle} source={'donation-gratitude'} />,
          );
          const donation = donationsList.find(x => x.id === selectedDonation);
          LogEvent('af_donation_completed', {
            af_revenue: donation?.amount,
            af_currency: 'USD',
          });
          resolve(purchaseResult as string);
          return;
        }
        reject(undefined);
        return;
      } catch (purchaseError: any) {
        store.modalStore.open(
          <SimpleModal title={`ERROR IN PURCHASE\n${String(purchaseError)}`} />,
        );
        reject(undefined);
        return;
      }
    });

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.backgroundPrimary,
      }}
    >
      <View>
        <Image style={styles.image} source={DonationImage} />
        <Image
          style={styles.gradient}
          source={
            theme.mode === 'dark'
              ? DonationImageBlackGradient
              : DonationImageWhiteGradient
          }
        />
        <View style={styles.imageItems}>
          <TopBar />
          <PlayfairTitle>{t(T_KEYS.DONATIONS_SCREEN_PLAYFAIR)}</PlayfairTitle>
        </View>
      </View>
      <View style={styles.lineWrapper}>
        <CustomLine />
      </View>
      <View style={styles.wrapper}>
        <CustomText
          fontWeight="light"
          lineHeight={responsiveWidth(22)}
          color={theme.colors.textColorSecondary}
          style={styles.textStyle}
        >
          {t(T_KEYS.DONATIONS_SCREEN_TEXT)}
        </CustomText>
        <FlatList
          data={donationsList}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.btnWrapper}>
              <CustomButton
                backgroundColor={theme.colors.buttonTertiary}
                btnTextStyle={
                  selectedDonation === item.id
                    ? {
                        ...styles.activeDollars,
                        color: theme.colors.textColorPrimary,
                      }
                    : {
                        ...styles.inactiveDollars,
                        color: CustomizationColors.get('GREY_SECONDARY'),
                      }
                }
                onPress={() => {
                  setSelectedDonation(item.id);
                  console.log('donation btn: $', item.amount);
                }}
                title={`${item.googleDonation?.localizedPrice || item.amount}`}
              />
            </View>
          )}
        />
        <View style={styles.donateBtnWrapepr}>
          <CustomButton
            onPress={async () => {
              setSelectedDonation(0);
              LogEvent('af_donation_started', { af_donation_started });
              try {
                const donation = await performDonationsWithModals();
                if (donation) {
                  const result = await purchaseWithModals(donation);
                  if (!result) {
                    store.modalStore.open(
                      <SimpleModal
                        title={'ERROR IN PURCHASE FINAL PROCESS}'}
                      />,
                    );
                  }
                }
              } catch (e) {
                console.log('We have an error', e);
              }
            }}
            title={t(T_KEYS.DONATIONS_SCREEN_DONATE)}
            disabled={selectedDonation === 0}
          />
        </View>
      </View>
      <BottomMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: responsiveWidth(256),
  },
  gradient: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  imageItems: {
    width: '100%',
    height: responsiveWidth(185),
    position: 'absolute',
    marginTop: responsiveWidth(71),
    paddingHorizontal: responsiveWidth(20),
    paddingBottom: responsiveWidth(12),
    justifyContent: 'space-between',
  },
  lineWrapper: {
    paddingHorizontal: responsiveWidth(20),
    marginBottom: responsiveWidth(12),
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: responsiveWidth(20),
  },
  textStyle: {
    marginBottom: responsiveWidth(8),
  },
  btnWrapper: {
    marginBottom: responsiveWidth(8),
  },
  inactiveDollars: {
    fontSize: responsiveWidth(22),
    fontFamily: 'NotoSans-Regular',
  },
  activeDollars: {
    fontSize: responsiveWidth(22),
    fontFamily: 'NotoSans-Regular',
  },
  donateBtnWrapepr: {
    marginBottom: responsiveWidth(100),
  },
});

export default observer(Donations);
