// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCsie9le-5S1AIlXyds40pMbt_iztZipNY",
  authDomain: "erpsystem-32beb.firebaseapp.com",
  databaseURL: "https://erpsystem-32beb-default-rtdb.firebaseio.com",
  projectId: "erpsystem-32beb",
  storageBucket: "erpsystem-32beb.firebasestorage.app",
  messagingSenderId: "81593333430",
  appId: "1:81593333430:web:adbdbc66ebd023d6b59817",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export default app;
