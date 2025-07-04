import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import Routes from '../../navigation/Routes';
import { ConfessionRoomNavigationProps } from '../../navigation/navigationProps';

import { responsiveWidth } from '../../common/utils';

import TopBar from '../../components/TopBar';
import Container from '../../components/Container';
import Divider from '../../components/Divider';

import SinTypeSelector from './widgets/SinTypeSelector';
import SinSearchForm from './widgets/SinSearchForm';
import SinCard from './widgets/SinCard';
import { filterSin } from './widgets/common';
import { sinElements } from './sin-mocks/index';

const CatalogOfSins = () => {
  const { params } =
    useRoute<
      RouteProp<
        ConfessionRoomNavigationProps,
        Routes.CONFESSION_ROOM_CATALOG_OF_SINS
      >
    >();
  const { sinSeverity } = params;

  const [searchQuery, setSearchQuery] = useState<string | undefined>();
  const [sinType, setSinType] = useState<SinType>('against-god');

  const onSearchFormValueChanged = (value: string) => {
    if (value === searchQuery) {
      return;
    }

    if (value.length === 0) {
      setSearchQuery(undefined);
    } else {
      setSearchQuery(value);
    }
  };

  const onSinTypeChanged = (type: SinType) => {
    setSinType(type);
  };

  return (
    <View>
      <Container>
        <TopBar text={'Catalog of sins'} backArrow={true} />
        <Divider height={responsiveWidth(20)} />
        <SinSearchForm
          initialValue=""
          onValueChanged={onSearchFormValueChanged}
        />
        <Divider height={responsiveWidth(12)} />
        <SinTypeSelector
          initialValue={sinType}
          onValueChanged={onSinTypeChanged}
        />
        <Divider height={responsiveWidth(12)} />
        <FlatList
          data={sinElements.filter(sin =>
            filterSin({ sin, sinType, sinSeverity, searchQuery }),
          )}
          renderItem={sin => (
            <SinCard
              elementDetail={{
                ...sin.item,
              }}
              key={sin.item.machineName}
            />
          )}
          ItemSeparatorComponent={() => <Divider height={responsiveWidth(8)} />}
          ListFooterComponent={() => <Divider height={responsiveWidth(40)} />}
        />
      </Container>
    </View>
  );
};

export default CatalogOfSins;
