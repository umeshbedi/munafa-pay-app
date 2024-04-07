import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'

export default function RecentTx() {
    const {colors} = useTheme()
    return (
        <ScrollView className='mt-4' >
            {Array(10).fill(0).map((item, i) => (
                <TouchableOpacity key={i} className='flex-row justify-between items-center p-4 bg-white rounded-xl mx-1 mb-1' style={{elevation:5}}>
                    
                    {/* Name and DP */}
                    <View className='flex-row'>
                        <View className='rounded-full h-12 w-12 bg-red-500 justify-center items-center mr-2'>
                            <Text className='font-bold text-white'>UK</Text>
                        </View>

                        <View>
                            <Text className='font-bold mb-2'>Umesh Bedi</Text>
                            <Text className=' text-xs text-gray-400'>4:27pm . From Kotak Bank</Text>
                        </View>

                    </View>
                    
                    {/* Money Debit and Credit */}
                    <View>
                        <Text style={{color:i%2==0?colors.primary:'red'}}>{i%2==0?"+":"-"}100</Text>
                    </View>

                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({})