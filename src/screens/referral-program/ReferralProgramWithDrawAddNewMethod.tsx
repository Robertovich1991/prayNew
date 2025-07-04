import React, { useCallback, useRef, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';

import * as CustomNavigationProps from '../../navigation/navigationProps';
import Routes from '../../navigation/Routes';

import { responsiveWidth, validateUsdtWallet } from '../../common/utils';

import CustomText from '../../components/CustomText';
import TopBar from '../../components/TopBar';
import Container from '../../components/Container';
import Divider from '../../components/Divider';
import CustomButton from '../../components/CustomButton';
import NewCustomInput from '../../components/NewCustomInput';

const TetherMethodContext: React.FC<{
  bottomSheetRef: React.RefObject<BottomSheet>;
}> = props => {
  const { bottomSheetRef } = props;

  const inputRef = useRef<TextInput>(null);

  const { theme } = useTheme();
  const [usdtWallet, setUsdtWallet] = useState<string>('');
  const [usdtWalletError, setUsdtWalletError] = useState<string | undefined>();

  const onConfirmPressed = async () => {
    inputRef.current?.blur();
    if (validateUsdtWallet(usdtWallet)) {
      // ToDo: запрос на добавление платёжного метода
      await new Promise(resolve =>
        setTimeout(() => {
          resolve(true);
        }, 500),
      );
      bottomSheetRef.current?.expand();
    } else {
      setUsdtWalletError('USDT Wallet ID Incorrect');
    }
  };

  const onValueChanged = (value: string) => {
    setUsdtWallet(value);
    setUsdtWalletError(undefined);
  };

  return (
    <View style={styles.container}>
      <View>
        <CustomText
          lineHeight={responsiveWidth(16)}
          fontSize={responsiveWidth(12)}
          color={theme.colors.textColorTertiary}
        >
          USDT address (ERC-20, TRC-20)
        </CustomText>
        <Divider height={responsiveWidth(8)} />
        <NewCustomInput
          ref={inputRef}
          placeholder="Enter your USDT wallet ID"
          isCheckboxEnabled
          initialValue={usdtWallet}
          onValueChanged={onValueChanged}
          error={usdtWalletError}
        />
      </View>

      <View>
        <CustomButton
          title={'CONFIRM'}
          onPress={onConfirmPressed}
          style={{
            ...styles.confirmButton,
          }}
        />
        <Divider height={responsiveWidth(54)} />
      </View>
    </View>
  );
};

const ReferalProgramWithDrawAddNewMethod = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  useState<'tether'>();

  const { params } =
    useRoute<
      RouteProp<
        CustomNavigationProps.WithDrawBonusWidget,
        Routes.REFERRAL_PROGRAM_WITH_DRAW_ADD_NEW_METHOD
      >
    >();

  const { type } = params;

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-0.5}
        style={[props.style]}
      />
    ),
    [],
  );

  return (
    <View>
      <Container>
        <TopBar text={'Add new method'} backArrow={true} />
        <Divider height={responsiveWidth(20)} />
        {type === 'tether' ? (
          <TetherMethodContext bottomSheetRef={bottomSheetRef} />
        ) : (
          <></>
        )}
      </Container>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['50%']}
        animateOnMount
        backdropComponent={renderBackdrop}
      >
        <View style={styles.confirmEmailContainer}>
          <Divider height={responsiveWidth(20)} />
          <CustomText
            lineHeight={responsiveWidth(27)}
            fontSize={responsiveWidth(18)}
            color={'#191919'}
            style={styles.confirmEmailHeaderText}
          >
            Confirmation
          </CustomText>
          <Divider height={responsiveWidth(8)} />
          <CustomText
            lineHeight={responsiveWidth(19)}
            fontSize={responsiveWidth(14)}
            color={'#888888'}
            style={styles.confirmEmailDescriptionText}
          >
            Fill in the code sent to your e-mail account
          </CustomText>
          <Divider height={responsiveWidth(12)} />
          <NewCustomInput
            isInBottomSheet
            initialValue=""
            onValueChanged={() => {}}
            isAutoFocus
          />
          <Divider height={12} />
          <CustomButton
            title={'CONFIRM'}
            onPress={() => {}}
            style={{
              ...styles.confirmEmailButton,
            }}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  confirmButton: {
    marginTop: responsiveWidth(12),
    height: responsiveWidth(43),
    borderRadius: responsiveWidth(8),
    backgroundColor: '#D9C28D',
  },
  confirmEmailContainer: { flex: 1, padding: responsiveWidth(20) },
  confirmEmailHeaderText: { textTransform: 'uppercase', textAlign: 'center' },
  confirmEmailDescriptionText: { textAlign: 'center' },
  confirmEmailButton: {
    height: responsiveWidth(43),
    borderRadius: responsiveWidth(8),
    backgroundColor: '#D9C28D',
  },
});

export default ReferalProgramWithDrawAddNewMethod;
