import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onVideoComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onVideoComplete }) => {
  const [videoEnded, setVideoEnded] = useState(false);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    // Small delay to ensure smooth transition
    setTimeout(() => {
      onVideoComplete();
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/img/cross.mp4')}
        style={styles.video}
        resizeMode="contain"
        onEnd={handleVideoEnd}
        onError={(error) => {
          console.log('Video error:', error);
          // If video fails to load, proceed to main app
          onVideoComplete();
        }}
        repeat={false}
        muted={false}
        controls={false}
        playInBackground={false}
        playWhenInactive={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: width,
    height: height,
  },
});

export default SplashScreen;
