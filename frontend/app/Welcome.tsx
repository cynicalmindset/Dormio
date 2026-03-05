import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
//import Buttom from '../components/Button'
const Welcome = () => {
  const router = useRouter();
  useEffect(()=>{
    const timer = setTimeout(()=>{
      router.push("/Register")
    },2000)

    return ()=>clearTimeout(timer)
  },[])

  return (
    <SafeAreaView style={{flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"#FF3A0A"}}>
      <Text style={{fontSize:50 , fontWeight:800 , color:"white"}}>Dormio</Text>      
    </SafeAreaView>
  )
}

export default Welcome

const styles = StyleSheet.create({})