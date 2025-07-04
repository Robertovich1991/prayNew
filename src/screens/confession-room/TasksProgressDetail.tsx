import React from 'react';
import { FlatList, View } from 'react-native';
import { observer } from 'mobx-react';

import store from '../../store';

import { useLanguageBasedStructure as language } from '../../hooks';
import { responsiveWidth } from '../../common/utils';

import TopBar from '../../components/TopBar';
import Container from '../../components/Container';
import Divider from '../../components/Divider';
import TaskProgress from './widgets/TaskProgress';
import CurrentConfessionProgress from './widgets/CurrentConfessionProgress';
import { sinElements } from './sin-mocks/index';

const TasksProgressDetail = () => {
  const totalTasks = store.confessionsStore.getTotalTasks();
  const completedTasks = store.confessionsStore.getCompletedTasks();
  const activeConfessions = store.confessionsStore.getActiveConfessions();

  return (
    <Container>
      <FlatList
        nestedScrollEnabled
        ListHeaderComponent={() => (
          <>
            <TopBar text={'Tasks Progress'} backArrow={true} />
            <Divider height={responsiveWidth(20)} />
            <View>
              <TaskProgress
                totalTasks={totalTasks}
                completedTasks={completedTasks}
              />
            </View>
            <Divider height={responsiveWidth(12)} />
            <FlatList
              data={activeConfessions}
              renderItem={confession => {
                console.log({ confession });

                const {
                  completedTasks: completed,
                  totalTasks: total,
                  machineName,
                } = confession.item[1];

                const sinElement = sinElements.find(
                  x => x.machineName === machineName,
                );

                if (!sinElement) {
                  throw new Error('Sin element not found');
                }

                return (
                  <CurrentConfessionProgress
                    machineName={sinElement.machineName}
                    completedTasks={completed}
                    totalTasks={total}
                    title={language(sinElement.headerTitle)}
                    cardThumbnail={sinElement.cardImage}
                  />
                );
              }}
            />
          </>
        )}
        data={[]}
        renderItem={() => <></>}
      />
    </Container>
  );
};

export default observer(TasksProgressDetail);
