import React from 'react';
import { View, StyleSheet } from 'react-native';

import { responsiveWidth } from '../../../common/utils';

import CustomText from '../../../components/CustomText';
import Divider from '../../../components/Divider';

const RedemptionContentElement: React.FC<{ title: string }> = React.memo(
  ({ children, title }) => {
    return (
      <View style={styles.contentRowWrapper}>
        <CustomText
          fontSize={responsiveWidth(15)}
          lineHeight={responsiveWidth(20)}
          fontWeight="bold"
          color="#FFF"
        >
          {title}
        </CustomText>
        <Divider height={responsiveWidth(20)} />
        {children}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  contentRowWrapper: {
    padding: responsiveWidth(12),
    borderRadius: responsiveWidth(12),
    backgroundColor: '#000',
  },
});

export default RedemptionContentElement;
