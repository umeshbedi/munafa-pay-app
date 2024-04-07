import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from './components/Header'
import { useTheme } from '@react-navigation/native'

export default function SendTo() {
    const { colors } = useTheme()
    function MyInput({ placeholder = "" }) {
        return <TextInput
            placeholder={placeholder}
            className='border border-gray-200 rounded-xl p-4 mb-3'
        />
    }


    async function getWallet(){
        fetch("http://192.168.45.155:8000/api/payout")
        .then(res=>res.json())
        .then(data=>console.log(data))
        .catch(e=>console.log(e))
    }


    return (
        <SafeAreaView className='flex-1 justify-between'>
            <Header back name='Send To' />

            <ScrollView className='mt-2 px-4'>
                <MyInput placeholder='Enter Name' />
                <MyInput placeholder='IFSC Code' />
                <MyInput placeholder='Account Number' />
                <MyInput placeholder='Re-Enter Account Number' />
                <MyInput placeholder='Add Nick Name' />
            </ScrollView>

            <TouchableOpacity className='flex-row items-center px-5 py-3 rounded-full' style={{ backgroundColor: colors.primary }}
            onPress={getWallet}
            >
                <Text className='text-white'>Add Money</Text>

            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})