import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationProp, useNavigation, useTheme } from '@react-navigation/native'
import { ScreenList } from '../../utils/screens'

export default function Transfer() {
    const { colors } = useTheme()
    const { navigate } = useNavigation<NavigationProp<ScreenList>>()
    const tsIcons = [
        { name: `Bank${'\n'}Transfer`, icon: 'bank-outline', func: () => navigate("SendTo") },
        { name: `Scan${'\n'}QR Code`, icon: 'qrcode-scan', func: () => void (0) },
        { name: `UPI${'\n'}Transfer`, icon: 'at', func: () => void (0) },
        { name: `View${'\n'}Expenses`, icon: 'file-document-outline', func: () => void (0) },
    ]

    return (
        <View className='mt-12 flex-row justify-between px-6'>
            {tsIcons.map((item, i) => (
                <View key={i}>
                    <TouchableOpacity className='p-5 bg-white rounded-xl' style={{ elevation: 5 }} onPress={item.func}>
                        <MaterialCommunityIcons name={item.icon} size={25} />
                    </TouchableOpacity>
                    <Text className=' text-center text-xs mt-2' style={{ color: colors.text }}>{item.name}</Text>
                </View>
            ))}
        </View>
    )
}

