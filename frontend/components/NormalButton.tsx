
import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { opacity } from 'react-native-reanimated/lib/typescript/Colors'
// import { useRouter } from 'expo-router'
type props = {
    title:string,
    onPress:()=>void,
}
const Button = ({title,onPress}:props) => {
    // const router = useRouter()
    const Animbut = Animated.createAnimatedComponent(Pressable);
    const scale = useSharedValue(1);
    const animation = useAnimatedStyle(()=>{
        let opacityval;
        if(scale.value<1){
            opacityval = 0.7
        }
        else{
            opacityval = 1
        }
        return{
            transform:[{scale:scale.value}],
            opacity:opacityval
        }
    })

  return (
    <Animbut
    onPress={onPress}
    onPressIn={()=>scale.value = withSpring(0.8)}
    onPressOut = {()=>scale.value = withSpring(1)}
     style={[
          styles.button,
          animation
        ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Animbut>
  )
}

export default Button

const styles = StyleSheet.create({
    button:{
       width:"90%",
            height:60,
            backgroundColor:"#FF3A0A",
            borderRadius:10,
            justifyContent:"center",
            alignItems:"center" 
    },
    text:{
        fontWeight:500,
        fontSize:20,
        color:"white"
    }
})