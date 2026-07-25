import React from 'react';

import { Ionicons, Octicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router/js-tabs';
import type { ColorValue } from 'react-native';

import Colors from '../../src/constants/Colors';

// The tab order follows the order the screens are declared below, not the
// filesystem order, which is why `search` can sit to the left of `index`.
export const unstable_settings = {
  anchor: 'index',
};

export default function TabLayout() {
  const colorScheme = 'light'; //useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <TabBarIcon name="search-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIconAlt name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="person-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: ColorValue;
}) {
  return <Ionicons size={20} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconAlt(props: {
  name: React.ComponentProps<typeof Octicons>['name'];
  color: ColorValue;
}) {
  return <Octicons size={20} style={{ marginBottom: -3 }} {...props} />;
}
