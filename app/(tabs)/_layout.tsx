import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
    initialRouteName='home'
    screenOptions={{
      tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      headerShown: useClientOnlyValue(false, true),
    }}>
    <Tabs.Screen
      name="home"
      options={{
        title: 'Book List',
        headerShown: false,
        tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
      }}
    />
    <Tabs.Screen
      name="two"
      options={{
        title: 'Borrowed Books',
        tabBarIcon: ({ color }) => <TabBarIcon name="exchange" color={color} />,
      }}
    />
  </Tabs>
  );
}
