import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import MyInput from '../components/MyInput'
import { ScrollView } from 'react-native'
import { useRoute, useTheme, RouteProp } from '@react-navigation/native'
import { ScreenList } from '../../utils/screens'
import UpiMode from '../paymentMode/UpiMode'
import BankMode from '../paymentMode/BankMode'
import CardMode from '../paymentMode/CardMode'

export default function PaymentMethod() {
    const { colors } = useTheme()
    const route = useRoute<RouteProp<ScreenList, 'PaymentMethod'>>()
    const { session, mode, data } = route.params
    console.log(session)
    // const session = "session_svceLVv9JXVzJJx74sI2X3NUqagfhfH4YrDNcfjD-3GaQ21sZjvaSUHJVGXpgWVijorOfSUBL7Dq8MdRE1OdnST_v9DrR7j_D86xs1LuF3Em"
    return (
        <SafeAreaView className='flex-1 justify-between'>
            <Header back name='Proceed Payment' />
            {mode=="upi"&& <UpiMode mode={"upi"} session={session} data={data}/>}
            {mode=="bank"&& <BankMode mode={"bank"} session={session} data={data}/>}
            {mode=="card"&& <CardMode mode={"card"} session={session} data={data}/>}
        </SafeAreaView>
    )
}
