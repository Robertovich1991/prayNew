// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useCallback, useEffect, useState } from 'react';
// import { View, StyleSheet, Image, FlatList, Alert } from 'react-native';

 import DonationImage from '../assets/img/donationImage.png';
 import DonationImageBlackGradient from '../assets/img/donationImageBlackGradient.png';
 import DonationImageWhiteGradient from '../assets/img/donationImageWhiteGradient.png';

// import { T_KEYS } from 'assets/translations';
// import useOwnTranslation from 'hooks/useOwnTranslation';
// import store from 'store';
// import { observer } from 'mobx-react';
// import { useFocusEffect } from '@react-navigation/native';
// import SimpleModal from 'screens/modals/SimpleModal';
//  import { getReceiptIOS, Product } from 'react-native-iap';
// import ThanksModal from 'screens/modals/ThanksModal';
// import { LogEvent, af_donation_started } from 'helpers/logEvents';
// import { useTheme } from '@rneui/themed';
// import { CustomizationColors } from 'styles/customization';
// import { PurchaseError, requestSubscription } from 'react-native-iap';
// import TopBar from 'components/TopBar';
// import PlayfairTitle from 'components/PlayfairTitle';
// import CustomLine from 'components/CustomLine';
// import { responsiveWidth } from 'common/utils';
// import CustomText from 'components/CustomText';
// import CustomButton from 'components/CustomButton';
// import BottomMenu from 'components/BottomMenu';

// const Donations = () => {

//   const { theme } = useTheme();
//   const t = useOwnTranslation;

//   useFocusEffect(
//     useCallback(() => {
//       initDonations();
//     }, []),
//   );

//   useEffect(() => {}, [store.donationsStore.donations]);

//   const modalTitle = t(T_KEYS.THANKS_FOR_YOUR_DONATION);

//   const initDonations = async () => {
//     const donationsRaw = await store.donationsStore.fetchDonations();
//     if (!donationsRaw) {
//       return;
//     }    
//     await store.purchaseStore.initRNIap();
//     // Here we can receive Localized Price for products
//     const donationsSKUs = donationsRaw?.map(x => x.googleSku);
//     if (donationsSKUs && donationsSKUs.length > 0) {
//       const activeDonations = await store.purchaseStore.getActiveProducts(
//         donationsSKUs,
//       );
//       if (activeDonations && activeDonations.length > 0) {        
//         setDonationsList(
//           donationsRaw.map(donat => {
//             const googleDonation = activeDonations.find(
//               (x: any) => x.productId === donat.googleSku,
//             );
//             return {
//               ...donat,
//               googleDonation,
//             };
//           }),
//         );
//       }
//     }
//   };

//   const performDonationsWithModals = (): Promise<Product> =>
//     new Promise(async (resolve, reject) => {
//       try {
//         const donation = donationsList.find(x => x.id === selectedDonation);
//         if (!donation || !donation.googleDonation) {
//           reject('Internal error occured. Please, try another donation');
//           return;
//         } else {
//           const purchases = await store.purchaseStore.getAvailablePurchases();
//           console.log('getAvailablePurchases', purchases);
//           resolve(donation.googleDonation);
//           return;
//           // await new Promise(res => setTimeout(() => res(true), 3000));
//         }
//       } catch (purchaseError: any) {
//         store.modalStore.open(
//           <SimpleModal
//             title={`ERROR IN GET DONATIONS OCCURED\n${String(purchaseError)}`}
//           />,
//         );
//         reject(`Error: ${purchaseError}`);
//         return;
//       }
//     });


    const handleBuyProducts = async (productId: string) => {
  console.log(productId, '>>>>>><<<<<<<<<<<<<<<<<99999999999999999');

  try {
    const skus = await requestSubscription({
      sku: productId,
    });

    console.log(skus, '------000000000099999iiiiiiii----');
        console.log( '------000000000099999iiiiiiii----');
      const result = await store.donationsStore.sendTransaction(skus);
//console.log(result,'-----++++++++++============+++++++ppppppp+++++++++++++++++');

  } catch (error) {
    if (error instanceof PurchaseError) {
      console.log({ message: `[${error.code}]: ${error.message}`, error });
    } else {
      Alert.alert(
        'Purchase error',
        'Try again later',
        [{ text: 'OK' }],
      );
      console.log(error,'//////////.......................................');
      
    }
  }
};
    

//   return (
//     <View
//       style={{
//         ...styles.container,
//         backgroundColor: theme.colors.backgroundPrimary,
//       }}
//     >
//       <View>
//         <Image style={styles.image} source={DonationImage} />
//         <Image
//           style={styles.gradient}
//           source={
//             theme.mode === 'dark'
//               ? DonationImageBlackGradient
//               : DonationImageWhiteGradient
//           }
//         />
//         <View style={styles.imageItems}>
//           <TopBar />
//           <PlayfairTitle>{t(T_KEYS.DONATIONS_SCREEN_PLAYFAIR)}</PlayfairTitle>
//         </View>
//       </View>
//       <View style={styles.lineWrapper}>
//         <CustomLine />
//       </View>
//       <View style={styles.wrapper}>
//         <CustomText
//           fontWeight="light"
//           lineHeight={responsiveWidth(22)}
//           color={theme.colors.textColorSecondary}
//           style={styles.textStyle}
//         >
//           {t(T_KEYS.DONATIONS_SCREEN_TEXT)}
//         </CustomText>
//         <FlatList
//           data={donationsList}
//           renderItem={({ item, index }) => (            
//             <View key={index} style={styles.btnWrapper}>
//               <CustomButton
//                 backgroundColor={theme.colors.buttonTertiary}
//                 btnTextStyle={
//                   selectedDonation === item.googleSku
//                     ? {
//                         ...styles.activeDollars,
//                         color: theme.colors.textColorPrimary,
//                       }
//                     : {
//                         ...styles.inactiveDollars,
//                         color: CustomizationColors.get('GREY_SECONDARY'),
//                       }
//                 }
//                // onPress={()=>handleBuyProducts(item?.googleDonation?.productId)}
//                 onPress={() => {
//                   setSelectedDonation(item.googleSku);
//                   console.log('donation btn: $', item.amount);
//                 }}
//                 title={`Donate for $${ item.amount}`}
//               />
//             </View>
//           )}
//         />
//         <View style={styles.donateBtnWrapepr}>
//           <CustomButton
//           onPress={()=>handleBuyProducts(selectedDonation)}
//             // onPress={async () => {
//             //   setSelectedDonation(0);
//             //   LogEvent('af_donation_started', { af_donation_started });
//             //   try {
//             //     const donation = await performDonationsWithModals();
//             //     if (donation) {
//             //       const result = await purchaseWithModals(donation);
//             //       if (!result) {
//             //         store.modalStore.open(
//             //           <SimpleModal
//             //             title={'ERROR IN PURCHASE FINAL PROCESS}'}
//             //           />,
//             //         );
//             //       }
//             //     }
//             //   } catch (e) {
//             //     console.log('We have an error', e);
//             //   }
//             // }}
//             title={t(T_KEYS.DONATIONS_SCREEN_DONATE)}
//             disabled={selectedDonation === 0}
//           />
//         </View>
//       </View>
//       <BottomMenu />
//     </View>
//   );
// };


// export default observer(Donations);


import { useTheme } from '@rneui/themed';
import { T_KEYS } from 'assets/translations';
import { responsiveWidth } from 'common/utils';
import BottomMenu from 'components/BottomMenu';
import CustomButton from 'components/CustomButton';
import CustomLine from 'components/CustomLine';
import CustomText from 'components/CustomText';
import OnboardingSlider from 'components/OnboardingSlider';
import PlayfairTitle from 'components/PlayfairTitle';
import TopBar from 'components/TopBar';
import { t } from 'i18next';
import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Image, Alert } from 'react-native';
// import { PurchaseError, requestSubscription } from 'react-native-iap';
import store from 'store';
import { CustomizationColors } from 'styles/customization';



const FreeDonation = () => {
    const [selectedDonation, setSelectedDonation] = useState(0);
  const donationsList=
[{id: 1, amount: 0.99, googleSku: 'start_rate_donation_0_99', isActive: true, history: Array(5), createdAt: '2022-06-02T09:35:06.520Z', updatedAt: '2022-09-12T08:18:59.420Z', isPublished: true, publishedAt: null},
{id: 3, amount: 1.99, googleSku: 'middle_rate_donation_1_99', isActive: true, history: Array(3), createdAt: '2022-06-02T09:35:20.466Z', updatedAt: '2022-09-12T08:19:21.735Z', isPublished: true, publishedAt: null},
{id: 5, amount: 2.99, googleSku: 'high_rate_donation_2_99', isActive: true, history: Array(1), createdAt: '2022-07-15T11:10:24.621Z', updatedAt: '2022-09-10T06:52:52.861Z', isPublished: true, publishedAt: null,}]



  const { theme } = useTheme();
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
                  selectedDonation === item.googleSku
                    ? {
                        ...styles.activeDollars,
                        color: theme.colors.textColorPrimary,
                      }
                    : {
                        ...styles.inactiveDollars,
                        color: CustomizationColors.get('GREY_SECONDARY'),
                      }
                }
               // onPress={()=>handleBuyProducts(item?.googleDonation?.productId)}
                onPress={() => {
                  setSelectedDonation(item.googleSku);
                  console.log('donation btn: $', item.amount);
                }}
                title={`Donate for $${ item.amount}`}
              />
            </View>
          )}
        />
        <View style={styles.donateBtnWrapepr}>
          <CustomButton
          onPress={()=>handleBuyProducts(selectedDonation)}
            // onPress={async () => {
            //   setSelectedDonation(0);
            //   LogEvent('af_donation_started', { af_donation_started });
            //   try {
            //     const donation = await performDonationsWithModals();
            //     if (donation) {
            //       const result = await purchaseWithModals(donation);
            //       if (!result) {
            //         store.modalStore.open(
            //           <SimpleModal
            //             title={'ERROR IN PURCHASE FINAL PROCESS}'}
            //           />,
            //         );
            //       }
            //     }
            //   } catch (e) {
            //     console.log('We have an error', e);
            //   }
            // }}
            title={t(T_KEYS.DONATIONS_SCREEN_DONATE)}
            disabled={selectedDonation === 0}
          />
        </View>
      </View>
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



export default FreeDonation
