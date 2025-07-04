import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { responsiveWidth } from '../../../common/utils';

import * as Assets from '../../../assets';

import CustomText from '../../../components/CustomText';
import Divider from '../../../components/Divider';

const RedemptionListButton: React.FC<{
  title: string;
  onPress: () => void;
}> = props => {
  const { onPress, title } = props;

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.wrapper}>
          <CustomText
            fontSize={responsiveWidth(12)}
            lineHeight={responsiveWidth(16)}
            color="#FFF"
            style={styles.text}
          >
            {title}
          </CustomText>
          <Assets.Icons.ForwardArrow
            // fill="#FFF"
            color="#FFF"
            width={responsiveWidth(12)}
            height={responsiveWidth(12)}
          />
        </View>
      </TouchableOpacity>
      <Divider height={responsiveWidth(8)} />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: responsiveWidth(12),
    borderRadius: responsiveWidth(12),
    borderColor: '#232323',
    borderWidth: responsiveWidth(1),
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    flex: 1,
    textTransform: 'uppercase',
  },
});

export default RedemptionListButton;
