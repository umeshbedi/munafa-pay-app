import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient';
import Feather from "react-native-vector-icons/Feather"

export default function Wallet() {
  const { colors } = useTheme()
  return (
    <LinearGradient colors={['#779677', '#d0b244']} useAngle angle={90} style={{ borderRadius: 20 }} className='px-8 py-7'>
        <View className='p-4 mb-3' style={{backgroundColor:colors.primary, borderRadius:10}}>
          <Text className='text-white mb-2'>Wallet Balance</Text>
          <Text className='text-white text-2xl font-semibold'>₹32566.00</Text>
        </View>
        <Text className='text-white mb-3'>UIP ID: somthing@ybl   <Feather name='copy'/></Text>
    
        <TouchableOpacity className='flex-row items-center self-start px-5 py-3 rounded-full' style={{backgroundColor:colors.primary}}>
          <Text className='text-white'>Add Money</Text>
          <Feather name='chevron-right' size={18} style={{color:'white'}}/>
        </TouchableOpacity>
        
    </LinearGradient>
  )
}

const styles = StyleSheet.create({})