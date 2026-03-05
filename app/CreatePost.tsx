import { StyleSheet, Text, View, TextInput, Pressable, Image,ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NormalButton from '@/components/NormalButton'
import * as ImagePicker from "expo-image-picker"
import { collection, addDoc } from "firebase/firestore"
import { db, auth } from "../firebaseConfig"
import { useRouter } from "expo-router"
import { hostels } from "@/constants/hostellist"
const CreatePost = () => {

  const router = useRouter()
  const [hostel,sethostel] = useState(hostels[0])
  const [mode,setMode] = useState("Market")
  const [image,setImage] = useState<string | null>(null)
  const [name,setName] = useState("")
  const [description,setDescription] = useState("")
//   const [selectedHostel,setSelectedHostel] = useState("")
  const [price,setPrice] = useState("")

  const pickImage = async () => {

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality:1
    })

    if(!result.canceled){
      setImage(result.assets[0].uri)
    }

  }

  const handlesave = async ()=>{

    try{

      const user = auth.currentUser

      await addDoc(collection(db,"posts"),{
        name,
        description,
        price,
        mode,
        image,
        userId:user?.uid,
        hostel,
        createdAt:new Date()
      })

      router.back()

    }catch(error){
      console.log(error)
    }

  }

  return (

    <SafeAreaView style={styles.safe}>

      <View style={styles.container}>

        <View style={{flexDirection:"column",gap:30,width:"100%"}}>

        {/* Mode Toggle */}

        <View style={styles.toggleContainer}>

          <Pressable
            onPress={()=>setMode("Market")}
            style={[
              styles.toggleButton,
              mode === "Market" && styles.activeToggle
            ]}
          >
            <Text style={styles.toggleText}>Market</Text>
          </Pressable>

          <Pressable
            onPress={()=>setMode("Request")}
            style={[
              styles.toggleButton,
              mode === "Request" && styles.activeToggle
            ]}
          >
            <Text style={styles.toggleText}>Request</Text>
          </Pressable>

        </View>


        {/* Image Picker */}

        <Pressable onPress={pickImage} style={styles.imageBox}>

          {image ? (
            <Image source={{uri:image}} style={styles.image}/>
          ) : (
            <Text style={{color:"#868686"}}>Add Image</Text>
          )}

        </Pressable>


        {/* hostel selecte */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>

{hostels.map((item)=>(
  
  <Pressable
    key={item}
    onPress={()=>sethostel(item)}
    style={{
      paddingHorizontal:20,
      paddingVertical:10,
      borderRadius:20,
      backgroundColor:hostel === item ? "#FF3A0A" : "#4A4A4A",
      marginRight:10
    }}
  >

  <Text style={{
    color:hostel === item ? "white" : "#9d9d9d"
  }}>
    {item}
  </Text>

  </Pressable>

))}

</ScrollView>


        {/* Name */}

        <TextInput
          placeholder="Item Name"
          placeholderTextColor="#868686"
          style={styles.input}
          onChangeText={setName}
        />


        {/* Description */}

        <TextInput
          placeholder="Description"
          placeholderTextColor="#868686"
          style={[styles.input,{height:120,textAlignVertical:"top"}]}
          multiline
          onChangeText={setDescription}
        />


        {/* Price */}

        <TextInput
          placeholder="Price"
          placeholderTextColor="#868686"
          style={styles.input}
          keyboardType="numeric"
          onChangeText={setPrice}
        />
        </View>


        {/* Save Button */}

        <NormalButton title="Save" onPress={handlesave} />

      </View>

    </SafeAreaView>

  )
}

export default CreatePost

const styles = StyleSheet.create({

  safe:{
    flex:1,
    backgroundColor:"#3A3A3A",
    alignItems:"center"
  },

  container:{
    flex:1,
    paddingHorizontal:20,
    gap:20,
    justifyContent:"space-between",
    alignItems:"center",
    width:"100%",
    marginHorizontal:20,
    marginVertical:20
  },

  toggleContainer:{
    flexDirection:"row",
    backgroundColor:"#4A4A4A",
    borderRadius:30,
    padding:4
  },

  toggleButton:{
    flex:1,
    alignItems:"center",
    paddingVertical:10,
    borderRadius:30
  },

  activeToggle:{
    backgroundColor:"#FF3A0A"
  },

  toggleText:{
    color:"white",
    fontWeight:"600"
  },

  imageBox:{
    height:200,
    width:"100%",
    backgroundColor:"#515151",
    borderRadius:20,
    justifyContent:"center",
    alignItems:"center",
    overflow:"hidden"
  },

  image:{
    width:"100%",
    height:"100%"
  },

  input:{
    height:60,
    backgroundColor:"#515151",
    borderRadius:15,
    paddingHorizontal:20,
    color:"white",
    width:"100%",
  }

})