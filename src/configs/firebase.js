// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAk2KVCEKs7dH7IXPHzIAym7zG2U0RDeV4",
  authDomain: "sysarch32.firebaseapp.com",
  projectId: "sysarch32",
  storageBucket: "sysarch32.appspot.com",
  messagingSenderId: "905965411827",
  appId: "1:905965411827:web:0fd18d499ea24487290686",
  measurementId: "G-44F4H8K3S5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const storage = getStorage(app);