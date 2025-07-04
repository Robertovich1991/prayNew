import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from '../CustomButton';
import { responsiveWidth } from '../../common/utils';
import CustomLine from '../CustomLine';
import CardContainer from '../CardContainer';
import PlayfairTitle from '../PlayfairTitle';
import CustomText from 'components/CustomText';
import { T_KEYS } from 'assets/translations';
import useOwnTranslation from 'hooks/useOwnTranslation';
import store from 'store';
import { observer } from 'mobx-react';
import { useTheme } from '@rneui/themed';

interface ThanksCardProps {
  closeCard: () => void;
  title?: string;
  source?: GratitudeType;
}

const ThanksCard = (props: ThanksCardProps) => {
  const t = useOwnTranslation;

  const gratitude = store.donationsStore.getRandomGratitude(props.source);
  const title = props.title ? props.title : t(T_KEYS.DONATION_CARD_PLAYFAIR);
  const phrase = t(gratitude.phrase);
  const source = t(gratitude.source);
  const buttonTitle = t(T_KEYS.CONTINUE_BUTTON);
  const { theme } = useTheme();
  return (
    <CardContainer>
      <View
        style={{
          ...styles.card,
          backgroundColor: theme.colors.blackPrimaryToWhite,
        }}
      >
        <View style={styles.titleWrapper}>
          <PlayfairTitle>{title}</PlayfairTitle>
        </View>
        <CustomLine />
        <View style={styles.textWrapper}>
          <CustomText
            fontSize={responsiveWidth(46)}
            lineHeight={responsiveWidth(61)}
            fontFamily="PlayfairDisplay-SemiBold"
            style={styles.quotes}
          >
            “
          </CustomText>
          <CustomText
            lineHeight={responsiveWidth(27)}
            color={theme.colors.textColorSecondary}
            fontFamily="NotoSans-Italic"
            style={styles.text}
          >
            {phrase}
          </CustomText>
          {source.length > 0 && (
            <CustomText
              lineHeight={responsiveWidth(27)}
              color={theme.colors.textColorSecondary}
              fontWeight="light"
              style={styles.proverbs}
            >
              {`— ${source}`}
            </CustomText>
          )}
        </View>
        <CustomButton
          onPress={() => {
            props.closeCard();
          }}
          title={buttonTitle}
        />
      </View>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: responsiveWidth(14),
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(24),
    paddingTop: responsiveWidth(48),
    paddingBottom: responsiveWidth(32),
  },
  titleWrapper: {
    marginBottom: responsiveWidth(24),
  },
  textWrapper: {
    marginTop: responsiveWidth(16),
  },
  quotes: {
    textAlign: 'center',
  },
  text: {
    marginBottom: responsiveWidth(16),
    textAlign: 'center',
  },
  proverbs: {
    marginBottom: responsiveWidth(40),
    textAlign: 'center',
  },
});

export default observer(ThanksCard);
