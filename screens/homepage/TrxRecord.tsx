import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RecentTx from './RecentTx';
import PendingTx from './PendingTx';
import { useTheme } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();


function MyTabs() {
  const {colors} =  useTheme()
    return (
      <Tab.Navigator
      overScrollMode={'auto'}
      screenOptions={{
        tabBarLabelStyle:{fontSize:12},
        tabBarActiveTintColor:colors.primary,
        tabBarInactiveTintColor:"grey",
        tabBarIndicatorStyle:{backgroundColor:colors.primary}
      }}
      >
        <Tab.Screen key={"recent"} name="Recent Transactions" component={RecentTx} />
        <Tab.Screen key={"pending"} name="Pending Payments" component={PendingTx} />
      </Tab.Navigator>
    );
  }

export default function TrxRecord() {

   return (
    <View className='mt-12 justify-between h-[500px] flex-1'>
      {/* <MyTabs/> */}
      <RecentTx/>
    </View>
  )
}

const styles = StyleSheet.create({})