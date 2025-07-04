import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, ScrollView } from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { observer } from 'mobx-react';

import { T_KEYS } from '../../assets/translations';
import useOwnTranslation from '../../hooks/useOwnTranslation';
import { responsiveWidth } from '../../common/utils';

import store from '../../store';

import Container from '../../components/Container';
import Divider from '../../components/Divider';
import TopBar from '../../components/TopBar';

import LoyaltyStatusWidget from './widgets/LoayltyStatusWidget';
import YourReferrals from './widgets/YourReferrals';
import WithDrawBonusWidget from './widgets/WithDrawBonusWidget';
import ShareReferalCodeWidget from './widgets/ShareReferalCodeWidget';
import WithDrawMethods from './widgets/WithDrawMethods';
import ReferralsFilterWidget from './widgets/ReferralsFilterWidget';

const ReferalProgram = () => {
  const t = useOwnTranslation;

  const [filterState, setFilterState] = useState<FilterState>('this-month');

  const withDrawMethodsBottomSheetRef = useRef<BottomSheet>(null);
  const yourReferralsFilterBottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    store.referralsStore.fetchReferrals(filterState);
  }, [filterState]);

  const referalCode =
    'https://play.google.com/store/apps/details?id=ru.nsstms.prayersforafrica.app&referrer=' +
      store.userStore.referalCode || '';

  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
    console.log({ props });
    return (
      <BottomSheetBackdrop
        animatedIndex={props.animatedIndex}
        animatedPosition={props.animatedPosition}
        appearsOnIndex={0}
        disappearsOnIndex={-0.5}
        enableTouchThrough
        style={[props.style]}
      />
    );
  }, []);

  const onFilterStateChanged = (state: FilterState) => {
    setFilterState(state);
    yourReferralsFilterBottomSheetRef.current?.close();
  };

  return (
    <View>
      <Container>
        <TopBar text={t(T_KEYS.REFERRAL_PROGRAM)} backArrow={true} />
        <ScrollView>
          <LoyaltyStatusWidget
            referralCounterForFreeSub={30}
            totalReferralBalance={400}
            totalReferralCounter={30}
          />
          <Divider height={responsiveWidth(20)} />
          <WithDrawBonusWidget bottomSheetRef={withDrawMethodsBottomSheetRef} />
          <Divider height={responsiveWidth(24)} />
          <ShareReferalCodeWidget referalCode={referalCode} />
          <Divider height={responsiveWidth(20)} />
          <YourReferrals
            filterState={filterState}
            bottomSheetRef={yourReferralsFilterBottomSheetRef}
            referrals={store.referralsStore.referrals}
          />
        </ScrollView>
      </Container>
      <BottomSheet
        ref={withDrawMethodsBottomSheetRef}
        index={-1}
        snapPoints={['50%']}
        animateOnMount
        enablePanDownToClose
        detached
        backdropComponent={renderBackdrop}
      >
        <WithDrawMethods />
      </BottomSheet>
      <BottomSheet
        ref={yourReferralsFilterBottomSheetRef}
        index={-1}
        snapPoints={['50%']}
        animateOnMount
        enablePanDownToClose
        detached
        backdropComponent={renderBackdrop}
      >
        <ReferralsFilterWidget onFilterStateChanged={onFilterStateChanged} />
      </BottomSheet>
    </View>
  );
};

export default observer(ReferalProgram);
