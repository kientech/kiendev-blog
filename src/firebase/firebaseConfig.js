// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxbiuPk89i-nZjbcwX3T76xd5tCAuZQTU",
  authDomain: "kiendev-blog.firebaseapp.com",
  projectId: "kiendev-blog",
  storageBucket: "kiendev-blog.appspot.com",
  messagingSenderId: "634585961281",
  appId: "1:634585961281:web:1d0ba11de04122f99e87c0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
