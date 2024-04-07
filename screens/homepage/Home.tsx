import { useTheme } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import Header from '../components/Header'
import Wallet from './Wallet'
import Transfer from './Transfer'
import TrxRecord from './TrxRecord'


export default function Home() {
  const { colors } = useTheme()

  return (
    <SafeAreaView>
      <Header />
      <ScrollView className=' px-4' style={{backgroundColor:colors.background}} contentInsetAdjustmentBehavior='automatic'>
        <Wallet />
        <Transfer />
        <TrxRecord />
      </ScrollView>
    </SafeAreaView>
  )
}
