/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { observer } from 'mobx-react';
import store from 'store';
import ArticlesItem from 'components/ArticlesItem';
import { responsiveWidth } from 'common/utils';

interface ActiclesCardProps {
  activeTab: 'new' | 'saved';
}

const ArticlesCard = ({ activeTab }: ActiclesCardProps) => {
  useFocusEffect(
    useCallback(() => {
      store.articlesStore.fetchArticles();
    }, []),
  );

  const articlesData = useMemo(() => {
    return store.articlesStore.articles.filter(x =>
      activeTab === 'saved' ? store.articlesStore.saved.includes(x.id) : true,
    );
  }, [, activeTab, store.articlesStore.articles, store.articlesStore.saved]);

  return (
    <FlatList
      contentContainerStyle={styles.paddingBottom}
      data={articlesData}
      renderItem={({ item, index }) => (
        <ArticlesItem
          article={item}
          key={index}
          isSaved={store.articlesStore.saved.includes(item.id)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  paddingBottom: {
    paddingBottom: responsiveWidth(92),
  },
});

export default observer(ArticlesCard);
