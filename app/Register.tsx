//import mental peace form heaven hell whatever
import NormalButton from "@/components/NormalButton";
import { useRouter } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth , db } from "../firebaseConfig";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore"

//code wala fucntion ladleeee , function wala code ladleeeee

const Register = () => {

  const [username , setusername] = useState("");
  const [email , setemail] = useState("");
  const [password, setpassword] = useState("");

const router = useRouter();
  //register wala function beta ji
  const handleRegister = async () =>{
    try{
      console.log("starting register");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user;
      console.log("auth success");
      await setDoc(doc(db,"users",user.uid),{
        username:username,
        email:email,
        createdAt: new Date()
      });
      console.log("User created, navigating...");
      router.replace("/CreateProfile")

    }catch(error:any){
      console.log("error in register: ",error.message)
    }
  };


  
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.top}>
          <Text style={styles.text}>Dormio.</Text>

          <TextInput
            placeholder="username"
            placeholderTextColor="#868686"
            style={styles.input}
            onChangeText={setusername}
          />

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
          <NormalButton title="Register" onPress={handleRegister} />
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text
              style={{
                fontSize: 12,
                color: "white",
              }}
            >
              Already have an account ?
            </Text>
            <Pressable onPress={() => router.push("/Login")}>
              <Text
                style={{
                  fontSize: 12,
                  color: "#FF3A0A",
                  fontWeight: 600,
                }}
              >
                Sign in
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#3A3A3A",
  },

  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  top: {
    alignItems: "center",
    gap: 20,
    marginTop: 40,
  },

  bottom: {
    alignItems: "center",
    marginBottom: 20,
    gap: 30,
    flexDirection: "column",
  },

  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 35,
    marginBottom: 30,
  },

  input: {
    width: "90%",
    height: 70,
    backgroundColor: "#515151",
    borderRadius: 20,
    paddingHorizontal: 30,
    color: "white",
  },
});
