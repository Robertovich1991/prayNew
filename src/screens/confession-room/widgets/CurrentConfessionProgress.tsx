import React, { useCallback } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Routes from '../../../navigation/Routes';
import { ConfessionRoomNavigationProps } from '../../../navigation/navigationProps';

import { responsiveWidth } from '../../../common/utils';

import * as Assets from '../../../assets';
import CustomText from '../../../components/CustomText';
import Divider from '../../../components/Divider';
import HorizontalProgressBar from './HorizontalProgressBar';

const CurrentConfessionProgress: React.FC<{
  machineName: string;
  title: string;
  completedTasks: number;
  totalTasks: number;
  cardThumbnail?: SinCardImageKey;
}> = ({ completedTasks, totalTasks, title, cardThumbnail, machineName }) => {
  const { theme } = useTheme();

  const navigation =
    useNavigation<StackNavigationProp<ConfessionRoomNavigationProps>>();

  const progress = totalTasks === 0 ? 0 : (completedTasks * 100) / totalTasks;

  const imageSource = useCallback(() => {
    return Assets.SinCards[cardThumbnail || 'Ritualism'];
  }, [cardThumbnail]);

  const onPressed = () => {
    navigation.navigate(Routes.CONFESSION_ROOM_CONFESSION_REDEMPTION, {
      machineName,
    });
  };

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        borderColor: theme.colors.backgroundSecondary,
        backgroundColor: theme.colors.backgroundPrimary,
      }}
      onPress={onPressed}
    >
      <Image
        width={responsiveWidth(44)}
        height={responsiveWidth(44)}
        resizeMode="cover"
        resizeMethod="scale"
        source={imageSource()}
        style={{
          width: responsiveWidth(44),
          height: responsiveWidth(44),
          borderRadius: responsiveWidth(10),
        }}
      />
      <View style={styles.descriptionWrapper}>
        <CustomText
          fontSize={responsiveWidth(15)}
          lineHeight={responsiveWidth(20)}
          fontWeight="bold"
        >
          {title}
        </CustomText>
        <Divider height={responsiveWidth(4)} />
        <CustomText
          fontSize={responsiveWidth(12)}
          lineHeight={responsiveWidth(16)}
        >
          {`${completedTasks}/${totalTasks}`} Tasks
        </CustomText>
        <Divider height={responsiveWidth(8)} />
        <HorizontalProgressBar progress={progress} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: responsiveWidth(14),
    borderWidth: responsiveWidth(2),
    padding: responsiveWidth(16),
    flexDirection: 'row',
  },
  descriptionWrapper: { marginLeft: responsiveWidth(10), flex: 1 },
});

export default CurrentConfessionProgress;
