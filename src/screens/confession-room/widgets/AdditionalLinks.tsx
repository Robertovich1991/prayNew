import React, { useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native';

import { responsiveWidth } from '../../../common/utils';

import * as Assets from '../../../assets';

import CustomText from '../../../components/CustomText';
import Divider from '../../../components/Divider';

const AdditionalLinks: React.FC<{
  links: string[];
}> = props => {
  const { links } = props;

  if (links.length === 0) {
    return <></>;
  }

  return (
    <View style={styles.additionalLinksWrapper}>
      <CustomText
        lineHeight={responsiveWidth(20)}
        fontSize={responsiveWidth(15)}
        color={'#FFF'}
      >
        Additional links
      </CustomText>
      <Divider height={responsiveWidth(12)} />
      {links.map(url => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const handlePress = useCallback(async () => {
          await Linking.openURL(url);
        }, [url]);
        return (
          <View key={url}>
            <TouchableOpacity style={styles.linkButton} onPress={handlePress}>
              <Assets.Icons.OverlappedChains
                fill="#FFF"
                width={responsiveWidth(20)}
                height={responsiveWidth(20)}
              />
              <CustomText
                lineHeight={responsiveWidth(16)}
                fontSize={responsiveWidth(12)}
                style={styles.linkText}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {url}
              </CustomText>
            </TouchableOpacity>
            <Divider height={responsiveWidth(8)} />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  additionalLinksWrapper: {
    height: responsiveWidth(152),
    borderRadius: responsiveWidth(12),
    padding: responsiveWidth(12),
    backgroundColor: '#000',
  },
  linkText: { textTransform: 'uppercase', marginLeft: responsiveWidth(8) },
  linkButton: {
    borderRadius: responsiveWidth(12),
    borderWidth: responsiveWidth(1),
    borderColor: '#232323',
    paddingHorizontal: responsiveWidth(12),
    paddingVertical: responsiveWidth(10),
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default AdditionalLinks;
