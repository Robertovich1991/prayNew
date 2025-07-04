import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';

import { responsiveWidth } from '../../../common/utils';

import CustomText from '../../../components/CustomText';
import Divider from '../../../components/Divider';

import ProgressBarWithChristCross from './ProgressBarWithChristCross';

const TaskProgress: React.FC<{
  totalTasks: number;
  completedTasks: number;
}> = props => {
  const { totalTasks, completedTasks } = props;

  const { theme } = useTheme();

  if (totalTasks === 0) {
    return <></>;
  }

  const progress = (completedTasks / totalTasks) * 100;

  return (
    <View
      style={{
        ...styles.container,
        borderColor: theme.colors.backgroundSecondary,
        backgroundColor: theme.colors.backgroundPrimary,
      }}
    >
      <View style={styles.wrapper}>
        <CustomText
          lineHeight={responsiveWidth(16)}
          fontSize={responsiveWidth(12)}
          color={theme.colors.textColorTertiary}
        >
          Tasks progress
        </CustomText>
        <Divider height={responsiveWidth(4)} />
        <CustomText
          lineHeight={responsiveWidth(33)}
          fontSize={responsiveWidth(24)}
          fontWeight="bold"
        >
          {`${completedTasks}/${totalTasks} Tasks`}
        </CustomText>
        <Divider height={responsiveWidth(4)} />
        <CustomText
          lineHeight={responsiveWidth(16)}
          fontSize={responsiveWidth(12)}
        >
          You are making great progress. Stay focused!
        </CustomText>
      </View>
      <View style={styles.crossProgressBarWrapper}>
        <ProgressBarWithChristCross progress={progress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: responsiveWidth(14),
    borderWidth: responsiveWidth(2),
    padding: responsiveWidth(16),
    flex: 1,
    flexDirection: 'row',
  },
  wrapper: { flex: 1 },
  crossProgressBarWrapper: {
    width: responsiveWidth(76),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TaskProgress;
