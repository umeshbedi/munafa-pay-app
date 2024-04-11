import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useTheme, NavigationProp } from '@react-navigation/native'
import MyInput from '../components/MyInput'
import axios from 'axios'
import { apiUrl } from '../../utils/globalvar'
import { ScreenList } from '../../utils/screens'


export default function UpiMode({ mode = "", session = "", data={} }) {
    const { colors } = useTheme()
    const [upi, setUpi] = useState("")
    const {navigate} = useNavigation<NavigationProp<ScreenList>>()

    async function handlePayment() {
        if(upi=="")return ToastAndroid.show("Enter UPI id.", ToastAndroid.SHORT)
        const pMode = {
            upi: {
                channel: 'collect',
                upi_id: upi,
                upi_redirect_url: true,
                upi_expiry_minutes: 10
            },
        }
        // console.log(pMode)
        await axios.request({
            method: "POST",
            url: apiUrl + "orderPayment/" + session,
            // url:apiUrl+"verifyupi",
            data: { pMode }
        })
        .then(res=>{
            console.log(res.data)
            const tData = res.data
            const dataTosend = {
                ...data,
                cf_payment_id:tData.cf_payment_id,
                payment_amount:tData.payment_amount,
                payment_method:tData.payment_method
            }
            navigate("DoPayment", {url:res.data.data.url, data:dataTosend})
        })
        .catch(err=>{
            console.log(err.response.data)
            ToastAndroid.show(err.message, ToastAndroid.LONG)
        })
    }

    return (
        <View className='mt-2 p-6 justify-between flex-1'>
            <Text className=' text-base font-bold mb-5'>UPI Payment Mode</Text>
            <View className='flex-1'>
                <MyInput placeholder='Enter UPI ID' onChange={(e) => setUpi(e)} />
                <Text className=' text-sm text-gray-400 italic'> For testing purpose use "success@upi", "failure@upi" or "pending@upi"</Text>
            </View>
            <TouchableOpacity className='flex-row items-center justify-center px-5 py-3 rounded-full' style={{ backgroundColor: colors.primary }} onPress={handlePayment}>
                <Text className='text-white'>Make a Payment</Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({})