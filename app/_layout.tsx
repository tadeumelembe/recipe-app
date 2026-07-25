import { useEffect } from 'react';

import { FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { View } from '../src/components/Themed';
import { AuthProvider, useAuth } from '../src/contexts/authContext';

// The signed-out routes are the fallback: when `isSigned` is false the guarded
// screens are removed and the router lands on the first remaining one.
export const unstable_settings = {
  anchor: '(tabs)',
};

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ fade: true });

export default function RootLayout() {
  // Single source of truth for font loading — useCachedResources used to do this
  // in parallel and race this hook over hiding the splash screen.
  const [fontsLoaded] = useFonts({
    ...FontAwesome.font,
    'nunito-medium': require('../assets/fonts/Nunito-Medium.ttf'),
    'nunito-bold': require('../assets/fonts/Nunito-Bold.ttf'),
    'nunito-regular': require('../assets/fonts/Nunito-Regular.ttf'),
    'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootLayoutNav fontsLoaded={fontsLoaded} />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

function RootLayoutNav({ fontsLoaded }: { fontsLoaded: boolean }) {
  const { isSigned, loading } = useAuth();

  // Hold the splash screen until the fonts are in and the persisted session has
  // been restored, so the first frame is already the right side of the guard.
  const isReady = fontsLoaded && !loading;

  useEffect(() => {
    if (isReady) SplashScreen.hideAsync();
  }, [isReady]);

  if (!isReady) return null;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style={'dark'} />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={isSigned}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="recipe/[id]" />
          <Stack.Screen name="cooking-mode" />
          <Stack.Screen name="add-recipe" />
        </Stack.Protected>

        <Stack.Protected guard={!isSigned}>
          <Stack.Screen name="sign-in" />
          <Stack.Screen name="sign-up" />
        </Stack.Protected>
      </Stack>
    </View>
  );
}
