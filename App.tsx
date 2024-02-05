import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontsLoadedContext } from './src/Constants';
import Splash from './src/screens/Splash';
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
    const minimumSplash = 1000;
    (async () => {
      const fontLoadPromise = Font.loadAsync({
        'DSEG': require('./assets/fonts/DSEG.ttf'),
        'MINESWEEPER': require('./assets/fonts/MINE-SWEEPER.ttf'),
      });
      await Promise.all([
        fontLoadPromise,
        new Promise(resolve => setTimeout(resolve, minimumSplash))
      ]);
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
          <Stack.Navigator initialRouteName="SplashScreen">
            {fontsLoaded ? (
              <>
              <Stack.Screen
                name="MainMenu" 
                component={MainMenu}
                options={{ headerShown: false }}  
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
              </>
            ) : (
                <Stack.Screen
                  name="SplashScreen"
                  component={Splash}
                  options={{ headerShown: false }}
                />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </FontsLoadedContext.Provider>
    </GestureHandlerRootView >
  );
}