import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import TopBar from '../../components/TopBar';
import Filter from '../../assets/img/icons/filter.svg';
import { responsiveWidth } from '../../common/utils';
import CustomFilter from '../../components/CustomFilter';
import WidgetMessage from 'components/messages/WidgetMessage';
import { T_KEYS } from 'assets/translations';
import useOwnTranslation from 'hooks/useOwnTranslation';
import store from 'store';
import { observer } from 'mobx-react';
import { useTheme } from '@rneui/themed';
import { CustomizationColors } from 'styles/customization';

const PrayerRequest = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState<Prayer>();

  const t = useOwnTranslation;
  const { theme } = useTheme();
  useEffect(() => {
    store.prayersStore.fetchPrayers();
    store.prayersStore.getRequests({});
  }, []);

  const filtersPhrase = t(T_KEYS.REQUEST_SCREEN_FILTERS);

  return (
    <View>
      <Container>
        <TopBar text={t(T_KEYS.REQUEST_SCREEN_TITLE)} backArrow={true} />
        <View style={styles.filterWrapper}>
          <TouchableOpacity
            onPress={() => {
              setShowFilter(true);
            }}
            style={styles.filter}
          >
            <CustomText
              color={
                filter
                  ? theme.colors.textColorPrimary
                  : theme.colors.textColorTertiary
              }
            >
              {filter ? store.commonStore.extract(filter.text) : filtersPhrase}
            </CustomText>
            <Filter
              color={theme.colors.textColorPrimary}
              width={responsiveWidth(20)}
              height={responsiveWidth(20)}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {store.prayersStore.requests
            .filter(x => (!filter ? true : x.prayerId === filter.id))
            .map(request => {
              const prayer = store.prayersStore.prayers.find(
                x => x.id === request.prayerId,
              );
              return (
                <WidgetMessage
                  key={request.id}
                  request={request}
                  prayer={prayer}
                />
              );
            })}
        </ScrollView>
      </Container>
      {showFilter && (
        <CustomFilter
          onPress={value => {
            setShowFilter(false);
            const prayer = store.prayersStore.prayers.find(
              x => x.id === +value,
            );
            setFilter(prayer);
          }}
          items={store.prayersStore.prayerNamesFromRequests}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(16),
    height: responsiveWidth(54),
    borderWidth: 1,
    borderColor: CustomizationColors.get('BLACK_SECONDARY'),
    borderRadius: responsiveWidth(14),
  },
  filterWrapper: {
    marginTop: responsiveWidth(40),
    marginBottom: responsiveWidth(24),
  },
});

export default observer(PrayerRequest);
