import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useTheme, NavigationProp } from '@react-navigation/native'
import MyInput from '../components/MyInput'
import axios from 'axios'
import { apiUrl } from '../../utils/globalvar'
import { ScreenList } from '../../utils/screens'



export default function CardMode({ mode = "", session = "", data = {} }) {
    const { colors } = useTheme()
    const [Name, setName] = useState("")
    const [cardNo, setCardNo] = useState("")
    const [cardExM, setCardExM] = useState("")
    const [cardExY, setCardExY] = useState("")
    const [CVV, setCVV] = useState("")

    const { navigate } = useNavigation<NavigationProp<ScreenList>>()

    async function handlePayment() {
        if (Name == ""||cardNo == ""||cardExM == ""||cardExY == ""||CVV == "") return ToastAndroid.show("Enter UPI id.", ToastAndroid.SHORT)
        const pMode = {
            card: {
                channel: 'link',
                card_number: cardNo,
                card_holder_name: Name,
                card_expiry_mm: cardExM,
                card_expiry_yy: cardExY,
                card_cvv: CVV
            },
        }
        // console.log(pMode)
        await axios.request({
            method: "POST",
            url: apiUrl + "orderPayment/" + session,
            // url:apiUrl+"verifyupi",
            data: { pMode }
        })
            .then(res => {
                console.log(res.data)
                const tData = res.data
                const dataTosend = {
                    ...data,
                    cf_payment_id: tData.cf_payment_id,
                    payment_amount: tData.payment_amount,
                    payment_method: tData.payment_method
                }
                navigate("DoPayment", { url: res.data.data.url, data: dataTosend })
            })
            .catch(err => {
                console.log(err.response.data)
                ToastAndroid.show(err.message, ToastAndroid.LONG)
            })
    }

    return (
        <View className='mt-2 p-6 justify-between flex-1'>
            <Text className=' text-base font-bold mb-5'>Card Payment Mode</Text>
            <ScrollView className='flex-1'>
                <MyInput placeholder='Enter Card Holder Name' onChange={(e) => setName(e)} />
                <MyInput placeholder='Enter Card No.' keyboardType={"number-pad"} onChange={(e) => setCardNo(e)} />

                <View className=' flex-row' style={{gap:15}}>
                    <MyInput placeholder='Expiry Month' onChange={(e) => setCardExM(e)} keyboardType={"number-pad"}/>
                    <MyInput placeholder='Expiry Year' onChange={(e) => setCardExY(e)} keyboardType={"number-pad"}/>
                    <MyInput placeholder='CVV' onChange={(e) => setCVV(e)} keyboardType={"number-pad"}/>
                </View>
                
                <Text className=' text-sm text-gray-400 italic'> For testing purpose use card_number: '6074825972083818', card_holder_name: 'Test', card_expiry_mm: '03', card_expiry_yy: '28', card_cvv: '123'</Text>
            </ScrollView>
            <TouchableOpacity className='flex-row items-center justify-center px-5 py-3 rounded-full' style={{ backgroundColor: colors.primary }} onPress={handlePayment}>
                <Text className='text-white'>Make a Payment</Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({})