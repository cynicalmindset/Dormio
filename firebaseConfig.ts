
import { initializeApp } from "firebase/app";
import { initializeAuth,getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: "AIzaSyCOJgZwVDPJP1U5aeNb3pMlBR805tIAakw",
  authDomain: "potato-3c21e.firebaseapp.com",
  projectId: "potato-3c21e",
  storageBucket: "potato-3c21e.firebasestorage.app",
  messagingSenderId: "206677452172",
  appId: "1:206677452172:web:b1dcea9e908d3f89b822a9",
  measurementId: "G-E06GC31PLB"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app,{
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
export const db = getFirestore(app);