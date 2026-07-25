import { useCallback } from 'react';

import { SafeAreaProvider, } from 'react-native-safe-area-context';

import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import Routes from './navigation/routes';
import { AuthProvider } from './src/contexts/authContext';
import { View } from './src/components/Themed';

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ fade: true });

export default function App() {
  // Single source of truth for font loading — useCachedResources used to do this
  // in parallel and race this hook over hiding the splash screen.
  const [fontsLoaded] = useFonts({
    ...FontAwesome.font,
    'nunito-medium': require('./assets/fonts/Nunito-Medium.ttf'),
    'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
    'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();

  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>

      <AuthProvider>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <StatusBar style={'dark'} />

          <Routes />
        </View>
      </AuthProvider>
    </SafeAreaProvider>
  );

}
