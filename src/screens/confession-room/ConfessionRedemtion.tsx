import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react';

import { ConfessionRoomNavigationProps } from '../../navigation/navigationProps';
import Routes from '../../navigation/Routes';

import { useLanguageBasedStructure as language } from '../../hooks';
import { responsiveWidth } from '../../common/utils';
import Divider from '../../components/Divider';
import CustomText from '../../components/CustomText';

import { sinElements } from './sin-mocks/index';
import AdditionalLinks from './widgets/AdditionalLinks';
import AdditionalVideo from './widgets/AdditionalVideo';
import ConfessionTasks from './widgets/ConfessionTasks';
import CustomVideoBackground from './widgets/CustomVideoBackground';
import MaskedHeaderTitle from './widgets/MaskedHeaderTitle';

const ConfessionRedemption = () => {
  const { params } =
    useRoute<
      RouteProp<
        ConfessionRoomNavigationProps,
        Routes.CONFESSION_ROOM_CONFESSION_REDEMPTION
      >
    >();
  const { machineName } = params;

  const sinElement = sinElements.find(x => x.machineName === machineName);

  if (!sinElement) {
    throw new Error('Sin element not found in mocks');
  }

  const titleFontSize = language(sinElement.headerTitle).length > 17 ? 24 : 40;

  const [titleHeight, setTitleHeight] = useState(titleFontSize * 10);

  return (
    <CustomVideoBackground assetSource={sinElement.detailBackgroundVideo}>
      <View
        style={{
          ...styles.titleContainer,
          height: titleHeight,
        }}
      >
        <MaskedHeaderTitle>
          <Text
            style={{
              ...styles.titleText,
              fontSize: responsiveWidth(titleFontSize),
              lineHeight: responsiveWidth(titleFontSize * 1.25),
            }}
            onLayout={event => {
              const { height } = event.nativeEvent.layout;
              setTitleHeight(height);
            }}
          >
            {language(sinElement.headerTitle).toUpperCase()}
          </Text>
        </MaskedHeaderTitle>
      </View>
      <Divider height={12} />
      <CustomText
        fontSize={responsiveWidth(15)}
        lineHeight={responsiveWidth(22)}
        color="#FFF"
        fontWeight="light"
      >
        {language(sinElement.description) || ''}
      </CustomText>
      <Divider height={20} />
      <View style={styles.elementRowWrapper}>
        <ConfessionTasks confession={{ machineName }} />
      </View>
      <Divider height={8} />
      {/* <View style={styles.redeemingSuperstition} />
      <Divider height={8} /> */}
      <AdditionalVideo
        videoUrl={sinElement.additionalVideo?.url}
        videoPreview={sinElement.additionalVideo?.preview}
      />
      <Divider height={8} />
      <AdditionalLinks links={sinElement.additionalLinks} />
      <Divider height={responsiveWidth(120)} />
    </CustomVideoBackground>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  titleText: {
    textAlign: 'left',
    opacity: 0.8,
    color: '#FFF',
    width: '100%',
    fontFamily: 'PlayfairDisplay-SemiBold',
  },
  elementRowWrapper: {
    backgroundColor: 'black',
    borderRadius: responsiveWidth(12),
    padding: responsiveWidth(12),
  },
  redeemingSuperstition: {
    height: responsiveWidth(64),
    backgroundColor: '#000',
    borderRadius: responsiveWidth(12),
  },
});

export default observer(ConfessionRedemption);
