import { View, Text, Image, StyleSheet, ScrollView, Pressable } from "react-native"
import { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { auth, db } from "../firebaseConfig"
import { doc, getDoc, collection, query, where, getDocs, deleteDoc } from "firebase/firestore"
import { useRouter } from "expo-router"
const Profile = () => {
  const [user,setUser] = useState<any>(null)
const [posts,setPosts] = useState<any[]>([])
useEffect(()=>{
  const fetchProfile = async () => {
    const currentUser = auth.currentUser
    if(!currentUser) return
    const uid = currentUser.uid
    // fetch user info
    const userRef = doc(db,"users",uid)
    const userSnap = await getDoc(userRef)
    if(userSnap.exists()){
      setUser(userSnap.data())
    }
    // fetch user's posts
    const q = query(
      collection(db,"posts"),
      where("userId","==",uid)
    )
    const snapshot = await getDocs(q)
    const data = snapshot.docs.map(doc => ({
      id:doc.id,
      ...doc.data()
    }))
    setPosts(data)
  }
  fetchProfile()
},[])


const handleDelete = async (postId:string) => {

  try{

    await deleteDoc(doc(db,"posts",postId))

    // remove from UI
    setPosts(prev => prev.filter(post => post.id !== postId))

  }catch(error){
    console.log("Delete error:",error)
  }

}

const router = useRouter();

  return (
<SafeAreaView style={styles.container}>
  <ScrollView>

    {/* PROFILE HEADER */}

    {user && (
      <View style={styles.header}>
        <View style={{flexDirection:"row",flex:1, justifyContent:"space-between"}}>
        <Image
          source={{uri:user.photo}}
          style={styles.avatar}
        />
        <Pressable onPress={()=>{router.push("./EditProfile")}} style={{backgroundColor:"#FF3A0A" , paddingHorizontal:30 , height:40, alignItems:"center", justifyContent:"center",borderRadius:20}}>
          <Text style={{color:"white",fontWeight:"600"}}>Edit</Text>
        </Pressable>
        </View>

        <Text style={styles.name}>
          Hi, {user.name}
        </Text>

        <Text style={styles.hostel}>
          {user.hostel}
        </Text>

        <Text style={styles.bio}>
          {user.bio}
        </Text>

      </View>
    )}


    {/* LISTINGS */}
<View style={{backgroundColor:"#FF3A0A" , borderRadius:10 , height:30 , paddingHorizontal:10, width:"35%",alignItems:"center", justifyContent:"center",marginBottom:15}}>
    <Text style={styles.sectionTitle}>
      Your Listings
    </Text>
    </View>

    {posts.map(post => (

      <View key={post.id} style={styles.card}>

        <Image
          source={{uri:post.image}}
          style={styles.product}
        />

        <View style={{flex:1}}>

          <Text style={styles.title}>
            {post.name}
          </Text>

          <Text numberOfLines={2} style={styles.desc}>
            {post.description}
          </Text>

          <Pressable onPress={()=>handleDelete(post.id)} style={styles.deleteBtn}>
            <Text style={{color:"white"}}>Delete</Text>
          </Pressable>

        </View>

      </View>

    ))}

  </ScrollView>

</SafeAreaView>
)}

export default Profile

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#3A3A3A",
padding:20
},

header:{
marginBottom:30
},

avatar:{
height:150,
width:150,
borderRadius:20,
marginBottom:10
},

name:{
color:"white",
fontSize:32,
fontWeight:"700",
marginTop:10,
marginBottom:5
},

hostel:{
color:"#bdbdbd"
},

bio:{
color:"white",
marginTop:5
},

sectionTitle:{
color:"white",
fontSize:18,


},

card:{
flexDirection:"row",
backgroundColor:"#313131",
padding:10,
borderRadius:15,
marginBottom:15
},

product:{
height:90,
width:90,
borderRadius:10,
marginRight:10
},

title:{
color:"white",
fontWeight:"600"
},

desc:{
color:"#bdbdbd",
fontSize:12,
marginBottom:5,
marginTop:5


},

deleteBtn:{
backgroundColor:"#FF3A0A",
paddingHorizontal:10,
paddingVertical:5,
borderRadius:8,
marginTop:10,
justifyContent:"center",
alignItems:"center"
}

})