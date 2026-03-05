import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../components/Button'
import { useRouter } from 'expo-router'
const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter()
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <Text style={{fontWeight:800, fontSize:30
        }}>Start Your Journey</Text>
        <Button title='Welcome    ->' onPress={()=>router.push("./Welcome")}></Button>
      </View>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    gap:20
  }
  ,text:{
    
  }
})