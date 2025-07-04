import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { responsiveWidth } from '../../../common/utils';

import * as Assets from '../../../assets';

import { WINDOW_WIDTH } from '../../../helpers/dimensions';

const RedemptionListImage: React.FC<{
  onPress: () => void;
  isInProgress: boolean;
}> = props => {
  const { onPress, isInProgress } = props;
  return (
    <View style={styles.wrapper}>
      <Image
        source={Assets.RedemptionBackgrounds.DefaultConfessionVideoButton}
        resizeMode="cover"
        style={styles.imageContent}
      />
      {isInProgress && (
        <View style={styles.overridedContainer}>
          <TouchableOpacity onPress={onPress}>
            <View style={styles.closeButton}>
              <Assets.Icons.ClosingCross
                color="#FFF"
                fill="#FFF"
                width={responsiveWidth(13)}
                height={responsiveWidth(13)}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: WINDOW_WIDTH / 2 - responsiveWidth(26),
    height: WINDOW_WIDTH / 2 - responsiveWidth(26),
    borderRadius: responsiveWidth(10),
    marginBottom: responsiveWidth(12),
  },
  imageContent: {
    width: '100%',
    height: '100%',
    borderRadius: responsiveWidth(10),
  },
  overridedContainer: {
    position: 'absolute',
    width: WINDOW_WIDTH / 2 - responsiveWidth(26),
    height: WINDOW_WIDTH / 2 - responsiveWidth(26),
    borderRadius: responsiveWidth(10),
    padding: responsiveWidth(8),
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  closeButton: {
    width: responsiveWidth(44),
    height: responsiveWidth(44),

    backgroundColor: '#191919',
    borderRadius: responsiveWidth(12),
    borderColor: '#232323',
    borderWidth: responsiveWidth(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RedemptionListImage;
