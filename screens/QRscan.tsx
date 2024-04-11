import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import { useTheme, useNavigation, NavigationProp, useRoute, RouteProp } from '@react-navigation/native'
import Feather from "react-native-vector-icons/Feather"
import MyInput from './components/MyInput';
import { ScreenList } from '../utils/screens';
import { useAuth } from './context/MyContext';

const QRScannerScreen = () => {

    const { hasPermission, requestPermission } = useCameraPermission()
    const device = useCameraDevice('back')
    const [scantimes, setScantimes] = useState(0)

    const { navigate } = useNavigation<NavigationProp<ScreenList>>()
    const route = useRoute<RouteProp<ScreenList, "QRScannerScreen">>()
    const { balance, uid } = route.params

    const {uData} = useAuth()

    useEffect(() => {
        if (!hasPermission) {
            requestPermission()
        }
    }, [])



    function NoCameraDeviceError() {
        return (
            <View>
                <Text>No camera found. Ga back and try again.</Text>
            </View>
        )
    }

    function parseUPIUrl(url: any) {
        const isPa = url.slice(10, 12)
        
        if (isPa != "pa") {
            setScantimes(0)
            return ToastAndroid.show("Invalid QR code for payment.", ToastAndroid.SHORT)
        }

        let paList = []
        for (let index = 13; index < url.length; index++) {
            if (url[index] != "&") {
                paList.push(url[index])
            } else {
                break
            }
        }
        const newUPI = paList.join("")
        navigate("SendToUpi", { uid: uData._id, upi: newUPI, balance: balance })
        console.log(newUPI)
    }


    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            setScantimes(scantimes + 1)
            // console.log(codes[0].value)
            if (scantimes == 0) {
                parseUPIUrl(codes[0].value);
            }

        }
    })


    if (device == null) return <NoCameraDeviceError />

    return (
        <Camera
            style={{ flex: 1, alignItems: 'center', justifyContent: "flex-end" }}
            device={device}
            isActive={true}
            codeScanner={codeScanner}
        >

        </Camera>
    );
};



export default QRScannerScreen;
