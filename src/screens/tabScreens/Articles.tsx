import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { responsiveWidth } from '../../common/utils';
import TopBar from '../../components/TopBar';
import ArticlesCard from '../../components/cards/ActiclesCard';
import BottomMenu from '../../components/BottomMenu';
import Container from '../../components/Container';
import CustomText from 'components/CustomText';
import { T_KEYS } from 'assets/translations';
import useOwnTranslation from 'hooks/useOwnTranslation';
import { useTheme } from '@rneui/themed';

const Articles = () => {
  const [activeTab, setActiveTab] = useState<'new' | 'saved'>('new');

  const t = useOwnTranslation;
  const { theme } = useTheme();
  return (
    <View>
      <Container>
        <TopBar text={t(T_KEYS.ARTICLES_SCREEN_TITLE)} />
        <View style={styles.wrapper}>
          <View style={styles.tabWrapper}>
            <TouchableOpacity
              onPress={() => {
                setActiveTab('new');
              }}
              style={
                activeTab === 'new'
                  ? {
                      ...styles.tab,
                      borderColor: theme.colors.textColorPrimary,
                    }
                  : {
                      ...styles.tab,
                      borderColor: theme.colors.blackPrimaryToWhite,
                    }
              }
            >
              <CustomText
                color={
                  activeTab === 'new'
                    ? theme.colors.textColorSecondary
                    : theme.colors.textColorTertiary
                }
              >
                {t(T_KEYS.ARTICLES_SCREEN_NEW)}
              </CustomText>
            </TouchableOpacity>
          </View>
          <View style={styles.tabWrapper}>
            <TouchableOpacity
              onPress={() => {
                setActiveTab('saved');
              }}
              style={
                activeTab === 'saved'
                  ? {
                      ...styles.tab,
                      borderColor: theme.colors.textColorPrimary,
                    }
                  : {
                      ...styles.tab,
                      borderColor: theme.colors.blackPrimaryToWhite,
                    }
              }
            >
              <CustomText
                color={
                  activeTab === 'saved'
                    ? theme.colors.textColorSecondary
                    : theme.colors.textColorTertiary
                }
              >
                {t(T_KEYS.ARTICLES_SCREEN_SAVED)}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
        <ArticlesCard activeTab={activeTab} />
      </Container>
      <BottomMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveWidth(39),
    marginBottom: responsiveWidth(40),
  },
  tabWrapper: {
    width: '50%',
  },
  tab: {
    borderBottomWidth: 2,
    alignItems: 'center',
    paddingBottom: responsiveWidth(8),
  },
});

export default Articles;
