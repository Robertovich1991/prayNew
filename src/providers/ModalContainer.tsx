import React from 'react';
import { StyleSheet, View } from 'react-native';

export default ({ children, close }: { children: any; close: any }) => {
  const childrenWithProps = React.Children.map(children, child => {
    const props = { close };
    if (React.isValidElement(child)) {
      return (
        <View onTouchEnd={event => event.stopPropagation()}>
          {React.cloneElement(child, props)}
        </View>
      );
    }
  });

  return (
    <View onTouchEnd={e => e.stopPropagation()} style={styles.modalContainer}>
      {childrenWithProps}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0e0e0e80',
    width: '100%',
    height: '100%',
  },
});
