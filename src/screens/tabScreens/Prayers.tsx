/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import TopBar from '../../components/TopBar';
import { responsiveWidth } from '../../common/utils';
import BottomMenu from '../../components/BottomMenu';
import Container from '../../components/Container';
import PrayersItem from 'components/PrayersItem';
import { useFocusEffect } from '@react-navigation/native';
import store from 'store';
import { observer } from 'mobx-react';
import { T_KEYS } from 'assets/translations';
import useOwnTranslation from 'hooks/useOwnTranslation';

const Prayers = () => {
  const t = useOwnTranslation;

  useFocusEffect(
    useCallback(() => {
      store.prayersStore.fetchPrayers();
    }, []),
  );

  useEffect(() => {}, [store.prayersStore.prayers]);

  return (
    <View>
      <Container>
        <TopBar text={t(T_KEYS.PRAYERS_SCREEN_TITLE)} />
        <View style={styles.container}>
          <FlatList
            contentContainerStyle={styles.scrollWrapper}
            data={store.prayersStore.prayers}
            renderItem={({ item, index }) => (
              <PrayersItem key={index} prayer={item} />
            )}
          />
        </View>
      </Container>
      <BottomMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: responsiveWidth(61),
    flex: 1,
  },
  scrollWrapper: {
    paddingBottom: responsiveWidth(92),
  },
});

export default observer(Prayers);
