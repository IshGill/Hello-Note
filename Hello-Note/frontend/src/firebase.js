// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFELA5fSmuvJVpXCZiuKasipvy1ZN2kyc",
  authDomain: "hello-note-51da3.firebaseapp.com",
  projectId: "hello-note-51da3",
  storageBucket: "hello-note-51da3.appspot.com",
  messagingSenderId: "982960305518",
  appId: "1:982960305518:web:0f96edb321f272d9c4fd7f",
  measurementId: "G-6C1GK6MFCC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
