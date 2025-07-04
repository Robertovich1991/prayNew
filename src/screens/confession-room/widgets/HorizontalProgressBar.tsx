import React from 'react';
import { View, StyleSheet } from 'react-native';

import { responsiveWidth } from '../../../common/utils';

const HorizontalProgressBar: React.FC<{ progress: number }> = props => {
  let width = '0%';

  if (
    !Number.isNaN(props.progress) &&
    props.progress <= 100 &&
    props.progress >= 0
  ) {
    width = props.progress + '%';
  }

  return (
    <View style={barStyles.container}>
      <View
        style={{
          ...barStyles.bar,
          width,
          ...(props.progress >= 100 && { backgroundColor: '#22C55E' }),
        }}
      />
    </View>
  );
};

const barStyles = StyleSheet.create({
  container: {
    height: responsiveWidth(4),
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#F3F3F3',
    borderRadius: responsiveWidth(2),
  },
  bar: {
    height: '100%',
    backgroundColor: '#D9C28D',
    borderRadius: responsiveWidth(2),
  },
});

export default HorizontalProgressBar;
