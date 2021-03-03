import React from 'react'
import {Text, SafeAreaView} from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';

const App = () => {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  )
}

export default App
