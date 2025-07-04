import { responsiveWidth } from 'common/utils';
import { WINDOW_WIDTH } from 'helpers/dimensions';
import React from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

interface ICustomWebViewProps {
  videoUrl: string;
  youtubeLink: string;
}

const CustomWebView = (props: ICustomWebViewProps) => {
  return (
    <WebView
      allowsFullscreenVideo
      style={styles.videoWrapper}
      source={
        props.videoUrl
          ? {
              html: `
              <video 
              style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999; background-color:transparent;"
              controls>
                  <source src='${props.videoUrl}' type="video/mp4">
              </video>
              `,
            }
          : {
              uri: `https://www.youtube.com/embed/${props.youtubeLink}`,
            }
      }
    />
  );
};

const styles = StyleSheet.create({
  videoWrapper: {
    width: '100%',
    height: (WINDOW_WIDTH / 1920) * 1080,
    marginBottom: responsiveWidth(12),
    backgroundColor: '#191919',
  },
});

export default CustomWebView;
