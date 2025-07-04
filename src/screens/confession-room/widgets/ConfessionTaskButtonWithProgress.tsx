import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { responsiveWidth } from '../../../common/utils';

import * as Assets from '../../../assets/index';
import CustomText from '../../../components/CustomText';
import Divider from '../../../components/Divider';

import HorizontalProgressBar from './HorizontalProgressBar';

const ProgressBadge: React.FC<{ isCompleted: boolean }> = ({ isCompleted }) => {
  const text = isCompleted ? 'Task completed' : 'Task to be performed';

  const containerBackgroundColor = isCompleted
    ? 'rgba(34, 197, 94, 0.1)'
    : 'rgba(243, 156, 18, 0.1)';

  return (
    <View
      style={{
        ...styles.badgeContainer,
        backgroundColor: containerBackgroundColor,
      }}
    >
      {isCompleted ? (
        <Assets.Icons.CheckMark2
          width={responsiveWidth(16)}
          height={responsiveWidth(16)}
          fill={'#22C55E'}
        />
      ) : (
        <Assets.Icons.ProgressWatches
          width={responsiveWidth(16)}
          height={responsiveWidth(16)}
          fill={'#F39C12'}
        />
      )}
      <CustomText
        color={isCompleted ? '#22C55E' : '#F39C12'}
        style={{ marginLeft: responsiveWidth(8) }}
      >
        {text}
      </CustomText>
    </View>
  );
};

const ConfessionTaskButtonWithProgress: React.FC<{
  onButtonPress: () => void;
  title: string;
  description: string;
  progress?: number;
  isToBePerformed?: boolean;
}> = props => {
  const { onButtonPress, title, description, progress, isToBePerformed } =
    props;

  return (
    <TouchableOpacity onPress={onButtonPress}>
      <View style={styles.buttonWrapper}>
        <View style={styles.leftSideWrapper}>
          <CustomText
            numberOfLines={1}
            fontSize={responsiveWidth(15)}
            lineHeight={responsiveWidth(20)}
            color="#FFF"
            style={styles.buttonTitle}
            fontWeight="bold"
          >
            {title}
          </CustomText>
          <Divider height={responsiveWidth(4)} />
          <CustomText
            fontSize={responsiveWidth(12)}
            lineHeight={responsiveWidth(16)}
            color="#FFF"
            style={styles.buttonTitle}
          >
            {description}
          </CustomText>
          {typeof progress === 'number' && (
            <>
              <Divider height={responsiveWidth(12)} />
              <HorizontalProgressBar progress={progress} />
              {progress >= 100 && <ProgressBadge isCompleted />}
            </>
          )}
          {isToBePerformed && (
            <>
              <Divider height={responsiveWidth(12)} />
              <ProgressBadge isCompleted={false} />
            </>
          )}
        </View>

        <View style={styles.buttonIconWrapper}>
          <Assets.Icons.ForwardArrow
            color={'#232323'}
            height={responsiveWidth(24)}
            width={responsiveWidth(24)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: responsiveWidth(12),
    borderColor: '#232323',
    borderWidth: responsiveWidth(1),
    paddingHorizontal: responsiveWidth(12),
    paddingVertical: responsiveWidth(10),
  },
  buttonIconWrapper: {
    alignItems: 'center',
  },
  buttonTitle: {
    textAlign: 'left',
    flex: 1,
  },
  leftSideWrapper: {
    flex: 1,
    marginRight: responsiveWidth(12),
  },
  badgeContainer: {
    paddingHorizontal: responsiveWidth(12),
    paddingVertical: responsiveWidth(8),
    flexDirection: 'row',
    borderRadius: responsiveWidth(8),
    alignSelf: 'baseline',
  },
});

export default ConfessionTaskButtonWithProgress;
