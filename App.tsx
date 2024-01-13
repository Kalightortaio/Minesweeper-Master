import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontsLoadedContext } from './src/Constants';
import MainMenu from './src/screens/MainMenu';
import ClassicMode from './src/screens/ClassicMode';
import HighScores from './src/screens/HighScores';
import ChallengeMode from './src/screens/ChallengeMode';
import Settings from './src/screens/Settings';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    StatusBar.setHidden(true);
    (async () => {
      await Font.loadAsync({
        'DSEG': require('./assets/fonts/DSEG.ttf'),
      });
      setFontsLoaded(true);
    })();
    return () => {
      StatusBar.setHidden(false);
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FontsLoadedContext.Provider value={fontsLoaded}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name="MainMenu" 
              component={MainMenu} 
              options={{ headerShown: true }}  
            />
            <Stack.Screen 
              name="ClassicMode" 
              component={ClassicMode} 
              options={{ headerShown: false }}  
            />
            <Stack.Screen 
              name="HighScores" 
              component={HighScores} 
              options={{ headerShown: true }}  
            />
            <Stack.Screen 
              name="ChallengeMode" 
              component={ChallengeMode} 
              options={{ headerShown: false }}  
            />
            <Stack.Screen 
              name="Settings" 
              component={Settings} 
              options={{ headerShown: true }}  
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FontsLoadedContext.Provider>
    </GestureHandlerRootView >
  );
}