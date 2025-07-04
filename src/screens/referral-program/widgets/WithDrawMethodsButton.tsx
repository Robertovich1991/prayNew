import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { responsiveWidth } from '../../../common/utils';

import * as Assets from '../../../assets/index';

import CustomText from '../../../components/CustomText';

const WithDrawMethodsButton: React.FC<{
  onButtonPress: () => void;
  title: string;
  type?: 'add-new-method' | 'return' | 'tether' | 'visa';
}> = props => {
  const { onButtonPress, title, type } = props;

  const renderTypeIcon = useMemo(() => {
    switch (type) {
      case 'add-new-method': {
        return (
          <Assets.Icons.Plus
            fill={'#191919'}
            width={responsiveWidth(11.67)}
            height={responsiveWidth(11.67)}
          />
        );
      }

      case 'tether': {
        return (
          <Assets.Icons.TetherLogo
            fill={'#D9C28D'}
            width={responsiveWidth(16.67)}
            height={responsiveWidth(16.67)}
          />
        );
      }

      case 'return': {
        return (
          <Assets.Icons.ForwardArrow
            color={'#191919'}
            height={responsiveWidth(14)}
            width={responsiveWidth(14)}
            rotation={180}
          />
        );
      }

      default: {
        return (
          <View
            style={{ height: responsiveWidth(14), width: responsiveWidth(14) }}
          />
        );
      }
    }
  }, [type]);

  return (
    <TouchableOpacity onPress={onButtonPress}>
      <View style={styles.buttonWrapper}>
        {type && <View style={styles.buttonIconWrapper}>{renderTypeIcon}</View>}
        <CustomText
          numberOfLines={1}
          fontSize={responsiveWidth(15)}
          lineHeight={responsiveWidth(20)}
          color={'#191919'}
          style={styles.buttonTitle}
        >
          {title}
        </CustomText>
        {type !== 'return' && (
          <View style={styles.buttonIconWrapper}>
            <Assets.Icons.ForwardArrow
              color={'#191919'}
              height={responsiveWidth(14)}
              width={responsiveWidth(14)}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: responsiveWidth(12),
    height: responsiveWidth(44),
    backgroundColor: '#F3F3F3',
    paddingLeft: responsiveWidth(12),
  },
  buttonIconWrapper: {
    width: responsiveWidth(32),
    alignItems: 'center',
  },
  buttonTitle: {
    textAlign: 'left',
    flex: 1,
  },
});

export default WithDrawMethodsButton;
