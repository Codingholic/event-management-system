// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const FirebaseConfig = {
  apiKey: "AIzaSyCYGHAvuTFJeR0A1AQAXaZxxcDjdhftYvE",
  authDomain: "event-managment-system-6b66b.firebaseapp.com",
  projectId: "event-managment-system-6b66b",
  storageBucket: "event-managment-system-6b66b.appspot.com",
  messagingSenderId: "482701892194",
  appId: "1:482701892194:web:d296a0a267b2e08f3ccf3b",
  measurementId: "G-L7FMH5YP9Q"
};

// Initialize Firebase

export const app = initializeApp(FirebaseConfig);
 export const db = getFirestore(app);
 const auth = getAuth(app);
 export const storage = getStorage(app);
 export {auth}
