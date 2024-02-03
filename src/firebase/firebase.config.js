// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4Oo72kw2w9TCMxWYR5Zdr79pNev75zbc",
  authDomain: "tesis-davinci.firebaseapp.com",
  projectId: "tesis-davinci",
  storageBucket: "tesis-davinci.appspot.com",
  messagingSenderId: "254758546040",
  appId: "1:254758546040:web:11b3777aaba6efc79e5b8d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth (app)