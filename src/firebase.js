// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRDDxVUXtjwpJTsZIAkMR2qVy3shQE4Tc",
  authDomain: "firstapp-68601.firebaseapp.com",
  projectId: "firstapp-68601",
  storageBucket: "firstapp-68601.appspot.com",
  messagingSenderId: "461114818673",
  appId: "1:461114818673:web:d6bf961c33b4af13145bd0",
  measurementId: "G-VQBPEKCH9M"
};

// Initialize Firebase


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);



