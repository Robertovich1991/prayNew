/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import TopBar from '../components/TopBar';
import { ScrollView } from 'react-native';
import { responsiveWidth, useCndUrl } from '../common/utils';
import CustomLine from '../components/CustomLine';
import CustomText from '../components/CustomText';
import PlayfairTitle from '../components/PlayfairTitle';
import PastorGradient from '../assets/img/pastorGradient.png';
import PastorWhiteGradient from '../assets/img/pastorWhiteGradient.png';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import store from 'store';
import useOwnTranslation from 'hooks/useOwnTranslation';
import CustomWebView from 'components/CustomWebView';
import { useTheme } from '@rneui/themed';

const PastorsInfo = () => {
  const { params } = useRoute<any>();
  const [pastor, setPastor] = useState<Pastor>();
  const { theme } = useTheme();
  const itemImg = useCndUrl(
    pastor?.titleImageUrl ? pastor?.titleImageUrl : pastor?.avatarImageUrl,
  );

  const t = useOwnTranslation;

  useFocusEffect(
    useCallback(() => {
      const targetPastor = store.pastorsStore.pastors.find(
        x => x.id === params?.pastorId,
      );
      if (targetPastor) {
        console.log('targetPastor', targetPastor);
        setPastor(targetPastor);
      }
    }, []),
  );

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.backgroundPrimary,
      }}
    >
      <View style={styles.topBar}>
        <TopBar backArrow={true} />
      </View>
      <ScrollView>
        <View style={styles.photoWrapper}>
          <Image style={styles.photo} source={{ uri: itemImg }} />
          <Image
            style={styles.gradient}
            source={
              theme.mode === 'dark' ? PastorGradient : PastorWhiteGradient
            }
          />
          <View style={styles.nameWrapper}>
            <PlayfairTitle>{t(pastor?.name || 'UNKNOWN_VALUE')}</PlayfairTitle>
          </View>
        </View>
        <View style={styles.wrapper}>
          <CustomLine />
          <CustomText
            fontWeight="light"
            lineHeight={responsiveWidth(22)}
            color={theme.colors.textColorSecondary}
            style={styles.text}
          >
            {t(pastor?.teaser || 'UNKNOWN_VALUE')}
          </CustomText>
        </View>
        {pastor?.videoUrl || pastor?.youtubeLink ? (
          <CustomWebView
            videoUrl={pastor.videoUrl}
            youtubeLink={pastor.youtubeLink}
          />
        ) : (
          <></>
        )}
        <View style={styles.wrapper}>
          <CustomText
            fontSize={responsiveWidth(12)}
            lineHeight={responsiveWidth(17)}
            style={styles.videoSubtitle}
          >
            {t(pastor?.videoTitle || 'UNKNOWN_VALUE')}
          </CustomText>
          <CustomLine />
          <CustomText
            fontWeight="light"
            lineHeight={responsiveWidth(22)}
            color={theme.colors.textColorSecondary}
            style={styles.text}
          >
            {t(pastor?.text || 'UNKNOWN_VALUE')}
          </CustomText>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  topBar: {
    paddingTop: responsiveWidth(71),
    paddingLeft: responsiveWidth(20),
    position: 'absolute',
    zIndex: 2,
  },
  photoWrapper: {
    marginBottom: responsiveWidth(45),
  },
  photo: {
    width: '100%',
    height: responsiveWidth(340),
  },
  gradient: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  nameWrapper: {
    position: 'absolute',
    bottom: responsiveWidth(-15),
    width: '100%',
    alignItems: 'center',
  },
  wrapper: {
    paddingHorizontal: responsiveWidth(20),
  },
  text: {
    marginTop: responsiveWidth(32),
    paddingBottom: responsiveWidth(36),
  },
  videoSubtitle: {
    marginBottom: responsiveWidth(8),
  },
});

export default PastorsInfo;
