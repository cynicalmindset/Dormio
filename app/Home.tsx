import { StyleSheet,  View,Image, Pressable,Text ,ScrollView} from 'react-native'
import React, { useEffect, useState} from 'react'
import { SafeAreaView, useSafeAreaFrame } from 'react-native-safe-area-context'
import {auth,db } from "../firebaseConfig"
import { doc, getDoc } from "firebase/firestore"
import{getDocs,collection} from "firebase/firestore"
import BottomBar from '@/components/BottomToggle'
import {useRouter } from 'expo-router'
import { hostels } from '@/constants/hostellist'
import PostCard from '@/components/PostCard'
import { onAuthStateChanged } from "firebase/auth"
//import { collection, getDocs } from "firebase/firestore"
//import { db } from "../firebaseConfig"
const Home = () => {
    
    const [mode,setMode] = useState("Market")
    const [image , setimage] = useState("");
    const [name,setname] = useState("");
    const [hostel,sethostel] = useState(hostels[0])
    const [posts,setPosts] = useState<any[]>([])

useEffect(() => {

  const unsubscribe = onAuthStateChanged(auth, async (user) => {

    if (!user) {
      return
    }

    const docRef = doc(db, "users", user.uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      setname(data.name)
      setimage(data.photo)
    }

  })

  return unsubscribe

}, [])



    useEffect(()=>{
        const fetchPost = async ()=>{
            const snapshot = await getDocs(collection(db,"posts"))
            const data = snapshot.docs.map(doc=>({
                 id:doc.id,
                 ...doc.data()
            }))
            setPosts(data)
        }
        fetchPost()
    },[])


    const filteredPosts = posts.filter(post => {

  const hostelMatch = hostel ? post.hostel === hostel : true
  const modeMatch = mode ? post.mode === mode : true

  return hostelMatch && modeMatch

})

const router = useRouter();


  return (
    <SafeAreaView style={{flex:1 , backgroundColor:"#3A3A3A"}}>

        <View style={{marginVertical:20 ,marginHorizontal:20,justifyContent:"space-between",flex:1}}>

            {/* TOP SECTION */}
            <View style={{flexDirection:"column", justifyContent:"space-between" ,marginBottom:30}}>
                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                <Pressable style={{height:50 , width:50}} onPress={()=>router.push("/Profile")}>
                    <Image source={{uri:image}} style={{height:"100%", width:"100%",resizeMode:"cover",borderRadius:15}}></Image>
                </Pressable>

                <Pressable style={{
                    backgroundColor:"#FF3A0A",
                    width:89,
                    height:34,
                    alignItems:"center",
                    justifyContent:"center",
                    borderRadius:15
                    
                }}
                onPress={()=>router.push("/Chat")}
                >
                    <Text style={{
                        fontWeight:"500",
                        color:"white"
                    }}>Chat</Text>

                </Pressable>
                </View>

                 <View style={{marginTop:20,gap:6}}>
                <Text style={{
                    color:"white",
                    fontSize:24,
                    fontWeight:"800"
                }}>
                    Hi, {name}
                </Text>
                <Text style={{
                    color:"white",
                    fontSize:20,
                    fontWeight:"400",
                    opacity:0.6
                }}>
                
                    Your GPA may be low, but your {"\n"}snack standards aren't.
                
                </Text>
            </View>

            <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                
                {hostels.map((item)=>(
                  
                  <Pressable
                    
                    key={item}
                    onPress={()=>sethostel(item)}
                    style={{
                      paddingHorizontal:20,
                      paddingVertical:10,
                      borderRadius:10,
                      backgroundColor:hostel === item ? "#FF3A0A" : "#4A4A4A",
                      marginRight:10,
                      height:40,
                      alignItems:"center",
                      justifyContent:"center",
                    marginTop:30,
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
            </View>

            </View>
            
            {/* posts */}

            <View style={{flex:1,width:"100%",borderRadius:30}}>
                <ScrollView>
                    {filteredPosts.map((post)=>(
  
  <PostCard key={post.id} post={post} />

))}
                </ScrollView>
            </View>

            {/* bottobar */}
            <View style={{marginTop:30}}>
                <BottomBar selected={mode} setselected={setMode}></BottomBar>                  
            </View>

         </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})