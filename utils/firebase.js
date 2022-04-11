// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAdwu_QalhMtAIE-TBSEztWuqYbMIrnhsw",
    authDomain: "ynl-hl.firebaseapp.com",
    projectId: "ynl-hl",
    storageBucket: "ynl-hl.appspot.com",
    messagingSenderId: "713066786150",
    appId: "1:713066786150:web:3deddca65eac936ae82ca7",
    measurementId: "G-L1Z7DG1PQM"
};

// Initialize Firebase
export const initFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(initFirebase);
export const db = getFirestore(initFirebase)
export const auth = getAuth()