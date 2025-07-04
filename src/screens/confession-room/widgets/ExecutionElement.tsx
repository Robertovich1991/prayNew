import React from 'react';
import { View, StyleSheet } from 'react-native';

import { responsiveWidth } from '../../../common/utils';

import CustomText from '../../../components/CustomText';

const ExecutionElement: React.FC<{ title: string; value: string }> = React.memo(
  ({ title, value }) => {
    return (
      <View style={styles.executionElementRow}>
        <View>
          <CustomText
            color={'#FFF'}
            style={styles.textUpperCase}
            numberOfLines={1}
          >
            {title}
          </CustomText>
        </View>
        <CustomText
          fontSize={responsiveWidth(12)}
          color="#D9C28D"
          style={styles.executionElementValue}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {value}
        </CustomText>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  executionElementRow: {
    borderRadius: responsiveWidth(12),
    borderColor: '#232323',
    borderWidth: responsiveWidth(1),
    height: responsiveWidth(44),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(12),
  },
  textUpperCase: { textTransform: 'uppercase' },
  executionElementValue: { textTransform: 'uppercase', maxWidth: '40%' },
});

export default ExecutionElement;
