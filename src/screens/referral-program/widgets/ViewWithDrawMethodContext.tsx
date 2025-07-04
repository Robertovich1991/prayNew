import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useBottomSheet, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Routes from '../../../navigation/Routes';
import * as CustomNavigationProps from '../../../navigation/navigationProps';

import { responsiveWidth } from '../../../common/utils';
import { generateUuid } from '../../../helpers/utils';

import Divider from '../../../components/Divider';
import CustomText from '../../../components/CustomText';

import WithDrawMethodsButton from './WithDrawMethodsButton';
import store from 'store/index';
import DialogModal from 'screens/modals/DialogModal';

type ContextButton = {
  id: string;
  title: string;
  onPressed: () => void;
};

const ViewWithDrawMethodContext: React.FC<{
  onReturnPress: () => void;
}> = props => {
  const { close } = useBottomSheet();

  const navigation =
    useNavigation<
      StackNavigationProp<CustomNavigationProps.WithDrawBonusWidget>
    >();

  const { onReturnPress } = props;

  const buttons: Array<ContextButton> = [
    {
      id: generateUuid(),
      title: 'Edit',
      onPressed: () => {
        close();
        navigation.navigate(Routes.REFERRAL_PROGRAM_WITH_DRAW_ADD_NEW_METHOD, {
          type: 'tether',
        });
      },
    },
    {
      id: generateUuid(),
      title: 'Remove',
      onPressed: () => {
        store.modalStore.open(
          <DialogModal
            title="Are you sure?"
            onConfirmAction={() => {
              close();
            }}
          />,
        );
      },
    },
  ];

  return (
    <>
      <View style={styles.container}>
        <CustomText
          numberOfLines={1}
          fontSize={responsiveWidth(18)}
          lineHeight={responsiveWidth(27)}
          color={'#191919'}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ textTransform: 'uppercase' }}
        >
          View "qU4e USDT20"
        </CustomText>
        <BottomSheetScrollView>
          <Divider height={responsiveWidth(12)} />
          <WithDrawMethodsButton
            type="return"
            title="Return"
            onButtonPress={onReturnPress}
          />
          {buttons.map(({ id, title, onPressed }) => (
            <View key={id}>
              <Divider height={responsiveWidth(12)} />
              <WithDrawMethodsButton title={title} onButtonPress={onPressed} />
            </View>
          ))}
        </BottomSheetScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: responsiveWidth(20),
    flex: 1,
  },
});

export default ViewWithDrawMethodContext;
