import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'react-native';
import Video from 'react-native-video';
import { useTheme } from '@rneui/themed';

import { responsiveWidth } from '../../../common/utils';
import {
  ANDROID_STATUSBAR,
  SCREEN_HEIGHT,
  WINDOW_WIDTH,
} from '../../../helpers/dimensions';

import * as Assets from '../../../assets';

import Divider from '../../../components/Divider';
import Spinner from '../../../components/Spinner';
import TopBar from '../../../components/TopBar';

type CustomVideoBackgroundProps = {
  assetSource: SinCardVideoKey;
};

const extractVideo = (assetSource: SinCardVideoKey) => {
  switch (assetSource) {
    case 'Candle1': {
      return Assets.SinCardVideos.Candle1;
    }
    case 'Candle2': {
      return Assets.SinCardVideos.Candle2;
    }
    case 'Columns1': {
      return Assets.SinCardVideos.Columns1;
    }
    case 'Bubbles': {
      return Assets.SinCardVideos.Bubbles;
    }
    case 'Candles': {
      return Assets.SinCardVideos.Candles;
    }
    case 'Face': {
      return Assets.SinCardVideos.Face;
    }
    case 'Geometry': {
      return Assets.SinCardVideos.Geometry;
    }
    case 'Mozaika1': {
      return Assets.SinCardVideos.Mozaika1;
    }
    case 'Sparkles': {
      return Assets.SinCardVideos.Sparkles;
    }
    default: {
      return Assets.SinCardVideos.Mozaika1;
    }
  }
};

const CustomVideoBackground: React.FC<CustomVideoBackgroundProps> = props => {
  const source = extractVideo(props.assetSource);

  const { theme } = useTheme();

  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    return () => {
      StatusBar.setBarStyle(
        theme.mode === 'light' ? 'dark-content' : 'light-content',
      );
    };
  }, [theme.mode]);

  return (
    <View style={styles.fullContainer}>
      <Video
        resizeMode="cover"
        muted={true}
        repeat
        source={source}
        style={styles.backgroundVideo}
        onLoad={() => {
          setTimeout(() => {
            setIsHidden(false);
          }, 120);
        }}
      />

      <View style={styles.content}>
        <Divider height={ANDROID_STATUSBAR + responsiveWidth(27)} />
        <TopBar backArrow={true} backArrowColor={'#FFF'} />
        <Divider height={responsiveWidth(20)} />
        <ScrollView>{props.children}</ScrollView>
      </View>
      {isHidden && (
        <View style={styles.hideContainer}>
          <Spinner />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fullContainer: {
    width: WINDOW_WIDTH,
    height: SCREEN_HEIGHT,
  },
  content: {
    paddingHorizontal: responsiveWidth(20),
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: WINDOW_WIDTH,
    height: SCREEN_HEIGHT,
  },
  titleContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  titleText: {
    textAlign: 'left',
    opacity: 0.8,
    color: '#FFF',
    width: '100%',
    fontFamily: 'PlayfairDisplay-SemiBold',
  },
  hideContainer: {
    width: WINDOW_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: '#191919',
    opacity: 0.9,
  },
  elementRowWrapper: {
    backgroundColor: 'black',
    borderRadius: responsiveWidth(12),
    padding: responsiveWidth(12),
  },
  redeemingSuperstition: {
    height: responsiveWidth(64),
    backgroundColor: '#000',
    borderRadius: responsiveWidth(12),
  },
  videoWrapper: {
    height: responsiveWidth(184),
    backgroundColor: '#000',
    borderRadius: responsiveWidth(12),
  },
  additionalLinksWrapper: {
    height: responsiveWidth(152),
    backgroundColor: '#000',
    borderRadius: responsiveWidth(12),
  },
});

export default CustomVideoBackground;
