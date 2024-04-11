import { Modal, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useTheme, useNavigation, NavigationProp } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient';
import Feather from "react-native-vector-icons/Feather"
import { customColors } from '../../utils/ColorTheme';
import MyInput from '../components/MyInput';
import axios from 'axios';
import { apiUrl } from '../../utils/globalvar';
import { ScreenList } from '../../utils/screens';
import RadioButton from '../components/RadioButton';


export default function Wallet({ balance = "", upi = "" }) {
  const { colors } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const [amount, setAmount] = useState(0)
  const [selectedOption, setSelectedOption] = useState("");

  const { navigate } = useNavigation<NavigationProp<ScreenList>>()

  async function createOrder() {
    if (amount == 0 || selectedOption == "") return ToastAndroid.show("Enter 1 or more amount and Select payment mode", ToastAndroid.SHORT)
    const baseurl = apiUrl + "orderPayment"
    await axios.request({
      method: "POST",
      url: baseurl,
      data: { amount, returnUrl:baseurl+"/success", notifyUrl:baseurl+"/notify" }
    })
      .then(res => {
        console.log(res.data)
        const data = res.data
        setIsVisible(false)
        const dataToSend = {
          cf_order_id:data.cf_order_id,
          customer_id:data.customer_details.customer_id,
          order_id:data.order_id,
          notify_url:data.order_meta.notify_url,
          return_url:data.order_meta.return_url,
          status:"credit"
          }
        navigate("PaymentMethod", { session: res.data.payment_session_id, mode:selectedOption, data:dataToSend })
      })
      .catch(err => {
        console.log(err)
        ToastAndroid.show(err.message, ToastAndroid.LONG)
      })
  }


  return (
    <View>

      <LinearGradient colors={[customColors.lightGreen, customColors.lightOrange]} useAngle angle={90} style={{ borderRadius: 20 }} className='px-8 py-7'>
        <View className='p-4 mb-3' style={{ backgroundColor: colors.primary, borderRadius: 10 }}>
          <Text className='text-white mb-2'>Wallet Balance</Text>
          <Text className='text-white text-2xl font-semibold'>₹{balance}</Text>
        </View>
        <Text className='text-white mb-3'>UIP ID: {upi == "" ? "..........." : upi}  <Feather name='copy' /></Text>

        <TouchableOpacity className='flex-row items-center self-start px-5 py-3 rounded-full' style={{ backgroundColor: colors.primary }} onPress={() => setIsVisible(true)} >
          <Text className='text-white'>Add Money</Text>
          <Feather name='chevron-right' size={18} style={{ color: 'white' }} />
        </TouchableOpacity>

      </LinearGradient>

      {/* Add Payment Popup */}
      <Modal visible={isVisible} transparent animationType='fade'>

        <View className='flex-1 justify-center items-center p-6' style={{ backgroundColor: "rgba(0,0,0,.5)" }}>
          <View className=' rounded-xl bg-white p-6 w-full relative'>

            <TouchableOpacity onPress={() => setIsVisible(false)} className=' absolute right-5 top-5 p-1 rounded-full' style={{ backgroundColor: colors.notification }}>
              <Feather name='x' size={20} color={"white"} />
            </TouchableOpacity>

            <View style={{ gap: 20 }}>
              <Text className=' text-base font-bold' style={{ color: colors.text }}>Add Amount</Text>
              <MyInput placeholder='Enter Amount' keyboardType='number-pad' onChange={(e) => setAmount(Number(e))} />

              {/* Select payment mode section */}
              <Text className=' text-base font-bold' style={{ color: colors.text }}>Select Payment Mode</Text>
              <RadioButton handleSelectOption={() => setSelectedOption("upi")} text='UPI' toSelect='upi' selected={selectedOption} />
              <RadioButton handleSelectOption={() => setSelectedOption("card")} text='Credit/Debit Card' toSelect='card' selected={selectedOption} />
              <RadioButton handleSelectOption={() => setSelectedOption("bank")} text='Bank' toSelect='bank' selected={selectedOption} />

              <TouchableOpacity className='flex-row items-center mt-3 px-5 py-4 rounded-full justify-center' style={{ backgroundColor: colors.primary }} onPress={createOrder}>
                <Text className='text-white'>Proceed Payment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

