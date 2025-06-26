// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "wordlerace-f0e34.firebaseapp.com",
  projectId: "wordlerace-f0e34",
  storageBucket: "wordlerace-f0e34.firebasestorage.app",
  messagingSenderId: "6565130139",
  appId: "1:6565130139:web:f16f16b78f1c152f13bb3e",
  measurementId: "G-90MB51LDV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
