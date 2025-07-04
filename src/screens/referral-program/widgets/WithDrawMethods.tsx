import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { responsiveWidth } from '../../../common/utils';
import { generateUuid } from '../../../helpers/utils';

import CustomText from '../../../components/CustomText';
import Divider from '../../../components/Divider';

import WithDrawMethodsButton from './WithDrawMethodsButton';
import WithDrawMethodsAddNewMethod from './WithDrawMethodsAddNewMethod';
import ViewWithDrawMethodContext from './ViewWithDrawMethodContext';

type WithDrawMethodType = 'tether' | 'visa';

type WithDrawMethod = {
  id: string;
  type: WithDrawMethodType;
  title: string;
  onPressed: () => void;
};

const WithDrawMethods: React.FC = () => {
  const [context, setContext] = useState<
    'default' | 'add-new-method' | 'view-withdraw-method'
  >('default');

  const onAddNewMethodPressed = () => {
    setContext('add-new-method');
  };

  const onReturnPressed = () => {
    setContext('default');
  };

  const withDrawMethods: Array<WithDrawMethod> = [
    {
      id: generateUuid(),
      type: 'tether',
      title: 'qU4e USDT20',
      onPressed: () => setContext('view-withdraw-method'),
    },
  ];

  return (
    <>
      {context === 'default' && (
        <View style={styles.container}>
          <CustomText
            numberOfLines={1}
            fontSize={responsiveWidth(18)}
            lineHeight={responsiveWidth(27)}
            color={'#191919'}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ textTransform: 'uppercase' }}
          >
            Withdraw methods
          </CustomText>
          <BottomSheetScrollView>
            <Divider height={responsiveWidth(12)} />
            <WithDrawMethodsButton
              type="add-new-method"
              title="Add new method"
              onButtonPress={onAddNewMethodPressed}
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
      )}
      {context === 'add-new-method' && (
        <WithDrawMethodsAddNewMethod onReturnPress={onReturnPressed} />
      )}
      {context === 'view-withdraw-method' && (
        <ViewWithDrawMethodContext onReturnPress={onReturnPressed} />
      )}
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

export default WithDrawMethods;
