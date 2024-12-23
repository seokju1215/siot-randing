// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDIshlAfOpDqLCvbeADYBkXJwYEFuKmBxQ",
  authDomain: "siotranding.firebaseapp.com",
  projectId: "siotranding",
  storageBucket: "siotranding.firebasestorage.app",
  messagingSenderId: "45849451293",
  appId: "1:45849451293:web:2a21511f90ca4f44ef1ff4",
  measurementId: "G-YZWTQDKJ4T"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };