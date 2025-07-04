import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { responsiveWidth } from '../../../common/utils';
import { generateUuid } from '../../../helpers/utils';

import CustomText from '../../../components/CustomText';
import Divider from '../../../components/Divider';

import WithDrawMethodsButton from './WithDrawMethodsButton';
import { extractFilterStateTitle } from './common';

type FilterStateMethod = {
  id: string;
  title: string;
  onPressed: () => void;
};

const ReferralsFilterWidget: React.FC<{
  onFilterStateChanged: (filterState: FilterState) => void;
}> = props => {
  const { onFilterStateChanged } = props;

  const states: Array<FilterState> = [
    'this-month',
    'last-month',
    'in-three-months',
    'over-the-year',
    'all',
  ];

  const filterStates: Array<FilterStateMethod> = states.map(state => ({
    id: generateUuid(),
    title: extractFilterStateTitle(state),
    onPressed: () => {
      onFilterStateChanged(state);
    },
  }));

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
          Filtering by time
        </CustomText>
        <BottomSheetScrollView>
          <Divider height={responsiveWidth(12)} />
          {filterStates.map(({ id, title, onPressed }) => (
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

export default ReferralsFilterWidget;
