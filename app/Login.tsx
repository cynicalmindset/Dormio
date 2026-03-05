import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NormalButton from "@/components/NormalButton";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebaseConfig"

const Login = () => {
    const router = useRouter();
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");


    const handlelogin = async ()=>{

        try{
            const userCredentail = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )
            router.replace("/Home")
            

        }
        catch(error:any){
            console.log("error in login: ",error.message)
        }
    }


   // const router = useRouter();
  return (
     <SafeAreaView style={styles.safe}>
      
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >

       
        <View style={styles.top}>
          <Text style={styles.text}>Dormio.</Text>

          <TextInput
            placeholder="email"
            placeholderTextColor="#868686"
            style={styles.input}
            onChangeText={setemail}
          />

          <TextInput
            placeholder="password"
            placeholderTextColor="#868686"
            style={styles.input}
            secureTextEntry
            onChangeText={setpassword}
          />
            

        </View>

       
        
        <View style={styles.bottom}>
          <NormalButton title="Login" onPress={handlelogin} />
            <View style={{flexDirection:"row" , gap:5}}>
          <Text style={{
            fontSize:12,
            color:"white"
          }}>Don't have an account ?</Text>
            <Pressable onPress={()=>router.push("./Register")}>
                <Text
                style={{
                  fontSize:12,
            color:"#FF3A0A",
            fontWeight:600  
                }}>Register</Text>
            </Pressable>
            </View>
        </View>

      </KeyboardAvoidingView>

    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
    safe: {
    flex: 1,
    backgroundColor: "#3A3A3A"
  },

  container: {
    flex: 1,
    justifyContent: "space-between"
  },

  top: {
    alignItems: "center",
    gap: 20,
    marginTop: 40
  },

  bottom: {
    alignItems: "center",
    marginBottom:20,
    gap:30,
    flexDirection:"column"
  },

  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 35,
    marginBottom: 30
  },

  input: {
    width: "90%",
    height: 70,
    backgroundColor: "#515151",
    borderRadius: 20,
    paddingHorizontal: 30,
    color: "white"
  }
})