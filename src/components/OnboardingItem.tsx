/* eslint-disable react-native/no-inline-styles */
import { responsiveWidth } from 'common/utils';
import React from 'react';
import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import { Pagination } from 'react-native-snap-carousel';
import AnimatedCross from './AnimatedCross';
import CustomText from './CustomText';
import PlayfairTitle from './PlayfairTitle';
import CustomButton from './CustomButton';
import CustomLine from './CustomLine';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Routes from 'navigation/Routes';
import Feature1 from '../assets/img/icons/feature1.svg';
import Feature2 from '../assets/img/icons/feature2.svg';
import Feature3 from '../assets/img/icons/feature3.svg';
import { useTheme } from '@rneui/themed';
import { CustomizationColors } from 'styles/customization';

interface IOnboardingItemProps {
  item: any;
  id: number;
  arr: any;
}

type RootStackParamList = {
  [Routes.AUTH_SCREEN]: undefined;
};

type Props = StackNavigationProp<RootStackParamList>;

const OnboardingItem = (props: IOnboardingItemProps) => {
  const navigation = useNavigation<Props>();
  const { theme } = useTheme();
  return (
    <View style={styles.wrapper}>
      {props.item.noWidget ? (
        <View style={styles.crossWrapper}>
          <AnimatedCross isBlessed={false} />
        </View>
      ) : (
        <ImageBackground source={props.item.bgSrc} style={styles.imageBg}>
          <Image style={styles.image} source={props.item.phoneSrc} />
        </ImageBackground>
      )}
      {props.item.noWidget ? (
        <View style={styles.noWidget}>
          <View>
            <PlayfairTitle>{props.item.title}</PlayfairTitle>
            <View style={styles.lineWrapper}>
              <CustomLine />
            </View>
            <CustomText style={{ textAlign: 'center' }}>
              Stay online with God
            </CustomText>
          </View>
          <View style={{ marginTop: responsiveWidth(57) }}>
            <CustomButton
              backgroundColor={CustomizationColors.get('ORANGE_PRIMARY')}
              onPress={() => {
                navigation.navigate(Routes.AUTH_SCREEN);
              }}
              title={'Log In'}
            />
          </View>
        </View>
      ) : (
        <View
          style={{
            ...styles.widget,
            backgroundColor: theme.colors.backgroundSecondary,
          }}
        >
          <PlayfairTitle>{props.item.title}</PlayfairTitle>
          {props.item.features && (
            <View>
              <CustomText style={styles.featuresTitle}>
                Subscription gives you
              </CustomText>
              <View style={styles.featuresItem}>
                <View style={styles.featuresItemIcon}>
                  <Feature1
                    width={responsiveWidth(20)}
                    height={responsiveWidth(20)}
                  />
                </View>
                <CustomText>Unlimited prayer requests</CustomText>
              </View>
              <View style={styles.featuresItem}>
                <View style={styles.featuresItemIcon}>
                  <Feature2
                    width={responsiveWidth(20)}
                    height={responsiveWidth(20)}
                  />
                </View>
                <CustomText>24/7 chat with priest</CustomText>
              </View>
              <View style={styles.featuresItem}>
                <View style={styles.featuresItemIcon}>
                  <Feature3
                    width={responsiveWidth(20)}
                    height={responsiveWidth(20)}
                  />
                </View>
                <CustomText>Everyday Blessing Prayer</CustomText>
              </View>
            </View>
          )}
          <View style={{ marginTop: responsiveWidth(57) }}>
            <CustomButton
              backgroundColor={CustomizationColors.get('ORANGE_PRIMARY')}
              onPress={() => {
                navigation.navigate(Routes.AUTH_SCREEN);
              }}
              title={'Log In'}
            />
          </View>
        </View>
      )}
      <View style={styles.paginationWrapper}>
        <Pagination
          dotStyle={{
            backgroundColor: CustomizationColors.get('ORANGE_PRIMARY'),
          }}
          containerStyle={{
            paddingVertical: 0,
          }}
          inactiveDotScale={1}
          inactiveDotStyle={{
            backgroundColor: CustomizationColors.get('GREY_SECONDARY'),
          }}
          dotsLength={props.arr.length}
          activeDotIndex={props.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
  },
  crossWrapper: {
    width: '100%',
    height: '100%',
    flex: 1,
    paddingTop: responsiveWidth(70),
  },
  imageBg: {
    width: '100%',
    height: '103%',
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    marginTop: responsiveWidth(70),
    flex: 1,
  },
  noWidget: {
    width: '100%',
    marginTop: responsiveWidth(30),
    paddingHorizontal: responsiveWidth(20),
    justifyContent: 'space-between',
    paddingBottom: responsiveWidth(54),
  },
  lineWrapper: {
    marginTop: responsiveWidth(24),
    marginBottom: responsiveWidth(20),
  },
  widget: {
    width: '100%',
    justifyContent: 'space-between',
    paddingBottom: responsiveWidth(54),
    paddingHorizontal: responsiveWidth(20),
    paddingTop: responsiveWidth(20),
    borderTopLeftRadius: responsiveWidth(14),
    borderTopRightRadius: responsiveWidth(14),
  },
  paginationWrapper: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: responsiveWidth(139),
    width: '100%',
  },
  featuresTitle: {
    marginTop: responsiveWidth(5),
    marginBottom: responsiveWidth(15),
    textAlign: 'center',
  },
  featuresItem: {
    width: '100%',
    height: responsiveWidth(45),
    borderColor: CustomizationColors.get('BLACK_SECONDARY'),
    borderWidth: 1,
    borderRadius: responsiveWidth(10),
    marginBottom: responsiveWidth(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuresItemIcon: {
    marginRight: responsiveWidth(12),
  },
});

export default OnboardingItem;
