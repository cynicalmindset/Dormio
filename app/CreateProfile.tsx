//import mental peace form heaven hell whatever
import NormalButton from "@/components/NormalButton";
import { useRouter } from "expo-router";
//import React from "react";
import { ScrollView } from "react-native";
import {
    Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
//import { SafeAreaView } from "react-native-safe-area-context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth , db } from "../firebaseConfig";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore"
//import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from "expo-image-picker"
const CreateProfile = () => {
    const router = useRouter();
    const [name,setname] = useState("");
    const [hostel,sethostel] = useState("");
    const [bio,setbio] = useState("");
    const[image,setimage] = useState<string | null>(null)

//image pick karne wala functio 
const pickImage = async () => {

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1
  })

  if (!result.canceled) {
    setimage(result.assets[0].uri)
  }

}



//save button
const handleSaveProfile = async () => {

  try {

    const user = auth.currentUser!

    await setDoc(doc(db,"users",user.uid),{

      name: name,
      hostel: hostel,
      bio: bio,
      photo: image,
      profileComplete: true

    },{ merge:true })

    router.replace("/Home")

  } catch(error:any){

    console.log("profile save error:",error.message)

  }

}

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.top}>
          <Text style={styles.text}>Dormio.</Text>

          <Pressable
  onPress={pickImage}
  style={{
    backgroundColor:"#515151",
    height:300,
    width:"90%",
    borderRadius:20,
    justifyContent:"center",
    alignItems:"center",
    overflow: "hidden"
  }}
>
  {image ? (
    <Image
      source={{ uri: image }}
      style={{ width: "100%", height: "100%" }}
      resizeMode="cover"
    />
  ) : (
    <Text style={{ color: "#868686" }}>Add image</Text>
  )}
</Pressable>

          <TextInput
            placeholder="username"
            placeholderTextColor="#868686"
            style={styles.input}
            onChangeText={setname}
          />

          <TextInput
            placeholder="Hostel"
            placeholderTextColor="#868686"
            style={styles.input}
            onChangeText={sethostel}
          />

          <TextInput
            placeholder="Bio"
            placeholderTextColor="#868686"
            style={styles.input}
            multiline
          onChangeText={setbio}
          />
        </View>

        <View style={styles.bottom}>
          <NormalButton title="Save" onPress={handleSaveProfile} />        
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default CreateProfile

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
})