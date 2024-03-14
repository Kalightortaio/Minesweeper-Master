import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
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

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        StatusBar.setHidden(true);
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          'DSEG': require('./assets/fonts/DSEG.ttf'),
          'MINESWEEPER': require('./assets/fonts/MINE-SWEEPER.ttf'),
        });
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
        setAppReady(true);
      }
    }
    prepare();
    return () => {
      StatusBar.setHidden(false);
    };
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FontsLoadedContext.Provider value={fontsLoaded}>
        {appReady && <NavigationContainer onReady={onLayoutRootView}>
          <Stack.Navigator initialRouteName="MainMenu">
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
          </Stack.Navigator>
        </NavigationContainer>}
      </FontsLoadedContext.Provider>
    </GestureHandlerRootView>
  );
}