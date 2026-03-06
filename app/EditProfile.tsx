import { StyleSheet, Text, View, TextInput, Pressable, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from "expo-image-picker"
import { auth, db } from '@/firebaseConfig'
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { hostels } from '@/constants/hostellist'
import { router } from 'expo-router'

const EditProfile = () => {

const [image,setImage] = useState<string | null>(null)
const [name,setName] = useState("")
const [bio,setBio] = useState("")
const [hostel,setHostel] = useState("")

// fetch existing user data
useEffect(()=>{

const fetchUser = async ()=>{

const user = auth.currentUser
if(!user) return

const docRef = doc(db,"users",user.uid)
const docSnap = await getDoc(docRef)

if(docSnap.exists()){
const data = docSnap.data()
setName(data.name)
setBio(data.bio)
setHostel(data.hostel)
setImage(data.photo)
}

}

fetchUser()

},[])


// pick profile image
const pickImage = async () => {

const result = await ImagePicker.launchImageLibraryAsync({
mediaTypes: ImagePicker.MediaTypeOptions.Images,
quality:1
})

if(!result.canceled){
setImage(result.assets[0].uri)
}

}


// save profile
const handleSave = async () => {

const user = auth.currentUser
if(!user) return

await updateDoc(doc(db,"users",user.uid),{
name,
bio,
hostel,
photo:image
})

router.back()

}


// delete account
const handleDeleteAccount = async () => {

const user = auth.currentUser
if(!user) return

await deleteDoc(doc(db,"users",user.uid))
await user.delete()

router.replace("/Login")

}


return (

<SafeAreaView style={styles.safe}>

<ScrollView contentContainerStyle={styles.container}>

{/* IMAGE */}

<Pressable onPress={pickImage} style={styles.imageBox}>

{image ? (
<Image source={{uri:image}} style={styles.image}/>
) : (
<Text style={{color:"#868686"}}>Add Photo</Text>
)}

</Pressable>


{/* NAME */}

<TextInput
placeholder="Name"
placeholderTextColor="#868686"
value={name}
onChangeText={setName}
style={styles.input}
/>


{/* BIO */}

<TextInput
placeholder="Bio"
placeholderTextColor="#868686"
value={bio}
onChangeText={setBio}
style={[styles.input,{height:100}]}
multiline
/>


{/* HOSTEL SELECT */}

<ScrollView horizontal showsHorizontalScrollIndicator={false}>

{hostels.map((item)=>(

<Pressable
key={item}
onPress={()=>setHostel(item)}
style={{
paddingHorizontal:15,
paddingVertical:8,
borderRadius:15,
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


{/* SAVE BUTTON */}

<Pressable style={styles.saveBtn} onPress={handleSave}>
<Text style={{color:"white",fontWeight:"600"}}>Save Changes</Text>
</Pressable>


{/* DELETE ACCOUNT */}

<Pressable style={styles.deleteBtn} onPress={handleDeleteAccount}>
<Text style={{color:"white"}}>Delete Account</Text>
</Pressable>

</ScrollView>

</SafeAreaView>

)

}

export default EditProfile


const styles = StyleSheet.create({

safe:{
flex:1,
backgroundColor:"#3A3A3A"
},

container:{
padding:20,
gap:20
},

imageBox:{
height:120,
width:120,
backgroundColor:"#4A4A4A",
borderRadius:20,
alignSelf:"center",
justifyContent:"center",
alignItems:"center",
overflow:"hidden"
},

image:{
height:"100%",
width:"100%"
},

input:{
backgroundColor:"#4A4A4A",
padding:15,
borderRadius:15,
color:"white"
},

saveBtn:{
backgroundColor:"#FF3A0A",
padding:15,
borderRadius:12,
alignItems:"center",
marginTop:10
},

deleteBtn:{
backgroundColor:"#8B0000",
padding:15,
borderRadius:12,
alignItems:"center",
marginTop:30
}

})