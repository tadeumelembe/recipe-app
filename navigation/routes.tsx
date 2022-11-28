
import React from 'react';

import { ColorSchemeName } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Navigation from '.';
import useColorScheme from '../hooks/useColorScheme';

import Login from '../src/screens/Login';
import SignUp from '../src/screens/SignUp';

import { AuthProvider, useAuth } from '../src/context/authContext';

const Stack = createNativeStackNavigator();


function AuthRoutes({ colorScheme }: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
        //linking={LinkingConfiguration}
        //theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
            <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SignIn" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function AppRoutes() {
    const colorScheme = useColorScheme();

    return (
        <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
        </SafeAreaProvider>
    );
}

const Routes: React.FC = () => {
    const colorScheme = useColorScheme();

    const { isSigned } = useAuth();

    return isSigned ? <AppRoutes /> : <AuthRoutes colorScheme={colorScheme} />;

};

export default Routes;