/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import MaskedView from '@react-native-community/masked-view';
import { View } from 'react-native';

const MaskedHeaderTitle: React.FC = ({ children }) => {
  return (
    <MaskedView
      style={{
        width: '100%',
        flexDirection: 'row',
        height: '100%',
      }}
      maskElement={
        <View
          style={{
            backgroundColor: 'transparent',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {children}
        </View>
      }
    >
      <View style={{ flexDirection: 'column', flex: 1, height: '100%' }}>
        <View style={{ flex: 1, height: '100%', backgroundColor: '#ffffff' }} />
        <View
          style={{ flex: 1, height: '100%', backgroundColor: '#ffffffb5' }}
        />
        <View
          style={{ flex: 1, height: '100%', backgroundColor: '#ffffff9b' }}
        />
      </View>
    </MaskedView>
  );
};

export default MaskedHeaderTitle;
