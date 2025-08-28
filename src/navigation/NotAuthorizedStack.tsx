import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import AuthScreen from 'screens/AuthScreen';
import Onboarding from 'screens/Onboarding';
import Routes from './Routes';
import FreeDonation from 'screens/FreeDonation';

const NotAuthorizedStack = createStackNavigator();

export default () => {
  return (
    <>
      <NotAuthorizedStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <NotAuthorizedStack.Screen
          name={Routes.ONBOARDING}
          component={Onboarding}
        />
        <NotAuthorizedStack.Screen
          name={Routes.FREE_DONATIONS}
          component={FreeDonation}
        />
        <NotAuthorizedStack.Screen
          name={Routes.AUTH_SCREEN}
          component={AuthScreen}
        />
      </NotAuthorizedStack.Navigator>
    </>
  );
};
