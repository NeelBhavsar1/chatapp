
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import {getStorage} from "firebase/storage"
//REMEMBER TO INSERT YOUR OWN API KEY INTO HERE, FOR THE PROJECT TO WORK!


const firebaseConfig = {
  apiKey: "INSERT YOUR FIREBASE API KEY HERE!",
  authDomain: "reactchatapp-b814a.firebaseapp.com",
  projectId: "reactchatapp-b814a",
  storageBucket: "reactchatapp-b814a.firebasestorage.app",
  messagingSenderId: "581790918253",
  appId: "1:581790918253:web:3af32bc66d9e35ab08c164",
  measurementId: "G-2PRMQ9B6C6"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()