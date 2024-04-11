import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import { RouteProp, useNavigation, useRoute, useTheme, NavigationProp } from '@react-navigation/native'
import MyInput from '../components/MyInput'
import axios from 'axios'
import { apiUrl } from '../../utils/globalvar'
import { ScreenList } from '../../utils/screens'
import Loading from '../components/lottie/Loading'

export default function SendToUpi() {
    const { colors } = useTheme()
    const [isLoading, setIsLoading] = useState(false)
    const [amount, setAmount] = useState(0)
    const [UPI, setUPI] = useState("")

    const route = useRoute<RouteProp<ScreenList, "SendToUpi">>()
    const { balance, uid, upi } = route.params

    const { reset, navigate } = useNavigation<NavigationProp<ScreenList>>()

    function gotToHome() {
        navigate("Drawer")
        reset({
            index: 0,
            routes: [{ name: "Drawer" }]
        })
    }
    // console.log(balance, uid)

    async function handlePayout() {
        if (UPI == "" || amount == 0) return ToastAndroid.show("All Fields are required.", ToastAndroid.SHORT);

        if (amount > balance) return ToastAndroid.show("You don't have sufficient balance", ToastAndroid.SHORT);

        setIsLoading(true)

        await axios.request({
            method: "POST",
            url: apiUrl + "payout",
            data: { amount, transferMode: 'upi', UPI }
        })
            .then(res => {
                const tdata = res.data
                const data = {
                    status: "debit",
                    payment_amount: amount,
                    payment_method: "UPI"
                }

                console.log(res.data)
                updatePayment(data)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }

    async function updatePayment(data: any) {
        await axios.request({
            method: "PUT",
            url: apiUrl + "updatepayment/debit",
            data: { data, uid }
        })
            .then(res => {
                ToastAndroid.show("Payment Successful!", ToastAndroid.LONG)
                setIsLoading(false)
                gotToHome()
            })
            .catch(err => {
                ToastAndroid.show(err.message, ToastAndroid.LONG)
                setIsLoading(false)
                gotToHome()
            })
    }

    useEffect(() => {
        if (upi != "") { setUPI(upi) }
    }, [upi])


    return (
        <SafeAreaView className='flex-1'>
            <Header back name='Send To UPI ID' />
            <View className='flex-1 justify-between p-6'>

                <ScrollView className='flex-1'>
                    <MyInput placeholder='Enter Amount' keyboardType={"number-pad"} onChange={(e) => setAmount(Number(e))} />
                    <MyInput defaultValue={UPI} placeholder='Enter UPI ID' onChange={(e) => setUPI(e)} />

                    <Text className=' text-xs italic'>For testing use UPI ID: "success@upi"</Text>

                </ScrollView>

                <TouchableOpacity className='flex-row justify-center items-center px-5 py-3 rounded-full mt-4' style={{ backgroundColor: colors.primary }} onPress={handlePayout}>
                    <Text className='text-white'>Send Money</Text>
                </TouchableOpacity>
            </View>

            {isLoading&&<Loading/>   }

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})