import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'

type Props = {
  selected: string
  setselected: React.Dispatch<React.SetStateAction<string>>
}

const BottomToggle = ({selected , setselected}:Props) => {
    const router = useRouter();
  return (
    <View style={{flexDirection:"row" , justifyContent:"space-between"}}>
      
    <View style={{flexDirection:"row",gap:10, backgroundColor:"#4A4A4A", borderRadius:40}}>
        <Pressable onPress={()=>{setselected("Market")}} style={{
    backgroundColor: selected === "Market" ? "#FF3A0A" : "#4A4A4A",alignItems:"center", justifyContent:"center",width:100, borderRadius:40
  }}>
        <Text style={{color:selected === "Market" ? "white" : "#9d9d9d",fontWeight:"600",fontSize:15}}>Market</Text>
        </Pressable>
        <Pressable onPress={()=>{setselected("Request")}} style={{
    backgroundColor: selected === "Request" ? "#FF3A0A" : "#4A4A4A",alignItems:"center", justifyContent:"center",width:100, borderRadius:40
  }}>
        <Text style={{color:selected === "Request" ? "white" : "#9d9d9d",fontWeight:"600",fontSize:15}}>Request</Text>
        </Pressable>
    </View>

    <Pressable
  style={{
    width:45,
    height:45,
    borderRadius:25,
    backgroundColor:"#FF3A0A",
    justifyContent:"center",
    alignItems:"center"
  }}
  onPress={()=>router.push("/CreatePost")}
>
  <Text style={{color:"white",fontSize:20}}>+</Text>
</Pressable>

    </View>
  )
}

export default BottomToggle

const styles = StyleSheet.create({})