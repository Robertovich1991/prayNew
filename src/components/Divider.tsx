import React from 'react';
import { View } from 'react-native';

const Divider: React.FC<{ height: number }> = props => {
  // eslint-disable-next-line react-native/no-inline-styles
  return <View style={{ width: '100%', height: props.height }} />;
};

export default Divider;
