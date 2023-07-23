/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Ionicons, Octicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../src/constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import TabHome from '../src/screens/TabHome';
import TabSearch from '../src/screens/TabSearch';

import RecipeDetails from '../src/screens/RecipeDetails';
import CookingMode from '../src/screens/CookingMode';

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import ProfileStack from './profileStack';
import AddRecipe from '../src/screens/AddRecipe';
import RecipeStack from './recipeDetailsStack';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>

      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />

      <Stack.Screen name="RecipeScreen" component={RecipeStack} options={{ headerShown: false }} />
      <Stack.Screen name="CookingMode" component={CookingMode} options={{ headerShown: false }} />
      <Stack.Screen name="AddRecipe" component={AddRecipe} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
}



/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = 'light';//useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabHome"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <BottomTab.Screen
        name="TabSearch"
        component={TabSearch}
        options={{
          title: 'Home5x`',
          tabBarIcon: ({ color }) => <TabBarIcon name="search-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabHome"
        component={TabHome}
        options={({ navigation }: RootTabScreenProps<'TabHome'>) => ({
          title: 'Search',
          tabBarIcon: ({ color }) => <TabBarIconAlt name="home" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="TabProfile"
        component={ProfileStack}
        options={{
          title: 'Home5x`',
          tabBarIcon: ({ color }) => <TabBarIcon name="person-outline" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={20} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconAlt(props: {
  name: React.ComponentProps<typeof Octicons>['name'];
  color: string;
}) {
  return <Octicons size={20} style={{ marginBottom: -3 }} {...props} />;
}
