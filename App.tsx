import React, { Component } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation/Navigation';
import ModalsProvider from './src/providers/ModalsProvider';
import './i18next.config';
import { ThemeProvider } from '@rneui/themed';
import { theme } from './src/styles/createTheme';

class App extends Component {
  render() {
    return (
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <Navigation />
          <ModalsProvider />
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }
}

export default App;
