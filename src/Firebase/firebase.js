// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKo-XU2iJz5J7lupWyBZvBPSLLl-GryRA",
  authDomain: "chatter-new-87f5d.firebaseapp.com",
  projectId: "chatter-new-87f5d",
  storageBucket: "chatter-new-87f5d.appspot.com",
  messagingSenderId: "1039687233305",
  appId: "1:1039687233305:web:dfb619c4e480880b6d9f88",
  measurementId: "G-7RNZE556EJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);