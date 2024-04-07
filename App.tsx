import React from 'react';

import { NavigationContainer, DefaultTheme, DarkTheme, useTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import Home from './screens/homepage/Home';
import { colorTheme } from './utils/ColorTheme';
import SendTo from './screens/SendTo';

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

export default function App() {

  const isDarkMode = useColorScheme() === 'dark';

  const {colors} = useTheme()

  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={"#2e4f46"}
      />

      <NavigationContainer theme={isDarkMode ? colorTheme.dark : colorTheme.light}>
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }} initialRouteName='SendTo'>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='SendTo' component={SendTo} />
        </Stack.Navigator>

      </NavigationContainer>
    </>
  );
}




