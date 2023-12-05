// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFJ7-vwwZpJSxWcS2ujYormRMhOrwbnEo",
  authDomain: "gs-createtoken.firebaseapp.com",
  projectId: "gs-createtoken",
  storageBucket: "gs-createtoken.appspot.com",
  messagingSenderId: "110181464257",
  appId: "1:110181464257:web:dfa255fdb84608fc59bc40",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
