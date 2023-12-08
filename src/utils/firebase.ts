// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5c3CvtQEUnbrbHZER6uo9dn-zh5qnQiw",
  authDomain: "banner-admin.firebaseapp.com",
  databaseURL: "https://banner-admin-default-rtdb.firebaseio.com",
  projectId: "banner-admin",
  storageBucket: "banner-admin.appspot.com",
  messagingSenderId: "1044181096632",
  appId: "1:1044181096632:web:566beed4c53818d70efc4d",
  measurementId: "G-YNPRCRDF01",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
