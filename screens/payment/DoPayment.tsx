import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { WebView, WebViewNavigation } from 'react-native-webview';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ScreenList } from '../../utils/screens';
import axios from 'axios';
import { apiUrl } from '../../utils/globalvar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DoPayment() {

  const route = useRoute<RouteProp<ScreenList, "DoPayment">>()
  const { url, data } = route.params

  const [isTargeUrl, setIsTargeUrl] = useState(false)
  const [uid, setUid] = useState("")

  const webViewRef = useRef<WebView>(null);

  const {reset, navigate} = useNavigation<NavigationProp<ScreenList>>()

  function webChange(navstate: WebViewNavigation) {
    const { url } = navstate;
    if (url === data.return_url) {
      // console.log('Now it is on: ', url);
      setIsTargeUrl(true)
    }
  }

  function gotToHome(){
    navigate("Login")
        reset({
            index: 0,
            routes: [{ name: "Login" }]
        })
  }

  async function updatePayment() {
    await axios.request({
      method: "PUT",
      url: apiUrl + "updatepayment/credit",
      data: { data, uid }
    })
      .then(res => {
        ToastAndroid.show("Payment Successful!", ToastAndroid.LONG)
        gotToHome()
      })
      .catch(err => {
        ToastAndroid.show(err.message, ToastAndroid.LONG)
        gotToHome()
      })
  }

  useEffect(() => {
    if (isTargeUrl) {
      updatePayment()
    }
  }, [isTargeUrl])

  useEffect(() => {
    AsyncStorage.getItem("user", (err, res: any) => {
      const tempUser = JSON.parse(res)
      if (res != null) { setUid(tempUser._id) }
    })
  }, [])


  // console.log(data)

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: url }} style={{ flex: 1 }}
      onNavigationStateChange={webChange}
    />
  )
}

