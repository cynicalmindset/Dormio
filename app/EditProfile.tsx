import { StyleSheet, Text, View, TextInput, Pressable, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from "expo-image-picker"
import { auth, db } from '@/firebaseConfig'
import { doc, getDoc, updateDoc, deleteDoc, query, collection, where, getDocs } from 'firebase/firestore'
import { hostels } from '@/constants/hostellist'
import { router } from 'expo-router'
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth"

const EditProfile = () => {

const [image,setImage] = useState(null)
const [name,setName] = useState("")
const [bio,setBio] = useState("")
const [hostel,setHostel] = useState("")
const [password,setPassword] = useState("")

/* FETCH USER DATA */

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


/* PICK IMAGE */

const pickImage = async () => {

const result = await ImagePicker.launchImageLibraryAsync({
mediaTypes: ImagePicker.MediaTypeOptions.Images,
quality:1
})

if(!result.canceled){
setImage(result.assets[0].uri)
}

}


/* SAVE PROFILE */

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


/* DELETE ACCOUNT */

const handleDeleteAccount = async () => {

try{

const user = auth.currentUser
if(!user) return

if(!password){
alert("Enter password to confirm deletion")
return
}

/* REAUTHENTICATE USER */

const credential = EmailAuthProvider.credential(
user.email,
password
)

await reauthenticateWithCredential(user,credential)

/* DELETE AUTH USER */

await user.delete()

/* DELETE USER POSTS */

const q = query(
collection(db,"posts"),
where("userId","==",user.uid)
)

const snapshot = await getDocs(q)

const deletes = snapshot.docs.map(post =>
deleteDoc(post.ref)
)

await Promise.all(deletes)

/* DELETE USER PROFILE */

await deleteDoc(doc(db,"users",user.uid))

router.replace("/Register")

}catch(error){
console.log("Delete account error:",error)
alert("Account deletion failed. Check password.")
}

}


return (

<SafeAreaView style={styles.safe}>

<ScrollView contentContainerStyle={styles.container}>

{/* PROFILE IMAGE */}

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


{/* HOSTEL */}

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


{/* SAVE */}

<Pressable style={styles.saveBtn} onPress={handleSave}>
<Text style={{color:"white",fontWeight:"600"}}>Save Changes</Text>
</Pressable>


{/* PASSWORD FOR DELETE */}

<TextInput
placeholder="Enter password to delete account"
placeholderTextColor="#868686"
value={password}
onChangeText={setPassword}
secureTextEntry
style={styles.input}
/>


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
marginTop:20
}

})