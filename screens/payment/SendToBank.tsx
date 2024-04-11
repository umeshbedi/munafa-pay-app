import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import { RouteProp, useNavigation, useRoute, useTheme, NavigationProp } from '@react-navigation/native'
import MyInput from '../components/MyInput'
import axios from 'axios'
import { apiUrl } from '../../utils/globalvar'
import { ScreenList } from '../../utils/screens'
import Loading from '../components/lottie/Loading'

export default function SendToBank() {
    const { colors } = useTheme()

    const [name, setName] = useState("John Doe")
    const [IFSC, setIFSC] = useState("YESB0000262")
    const [account, setAccount] = useState("026291800001191")
    const [accountRe, setAccountRe] = useState("026291800001191")
    const [amount, setAmount] = useState(0)

    const [isLoading, setIsLoading] = useState(false)

    const route = useRoute<RouteProp<ScreenList, "SendToBank">>()
    const { balance, uid } = route.params

    const { reset, navigate, goBack } = useNavigation<NavigationProp<ScreenList>>()

    function gotToHome() {
        navigate("Drawer")
        reset({
            index: 0,
            routes: [{ name: "Drawer" }]
        })
    }
    // console.log(balance, uid)

    async function handlePayout() {
        if (account !== accountRe) {
            ToastAndroid.show("Recheck Account No.", ToastAndroid.SHORT);
            return;
        }

        if (account == "" || name == "" || IFSC == "" || amount == 0) return ToastAndroid.show("All Fields are required.", ToastAndroid.SHORT);

        if (amount > balance) return ToastAndroid.show("You don't have sufficient balance", ToastAndroid.SHORT);

        setIsLoading(true)
        await axios.request({
            method: "POST",
            url: apiUrl + "payout",
            data: { name, IFSC, account, amount: amount, transferMode: 'banktransfer' }
        })
            .then(res => {
                const tdata = res.data
                const data = {
                    status: "debit",
                    payment_amount: amount,
                    payment_method: "Bank"
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
                goBack()
                setIsLoading(false)
            })
            .catch(err => {
                ToastAndroid.show(err.message, ToastAndroid.LONG)
                goBack()
                setIsLoading(false)
            })
    }

    return (
        <SafeAreaView className='flex-1'>
            <Header back name='Send To Bank' />
            <View className='flex-1 justify-between p-6'>

                <ScrollView className='flex-1'>
                    <MyInput placeholder='Enter Amount' keyboardType={"number-pad"} onChange={(e) => setAmount(Number(e))} />
                    <MyInput placeholder='Enter Name' onChange={(e) => setName(e)} />
                    <MyInput placeholder='IFSC Code' onChange={(e) => setIFSC(e)} />
                    <MyInput placeholder='Account Number' onChange={(e) => setAccount(e)} />
                    <MyInput placeholder='Re-Enter Account Number' onChange={(e) => setAccountRe(e)} />
                    <MyInput placeholder='Add Nick Name (optional)' />
                    <Text className=' text-xs italic'>For testing use bank_account_number: '026291800001191', bank_ifsc: 'YESB0000262', beneficiary_name: 'John Doe'</Text>

                </ScrollView>

                <TouchableOpacity className='flex-row justify-center items-center px-5 py-3 rounded-full mt-4' style={{ backgroundColor: colors.primary }} onPress={handlePayout}>
                    <Text className='text-white'>Send Money</Text>
                </TouchableOpacity>
            </View>

            {isLoading && <Loading />}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})