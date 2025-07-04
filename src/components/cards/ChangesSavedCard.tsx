import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from '../CustomButton';
import { responsiveWidth } from '../../common/utils';
import Checkmark from '../../assets/img/icons/checkmark.svg';
import CardContainer from '../CardContainer';
import PlayfairTitle from '../PlayfairTitle';
import { T_KEYS } from 'assets/translations';
import useOwnTranslation from 'hooks/useOwnTranslation';
import { useTheme } from '@rneui/themed';

interface IChangeSavedCardProps {
  continueAction: () => void;
}

const ChangeSavedCard = (props: IChangeSavedCardProps) => {
  const t = useOwnTranslation;
  const { theme } = useTheme();
  return (
    <CardContainer>
      <View
        style={{
          ...styles.card,
          backgroundColor: theme.colors.blackPrimaryToWhite,
        }}
      >
        <Checkmark
          style={styles.checkmark}
          width={responsiveWidth(30)}
          height={responsiveWidth(30)}
        />
        <PlayfairTitle>{t(T_KEYS.CHANGES_SAVED_CARD_PLAYFAIR)}</PlayfairTitle>
        <View style={styles.btnWrapper}>
          <CustomButton
            onPress={() => {
              props.continueAction();
            }}
            title={t(T_KEYS.CONTINUE_BUTTON)}
          />
        </View>
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
    paddingTop: responsiveWidth(45),
    paddingBottom: responsiveWidth(32),
  },
  checkmark: {
    marginBottom: responsiveWidth(7),
  },
  btnWrapper: {
    marginTop: responsiveWidth(32),
    width: '100%',
  },
});

export default ChangeSavedCard;
