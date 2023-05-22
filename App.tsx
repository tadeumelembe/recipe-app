import { useCallback } from 'react';

import { SafeAreaProvider, } from 'react-native-safe-area-context';

import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Routes from './navigation/routes';
import { AuthProvider } from './src/context/authContext';
import { View } from './components/Themed';

/*/ Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjdb3gn3qYVTZATVvRHHYgnDLv1PqDm4A",
  authDomain: "recipe-reels.firebaseapp.com",
  projectId: "recipe-reels",
  storageBucket: "recipe-reels.appspot.com",
  messagingSenderId: "253239535793",
  appId: "1:253239535793:web:1a1c23e1892d13151c9a90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
*/

SplashScreen.preventAutoHideAsync();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    'nunito-medium': require('./assets/fonts/Nunito-Medium.ttf'),
    'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
    'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
    
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  if (!isLoadingComplete)
    return null;


  return (
    <SafeAreaProvider>

      <AuthProvider>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <Routes />
        </View>
      </AuthProvider>
    </SafeAreaProvider>
  );

}
