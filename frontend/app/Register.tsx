import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NormalButton from "@/components/NormalButton";

const Register = () => {
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
          />

          <TextInput
            placeholder="email"
            placeholderTextColor="#868686"
            style={styles.input}
          />

          <TextInput
            placeholder="password"
            placeholderTextColor="#868686"
            style={styles.input}
            secureTextEntry
          />
            

        </View>

       
        
        <View style={styles.bottom}>
          <NormalButton title="Register" onPress={() => {}} />
            <View style={{flexDirection:"row" , gap:5}}>
          <Text style={{
            fontSize:12,
            color:"white"
          }}>Already have an account ?</Text>
            <Pressable onPress={()=>{}}>
                <Text
                style={{
                  fontSize:12,
            color:"#FF3A0A",
            fontWeight:600  
                }}>Sign in</Text>
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
});