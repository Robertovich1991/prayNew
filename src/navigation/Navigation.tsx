import { useEffect } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { observer } from 'mobx-react';
import { StatusBar, StatusBarStyle } from 'react-native';
import { useThemeMode } from '@rneui/themed';
import NotAuthorizedStack from './NotAuthorizedStack';
import RootStack from './RootStack';
import { useCurrentUser } from 'hooks';
import { useCurrentSettings } from 'hooks/useCurrentSettings';
import PushNotificationSetting from 'screens/PushNotificationSetting';
import { navigationRef } from './RefNavigation';
import Container from 'components/Container';
import SelectLanguage from '../screens/SelectLanguage';
import MusicalAccompaniment from 'screens/MusicalAccompaniment';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'black',
  },
};

const Navigation = () => {
  const { isUserAuth, isUserInited, isUserInAuthorization } = useCurrentUser();
  const { settings, settingsInited } = useCurrentSettings();
  const { setMode: setThemeMode, mode: themeMode } = useThemeMode();
console.log(isUserAuth,'..............................................................mmm');

  useEffect(() => {
    console.log('Navigation', {
      isUserAuth,
      isUserInited,
      isUserInAuthorization,
      settings,
      settingsInited,
    });
  }, [
    isUserAuth,
    isUserInited,
    settings,
    settingsInited,
    isUserInAuthorization,
  ]);

  const navigationWrapper = React.useMemo(() => {
    console.log('========================');
    
    if (settings?.theme && themeMode !== settings.theme) {
      setTimeout(() => {
        setThemeMode(settings.theme);
      }, 0);
    }
console.log('[[[[[[[[[[[[[[[[[');

    if (isUserAuth) {
      if (!settingsInited) {
        return (
          <Container>
            <></>
          </Container>
        );
      }

      if (!settings.language) {
        return <SelectLanguage />;
      }

      if (typeof settings.isSoundActive === 'undefined') {
        return <MusicalAccompaniment />;
      }

      if (typeof settings.isPushNotificationsActive === 'undefined') {
        return <PushNotificationSetting />;
      }
console.log('pppppppppppppppppppppppp');

      return <RootStack />;
    } else {
      if (isUserInAuthorization) {
        return (
          <Container>
            <></>
          </Container>
        );
      } else {
        console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
        
        return <NotAuthorizedStack />;
      }
    }
  }, [
    isUserAuth,
    isUserInAuthorization,
    settings,
    settingsInited,
    themeMode,
    setThemeMode,
  ]);

  const barStyle: StatusBarStyle =
    themeMode === 'dark' ? 'light-content' : 'dark-content';

  return (
    <>
      <NavigationContainer theme={theme} ref={navigationRef}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={barStyle}
        />
        {navigationWrapper}
      </NavigationContainer>
    </>
  );
};

export default observer(Navigation);
