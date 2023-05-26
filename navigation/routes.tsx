
import React from 'react';

import { ActivityIndicator, ColorSchemeName } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Navigation from '.';
import useColorScheme from '../hooks/useColorScheme';

import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/SignUp';

import { AuthProvider, useAuth } from '../contexts/authContext';
import { View } from '../components/Themed';
import Colors from '../constants/Colors';

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
            <StatusBar backgroundColor={'#fff'} style={'dark'} />
        </SafeAreaProvider>
    );
}

const Routes: React.FC<any> = () => {
    const colorScheme = 'light'//useColorScheme();

    const { isSigned, user,loading } = useAuth();

    if (loading) {
        return(
            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator color={Colors[colorScheme].text} size={"large"} />
            </View>
        )
   }

    return isSigned ? <AppRoutes colorScheme={colorScheme} /> : <AuthRoutes colorScheme={colorScheme} />;

};

export default Routes;