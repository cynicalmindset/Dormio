import { View, Text, Image, StyleSheet } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

const PostDetail = () => {

  const { name, description, price, image } = useLocalSearchParams()

  return (

    <SafeAreaView style={{flex:1,backgroundColor:"#3A3A3A"}}>

      <Image
        source={{uri:image as string}}
        style={{width:"100%",height:300}}
      />

      <View style={{padding:20,gap:10}}>

        <Text style={{color:"white",fontSize:22,fontWeight:"700"}}>
          {name}
        </Text>

        <Text style={{color:"#bdbdbd"}}>
          {description}
        </Text>

        <Text style={{color:"#FF3A0A",fontSize:18,fontWeight:"600"}}>
          Rs. {price}
        </Text>

      </View>

    </SafeAreaView>

  )
}

export default PostDetail