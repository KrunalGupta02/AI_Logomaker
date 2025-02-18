// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-logo-maker-f430e.firebaseapp.com",
  projectId: "ai-logo-maker-f430e",
  storageBucket: "ai-logo-maker-f430e.firebasestorage.app",
  messagingSenderId: "416713012945",
  appId: "1:416713012945:web:80516f89f31fb92598b7f0",
  measurementId: "G-3D0W24BREB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
