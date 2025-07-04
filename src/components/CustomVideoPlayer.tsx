import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { responsiveWidth } from 'common/utils';
import Routes from 'navigation/Routes';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import Video from 'react-native-video-controls';
import VideoPlayer from 'react-native-video-controls';
import GetFirstWeekForFreeModalModal from 'screens/modals/GetFirstWeekForFreeModal';
import NotBlessedCardModal from 'screens/modals/NotBlessedCardModal';
import store from 'store';

interface ICustomVideoPlayer {
  videoUrl: string;
}

const CustomVideoPlayer = (props: ICustomVideoPlayer) => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [paused, setPaused] = useState(true);
  const ref = useRef<Video>(null);

  const navigation =
    useNavigation<StackNavigationProp<{ [Routes.TARIF_SCREEN]: undefined }>>();

  useEffect(() => {
    if (currentTime >= 11) {
      setPaused(true);
      if (store.userStore.isUserNew) {
        store.modalStore.open(
          <GetFirstWeekForFreeModalModal
            closeAction={() => {
              ref.current?.player.ref.seek(0);
            }}
            onBecomeBlessedClick={() => {
              navigation.navigate(Routes.TARIF_SCREEN);
              store.modalStore.close();
            }}
          />,
        );
      } else {
        store.modalStore.open(
          <NotBlessedCardModal
            buttonAction={() => {
              navigation.navigate(Routes.TARIF_SCREEN);
              store.modalStore.close();
            }}
          />,
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime]);

  return (
    <VideoPlayer
      disableFullscreen
      disableVolume
      ref={ref}
      disableBack
      controlTimeout={999999}
      onPlay={() => {
        setPaused(false);
      }}
      paused={paused}
      onProgress={data => {
        setCurrentTime(data.currentTime);
      }}
      style={styles.video}
      source={{ uri: props.videoUrl }}
    />
  );
};

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: responsiveWidth(180),
  },
});

export default CustomVideoPlayer;
