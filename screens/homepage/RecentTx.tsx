import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'

export default function RecentTx({ pymentHistory = [], showNo=-5 }) {
    const { colors } = useTheme()

    return (
        <View className={`${showNo!=0?"mt-10":"mt-2"} flex-1`} >
            {showNo!=0&&
            <Text className=' font-bold mb-3'>Recent Transactions</Text>
            }
            {pymentHistory.map((item: any, i) => {
                const dateTime = new Date(item.timestamp);

                let formattedHours = dateTime.getHours();
                const amPm = formattedHours >= 12 ? 'PM' : 'AM';
                formattedHours = formattedHours % 12 || 12; // Convert to 12-hour format

                const formattedDate = `${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear().toString().slice(2)}`;
                const formattedTime = `${formattedHours.toString().padStart(2, '0')}:${dateTime.getMinutes().toString().padStart(2, '0')}${amPm}`;

                return (
                    <TouchableOpacity key={i} className='flex-row justify-between items-center p-4 bg-white rounded-xl mx-1 mb-1' style={{ elevation: 5 }} >

                        {/* Name and DP */}
                        <View className='flex-row'>
                            <View className='rounded-full h-10 w-10 justify-center items-center mr-2' style={{backgroundColor:colors.notification}}>
                                <Text className='font-bold text-white'>{(item.payment_method).slice(0,1).toUpperCase()}</Text>
                            </View>

                            <View>
                                <Text className='font-bold text-xs mb-2'>{item.status == "credit" ? "Recieved by" : "Debited by"} {(item.payment_method).toUpperCase()}</Text>
                                <Text className=' text-xs text-gray-400'>{formattedDate} . {formattedTime}</Text>
                            </View>

                        </View>

                        {/* Money Debit and Credit */}
                        <View>
                            <Text style={{ color: item.status == "credit" ? colors.primary : 'red' }}>{item.status == "credit" ? "+" : "-"}{item.payment_amount}</Text>
                        </View>

                    </TouchableOpacity>
                )
            }).slice(showNo).reverse()}
        </View>
    )
}

const styles = StyleSheet.create({})