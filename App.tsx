import React, { useEffect, useState } from 'react';

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

import Home from './screens/homepage/Home';
import { colorTheme } from './utils/ColorTheme';
import Register from './screens/auth/Register';
import Login from './screens/auth/Login';
import PaymentMethod from './screens/payment/PaymentMethod';
import DoPayment from './screens/payment/DoPayment';
import SendToBank from './screens/payment/SendToBank';
import SendToUpi from './screens/payment/SendToUpi';
import Expenses from './screens/Expenses';
import QRScannerScreen from './screens/QRscan';
import MyDrawer from './screens/homepage/Drawer';
import { AuthProvider } from './screens/context/MyContext';
import Profile from './screens/Profile';

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

export default function App() {

  const isDarkMode = useColorScheme() === 'dark';

  const { colors } = useTheme()

  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={"#2e4f46"}
      />
      <AuthProvider>
        <NavigationContainer theme={isDarkMode ? colorTheme.dark : colorTheme.light}>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">

            <Stack.Screen name='Drawer' component={MyDrawer} />
            {/* <Stack.Screen name='Home' component={Home} /> */}
            <Stack.Screen name='DoPayment' component={DoPayment} />
            <Stack.Screen name='SendToBank' component={SendToBank} />
            <Stack.Screen name='SendToUpi' component={SendToUpi} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='PaymentMethod' component={PaymentMethod} />
            <Stack.Screen name='Expenses' component={Expenses} />
            <Stack.Screen name='QRScannerScreen' component={QRScannerScreen} />
            <Stack.Screen name='Profile' component={Profile} />
          </Stack.Navigator>

        </NavigationContainer>
      </AuthProvider>
    </>
  );
}




