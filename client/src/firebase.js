// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ayatrealestate-ab55a.firebaseapp.com",
  projectId: "ayatrealestate-ab55a",
  storageBucket: "ayatrealestate-ab55a.appspot.com",
  messagingSenderId: "913641060003",
  appId: "1:913641060003:web:6e51df4bc462ce22a17116"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);