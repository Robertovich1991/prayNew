import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
  Platform,
} from 'react-native';
import TopBar from '../../components/TopBar';
import BottomMenu from '../../components/BottomMenu';
import Search from '../../components/Search';
import Container from '../../components/Container';
import { responsiveWidth } from '../../common/utils';
import { T_KEYS } from 'assets/translations';
import useOwnTranslation from 'hooks/useOwnTranslation';
import { useKeyboard } from 'hooks/useKeyboard';

const Pastors = () => {
  const t = useOwnTranslation;

  const { keyboardShown } = useKeyboard();

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={styles.flex}>
      <Container>
        <TopBar text={t(T_KEYS.PASTORS_SCREEN_TITLE)} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          onStartShouldSetResponder={() => true}
          style={styles.scrollWrapper}
        >
          <Search />
        </KeyboardAvoidingView>
      </Container>
      {!keyboardShown && <BottomMenu />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  scrollWrapper: {
    marginTop: responsiveWidth(39),
    flex: 1,
  },
  flex: {
    flex: 1,
  },
});

export default Pastors;
