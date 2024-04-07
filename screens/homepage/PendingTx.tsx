import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'

export default function PendingTx() {
  const { colors } = useTheme()
  return (
    <ScrollView className='mt-4' contentInsetAdjustmentBehavior='automatic'>
      {Array(10).fill(0).map((item, i) => (
        <View key={i} className='flex-row justify-between items-center p-4 bg-white rounded-xl mx-1 mb-1' style={{ elevation: 5 }}>

          {/* Name and DP */}
          <View className='flex-row'>
            <View className='rounded-full h-12 w-12 bg-red-500 justify-center items-center mr-2'>
              <Text className='font-bold text-white'>UK</Text>
            </View>

            <View>
              <Text className='font-bold mb-2'>Umesh Bedi</Text>
              <Text className=' text-xs text-gray-400'>Due date - 30 March</Text>
            </View>

          </View>

          {/* Money Debit and Credit */}
          <View>
            <TouchableOpacity className='flex-row items-center self-start px-4 py-2 rounded-xl border' style={{ borderColor: colors.primary }}>
              <Text className='text-white text-xs' style={{color:colors.primary}}>Send Money</Text>
              
            </TouchableOpacity>
          </View>

        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({})