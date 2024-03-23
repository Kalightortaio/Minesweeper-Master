import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TimerControlProvider } from './src/components/TimerControlContext';
import { SoundProvider } from './src/components/SoundContext';
import { RootStackParamList } from './src/Types';
import MainMenu from './src/screens/MainMenu';
import QuickPlay from './src/screens/QuickPlay';
import ClassicMode from './src/screens/ClassicMode';
import EternityMode from './src/screens/EternityMode';
import MasterMode from './src/screens/MasterMode';
import Achievements from './src/screens/Achievements';
import HighScores from './src/screens/HighScores';
import Settings from './src/screens/Settings';

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        StatusBar.setHidden(true);
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          'DSEG': require('./assets/fonts/DSEG.ttf'),
          'Tahoma': require('./assets/fonts/Tahoma.ttf'),
          'MINESWEEPER': require('./assets/fonts/MINE-SWEEPER.ttf'),
        });
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
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
      <TimerControlProvider>
        <SoundProvider>
          {appReady && <NavigationContainer onReady={onLayoutRootView}>
            <Stack.Navigator initialRouteName="MainMenu">
                <Stack.Screen
                  name="MainMenu" 
                  component={MainMenu}
                  options={{ headerShown: false }}  
                />
                <Stack.Screen
                  name="QuickPlay"
                  component={QuickPlay}
                  options={{ headerShown: false }}
                />
                <Stack.Screen 
                  name="Classic Mode" 
                  component={ClassicMode} 
                  options={{ headerShown: false }}  
                />
                <Stack.Screen
                  name="Eternity Mode"
                  component={EternityMode}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Master Mode"
                  component={MasterMode}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Achievements"
                  component={Achievements}
                  options={{ headerShown: false }}
                />
                <Stack.Screen 
                  name="High Scores" 
                  component={HighScores} 
                  options={{ headerShown: false }}  
                />
                <Stack.Screen 
                  name="Settings" 
                  component={Settings} 
                  options={{ headerShown: false }}  
                />
            </Stack.Navigator>
          </NavigationContainer>}
        </SoundProvider>
      </TimerControlProvider>
    </GestureHandlerRootView>
  );
}