// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAu2kRr-x3wmI1viqxJOxs7WMLrjOjMG88",
  authDomain: "the-game-shelf.firebaseapp.com",
  projectId: "the-game-shelf",
  storageBucket: "the-game-shelf.firebasestorage.app",
  messagingSenderId: "965013894680",
  appId: "1:965013894680:web:af5ee0515f7deea4ae756d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);