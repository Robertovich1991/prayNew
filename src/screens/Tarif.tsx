/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomSlider from '../components/CustomSlider';
import TopBar from '../components/TopBar';
import { responsiveWidth } from '../common/utils';
import Container from '../components/Container';
import PlayfairTitle from '../components/PlayfairTitle';
import { T_KEYS } from 'assets/translations';
import useOwnTranslation from 'hooks/useOwnTranslation';

const Tarif = () => {
  const t = useOwnTranslation;

  return (
    <Container>
      <TopBar backArrow={true} />
      <View style={styles.titleWrapper}>
        <PlayfairTitle>{t(T_KEYS.TARIF_SCREEN_PLAYFAIR)}</PlayfairTitle>
      </View>
      <View style={styles.sliderWrapper}>
        <CustomSlider />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  titleWrapper: {
    marginVertical: responsiveWidth(10),
  },
  sliderWrapper: {
    flex: 1,
  },
});

export default Tarif;
