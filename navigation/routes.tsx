
import React from 'react';

import { ColorSchemeName } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Navigation from '.';
import useColorScheme from '../hooks/useColorScheme';

import Login from '../src/screens/Auth/Login';
import SignUp from '../src/screens/Auth/SignUp';

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

function AppRoutes({ colorScheme }: { colorScheme: ColorSchemeName }) {

    return (
        <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar style={colorScheme == 'light' ? 'dark' : 'light'} />
        </SafeAreaProvider>
    );
}

const Routes: React.FC = () => {
    const colorScheme = 'light'//useColorScheme();

    const { isSigned } = useAuth();

    return !isSigned ? <AppRoutes colorScheme={colorScheme} /> : <AuthRoutes colorScheme={colorScheme} />;

};

export default Routes;