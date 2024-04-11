import { useFocusEffect, useTheme, useIsFocused, useNavigation, NavigationProp } from '@react-navigation/native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { SafeAreaView, ScrollView, Text, ToastAndroid, View } from 'react-native'
import Header from '../components/Header'
import Wallet from './Wallet'
import Transfer from './Transfer'
import TrxRecord from './TrxRecord'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../components/lottie/Loading'
import axios from 'axios'
import { apiUrl } from '../../utils/globalvar'
import RecentTx from './RecentTx'
import { useAuth } from '../context/MyContext'
import { TouchableOpacity } from 'react-native'
import { ScreenList } from '../../utils/screens'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


export default function Home(props: any) {
  const { colors } = useTheme()
  const [focus, setFocus] = useState(true)
  
  const isFocused = useIsFocused()
  const { navigate } = useNavigation<NavigationProp<ScreenList>>()
  const [userData, setUserData] = useState<any>(null)

  const { uData, updateUser } = useAuth()

  async function getUser() {
    await AsyncStorage.getItem("user", (err, res: any) => {
      const tempUser = JSON.parse(res)
      // setUser(tempUser)
      userDataUpdate(tempUser._id)
    })
  }

  async function userDataUpdate(userid: any) {
    console.log("running function")
    await axios.request({
      method: "GET",
      url: apiUrl + `users/${userid}`
    })
      .then((res) => {
        setUserData(res.data)
        updateUser(res.data)
        // console.log(res.data)
      })
      .catch((err) => {
        console.log("from home.js", err)
        ToastAndroid.show(err.message, ToastAndroid.LONG)
      })

  }

  useEffect(() => {
    console.log(isFocused)
    setFocus(isFocused)
  }, [isFocused])

  useEffect(()=>{
    console.log(focus)
    if (focus) {
      getUser()
    }
  },[focus])

  if (userData == null) return <Loading />

  return (
    <SafeAreaView className='flex-1'>
      {userData != null &&
        <View className='h-full relative'>
          <Header iconPress={() => props.navigation.openDrawer()} />
          <ScrollView className=' px-4' style={{ backgroundColor: colors.background }}>
            <Wallet balance={userData.balance} upi={userData.upi} />
            <Transfer balance={userData.balance} uid={userData._id} paymentHistory={userData.paymentHistory} />
            <RecentTx pymentHistory={userData.paymentHistory} />
          </ScrollView>

          <View className='absolute items-center justify-center w-full bottom-5'>
            <TouchableOpacity className='flex-row justify-center items-center px-5 py-3 rounded-full mt-4' style={{ backgroundColor: colors.primary }} onPress={() => navigate("QRScannerScreen", { balance: userData.balance, uid: userData._id })}>
              <Text className='text-white'><MaterialCommunityIcons name={"qrcode-scan"} /> Scan</Text>
            </TouchableOpacity>
          </View>

        </View>
      }
    </SafeAreaView>
  )
}
