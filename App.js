import React, {useEffect} from 'react'
import {Text, SafeAreaView} from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import SplashScreen from 'react-native-splash-screen'

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  )
}

export default App
