
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB4TW74gRmmq8mNQYu38O_4MF5GMShuEjE",
    authDomain: "appdif-ac7e9.firebaseapp.com",
    projectId: "appdif-ac7e9",
    storageBucket: "appdif-ac7e9.appspot.com",
    messagingSenderId: "607514564181",
    appId: "1:607514564181:web:0da66fa27709f12560a6dc"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

export { appFirebase, db, auth };
