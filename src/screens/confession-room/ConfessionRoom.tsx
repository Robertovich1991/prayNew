import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';

import store from '../../store';

import Routes from '../../navigation/Routes';
import { ConfessionRoomNavigationProps } from '../../navigation/navigationProps';

import { responsiveWidth } from '../../common/utils';

import TopBar from '../../components/TopBar';
import Container from '../../components/Container';
import Divider from '../../components/Divider';
import PlayfairTitle from 'components/PlayfairTitle';
import SinButton from './widgets/SinButton';
import TaskProgress from './widgets/TaskProgress';

const ConfessionRoom = () => {
  const navigation =
    useNavigation<StackNavigationProp<ConfessionRoomNavigationProps>>();

  const onSinButtonPressed = (sinSeverity: SinSeverity) => {
    navigation.navigate(Routes.CONFESSION_ROOM_CATALOG_OF_SINS, {
      sinSeverity,
    });
  };

  const totalTasks = store.confessionsStore.getTotalTasks();
  const completedTasks = store.confessionsStore.getCompletedTasks();

  return (
    <Container>
      <TopBar text={'Confession room'} backArrow={true} />
      <Divider height={responsiveWidth(20)} />
      <ScrollView>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              Routes.CONFESSION_ROOM_TASKS_PROGRESS_DETAIL,
              {},
            )
          }
        >
          <TaskProgress
            totalTasks={totalTasks}
            completedTasks={completedTasks}
          />
        </TouchableOpacity>
        <Divider height={responsiveWidth(24)} />
        <PlayfairTitle style={styles.catalogHeader}>
          Catalog of Sins
        </PlayfairTitle>

        <Divider height={responsiveWidth(12)} />
        <View style={styles.wrapper}>
          <View style={styles.row}>
            <SinButton
              title="Light sins"
              crossColor="#E2E2E2"
              onPressed={() => onSinButtonPressed('light')}
            />
            <View style={{ width: responsiveWidth(11) }} />
            <SinButton
              title="Medium sins"
              crossColor="#CDB587"
              onPressed={() => onSinButtonPressed('medium')}
            />
          </View>
          <Divider height={responsiveWidth(12)} />
          <SinButton
            title="Grave sins"
            crossColor="#222"
            onPressed={() => onSinButtonPressed('grave')}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  catalogHeader: { textAlign: 'left' },
  wrapper: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default observer(ConfessionRoom);
