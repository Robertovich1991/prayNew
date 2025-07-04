import React, { useMemo, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import Video from 'react-native-video-controls';

import {
  ANDROID_STATUSBAR,
  WINDOW_HEIGHT,
  SCREEN_HEIGHT,
  WINDOW_WIDTH,
} from '../../../helpers/dimensions';
import { responsiveWidth } from '../../../common/utils';

import * as Assets from '../../../assets';

import store from '../../../store';

const AdditionalVideo: React.FC<{
  videoUrl?: string;
  videoPreview?: string;
}> = props => {
  const { videoUrl, videoPreview } = props;

  const videoPlayerRef = useRef<Video>(null);

  const previewSource: ImageSourcePropType = useMemo(() => {
    if (videoPreview) {
      return { uri: videoPreview };
    } else {
      return Assets.RedemptionBackgrounds.DefaultConfessionVideoButton;
    }
  }, [videoPreview]);

  if (!videoUrl) {
    return <></>;
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.videoStartButton}
        onPress={() => {
          store.modalStore.open(
            <View style={styles.videoWrapper}>
              <Video
                source={{ uri: videoUrl }}
                resizeMode="cover"
                ref={videoPlayerRef}
                disableSeekbar
                disableFullscreen
                onBack={() => store.modalStore.close()}
              />
            </View>,
          );
        }}
      >
        <Image
          resizeMode="cover"
          source={previewSource}
          style={styles.backgroundImage}
        />
        <View style={styles.playIcon}>
          <Assets.Icons.PlayTriangle
            fill="#FFF"
            width={responsiveWidth(11.5)}
            height={responsiveWidth(13.3)}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: responsiveWidth(12),
    borderRadius: responsiveWidth(12),
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoWrapper: {
    height: SCREEN_HEIGHT,
    width: WINDOW_WIDTH,
    paddingTop: ANDROID_STATUSBAR,
    paddingHorizontal: responsiveWidth(8),
    paddingBottom: responsiveWidth(8),
    backgroundColor: '#000000',
  },
  video: {
    height: WINDOW_HEIGHT,
    width: WINDOW_WIDTH,
  },
  backgroundImage: {
    width: '100%',
    height: responsiveWidth(152),
    position: 'absolute',
    borderRadius: responsiveWidth(8),
  },

  videoStartButton: {
    height: responsiveWidth(152),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    backgroundColor: '#232323',
    width: responsiveWidth(44),
    height: responsiveWidth(44),
    borderRadius: responsiveWidth(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AdditionalVideo;
