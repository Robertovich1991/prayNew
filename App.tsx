import React, { Component, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation/Navigation';
import ModalsProvider from './src/providers/ModalsProvider';
import SplashScreen from './src/components/SplashScreen';
import './i18next.config';
import { ThemeProvider } from '@rneui/themed';
import { theme } from './src/styles/createTheme';

class App extends Component {
  state = {
    showSplash: true,
  };

  handleSplashComplete = () => {
    this.setState({ showSplash: false });
  };

  render() {
    const { showSplash } = this.state;

    if (showSplash) {
      return <SplashScreen onVideoComplete={this.handleSplashComplete} />;
    }

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
