import { View, Text, Image, StyleSheet, Pressable } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebaseConfig"
import { useEffect, useState } from "react"

const PostDetail = () => {

  const { id } = useLocalSearchParams()

  const [post,setPost] = useState<any>(null)
  const [user,setUser] = useState<any>(null)

  useEffect(()=>{

    const fetchPost = async () => {

      const docRef = doc(db,"posts",id as string)
      const docSnap = await getDoc(docRef)

      if(docSnap.exists()){
        const data = docSnap.data()
        setPost(data)

        // fetch uploader
        const userRef = doc(db,"users",data.userId)
        const userSnap = await getDoc(userRef)

        if(userSnap.exists()){
          setUser(userSnap.data())
        }
      }

    }

    fetchPost()

  },[])

  if(!post) return null

  return (

    <SafeAreaView style={styles.container}>

      {/* IMAGE */}

      <Image
        source={{uri:post.image}}
        style={styles.image}
      />

      {/* INFO */}

      <View style={styles.content}>

        <Text style={styles.title}>
          {post.name}
        </Text>

        <Text style={styles.price}>
          Rs. {post.price}
        </Text>

        <Text style={styles.description}>
          {post.description}
        </Text>

        {/* UPLOADER */}

        {user && (

          <View style={styles.userRow}>

            <Image
              source={{uri:user.photo}}
              style={styles.avatar}
            />

            <Text style={styles.username}>
              Uploaded by {user.name}
            </Text>

          </View>

        )}

        {/* CHAT BUTTON */}

        <Pressable style={styles.chatButton}>

          <Text style={{color:"white",fontWeight:"600"}}>
            Chat with seller
          </Text>

        </Pressable>

      </View>

    </SafeAreaView>

  )
}

export default PostDetail

const styles = StyleSheet.create({

container:{
  flex:1,
  backgroundColor:"#3A3A3A"
},

image:{
  width:"100%",
  height:300
},

content:{
  padding:20,
  gap:10
},

title:{
  color:"white",
  fontSize:22,
  fontWeight:"700"
},

price:{
  color:"#FF3A0A",
  fontSize:20,
  fontWeight:"600"
},

description:{
  color:"#bdbdbd",
  lineHeight:20
},

userRow:{
  flexDirection:"row",
  alignItems:"center",
  gap:10,
  marginTop:10
},

avatar:{
  height:40,
  width:40,
  borderRadius:10
},

username:{
  color:"white"
},

chatButton:{
  backgroundColor:"#FF3A0A",
  padding:15,
  borderRadius:12,
  alignItems:"center",
  marginTop:20
}

})