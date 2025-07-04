/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, FlatList } from 'react-native';
import SearchItem from './SearchItem';
import { responsiveWidth } from '../common/utils';
import SearchIcon from '../assets/img/icons/search.svg';
import { useFocusEffect } from '@react-navigation/native';
import store from 'store';
import { observer } from 'mobx-react';
import { T_KEYS } from 'assets/translations';
import useOwnTranslation from 'hooks/useOwnTranslation';
import { useKeyboard } from 'hooks/useKeyboard';
import { useTheme } from '@rneui/themed';
import { CustomizationColors } from 'styles/customization';

const Search = () => {
  const [state, setState] = useState({ search: '' });

  const t = useOwnTranslation;

  const { keyboardShown } = useKeyboard();
  const { theme } = useTheme();
  const filterList = () => {
    return store.pastorsStore.pastors.filter(listItem =>
      listItem.name.en.toLowerCase().includes(state.search.toLocaleLowerCase()),
    );
  };

  useFocusEffect(
    useCallback(() => {
      store.pastorsStore.fetchPastors();
    }, []),
  );

  useEffect(() => {}, [store.pastorsStore.pastors]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.searchSection}>
        <SearchIcon
          style={styles.searchIcon}
          width={responsiveWidth(16)}
          height={responsiveWidth(16)}
        />
        <TextInput
          placeholder={t(T_KEYS.SEARCH_INPUT_PLACEHOLDER)}
          placeholderTextColor={theme.colors.textColorTertiary}
          onChangeText={search => setState({ search })}
          style={{ ...styles.input, color: theme.colors.textColorTertiary }}
        />
      </View>
      <FlatList
        contentContainerStyle={!keyboardShown && styles.scrollWrapper}
        data={filterList()}
        renderItem={({ item, index }) => (
          <SearchItem pastor={item} key={index} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: CustomizationColors.get('BLACK_SECONDARY'),
    borderRadius: responsiveWidth(12),
    marginBottom: responsiveWidth(32),
  },
  searchIcon: {
    marginLeft: responsiveWidth(16),
  },
  input: {
    flex: 1,
    fontFamily: 'NotoSans-Light',
    height: responsiveWidth(52),
    fontSize: responsiveWidth(15),
    lineHeight: responsiveWidth(20),
  },
  scrollWrapper: {
    paddingBottom: responsiveWidth(88),
  },
});

export default observer(Search);
