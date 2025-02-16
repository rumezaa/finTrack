// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAk5xOQY97uaMvD_KN36PuP-OdBoo3OxK4",
    authDomain: "cashcorn-8dde3.firebaseapp.com",
    projectId: "cashcorn-8dde3",
    storageBucket: "cashcorn-8dde3.firebasestorage.app",
    messagingSenderId: "599759783064",
    appId: "1:599759783064:web:08c38704d424629ceafced",
    measurementId: "G-025DG3TCD8"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { db, auth, GoogleAuthProvider, signInWithPopup };
