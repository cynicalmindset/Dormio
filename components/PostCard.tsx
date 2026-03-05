import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { useRouter } from "expo-router";

type Props = {
  post:any
}

const PostCard = ({post}:Props) => {
    const router = useRouter();
  const [userImage,setUserImage] = useState("")

  useEffect(()=>{

    const fetchUser = async ()=>{

      if(!post.userId) return

      const docRef = doc(db,"users",post.userId)
      const docSnap = await getDoc(docRef)

      if(docSnap.exists()){
        const data = docSnap.data()
        setUserImage(data.photo)
      }

    }

    fetchUser()

  },[])

  return (

    <Pressable 
    onPress={() => router.push({
  pathname: "/post/[id]",
  params: { id: post.id }
})}
    >

      <View style={styles.card}>

        {/* PRODUCT IMAGE */}

        <View style={styles.imageContainer}>
          <Image
            source={{uri:post.image}}
            style={styles.productImage}
          />
        </View>


        {/* TEXT SECTION */}

        <View style={styles.info}>

          <Text style={styles.title} numberOfLines={1}>
            {post.name}
          </Text>

          <Text
            style={styles.description}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {post.description}
          </Text>


          <View style={styles.bottomRow}>

            <View style={styles.priceTag}>
              <Text style={styles.priceText}>
                Rs. {post.price}
              </Text>
            </View>

            <View style={styles.avatarContainer}>

              {userImage ? (
                <Image
                  source={{uri:userImage}}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.avatarPlaceholder}/>
              )}

            </View>

          </View>

        </View>

      </View>

    </Pressable>

  )
}

export default PostCard

const styles = StyleSheet.create({

card:{
  width:"100%",
  backgroundColor:"#313131",
  borderRadius:20,
  marginBottom:10,
  padding:15,
  flexDirection:"row",
  gap:15,
  alignItems:"center"
},

imageContainer:{
  width:"35%",
  height:140,
  borderRadius:15,
  overflow:"hidden"
},

productImage:{
  width:"100%",
  height:"100%",
  resizeMode:"cover"
},

info:{
  flex:1,
  justifyContent:"space-between",
  height:140
},

title:{
  color:"white",
  fontWeight:"600",
  fontSize:16
},

description:{
  color:"#bdbdbd",
  fontSize:14,
  lineHeight:18,
  flexShrink:1
},

bottomRow:{
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center"
},

priceTag:{
  paddingVertical:6,
  paddingHorizontal:10,
  backgroundColor:"#FF3A0A",
  borderRadius:10
},

priceText:{
  fontWeight:"600",
  color:"white"
},

avatarContainer:{
  height:30,
  width:30,
  borderRadius:10,
  overflow:"hidden"
},

avatar:{
  height:"100%",
  width:"100%",
  resizeMode:"cover"
},

avatarPlaceholder:{
  flex:1,
  backgroundColor:"#4A4A4A"
}

})