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

type WithDrawMethod = {
  id: string;
  type: 'tether' | 'visa';
  title: string;
  onPressed: () => void;
};

const WithDrawMethodsAddNewMethod: React.FC<{
  onReturnPress: () => void;
}> = props => {
  const { close } = useBottomSheet();

  const navigation =
    useNavigation<
      StackNavigationProp<CustomNavigationProps.WithDrawBonusWidget>
    >();

  const { onReturnPress } = props;

  const withDrawMethods: Array<WithDrawMethod> = [
    {
      id: generateUuid(),
      type: 'tether',
      title: 'USDT',
      onPressed: () => {
        close();
        navigation.navigate(Routes.REFERRAL_PROGRAM_WITH_DRAW_ADD_NEW_METHOD, {
          type: 'tether',
        });
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
          Add new method
        </CustomText>
        <BottomSheetScrollView>
          <Divider height={responsiveWidth(12)} />
          <WithDrawMethodsButton
            type="return"
            title="Return"
            onButtonPress={onReturnPress}
          />
          {withDrawMethods.map(({ id, title, type, onPressed }) => (
            <View key={id}>
              <Divider height={responsiveWidth(12)} />
              <WithDrawMethodsButton
                type={type}
                title={title}
                onButtonPress={onPressed}
              />
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

export default WithDrawMethodsAddNewMethod;
