import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"; // Import the necessary methods
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDtYyAj_K0QliiZbpI2QNHgImpAUeNLbgs",
  authDomain: "bikers-hub-b858c.firebaseapp.com",
  projectId: "bikers-hub-b858c",
  storageBucket: "bikers-hub-b858c.appspot.com", // Corrected storageBucket URL
  messagingSenderId: "367692476726",
  appId: "1:367692476726:web:1233bba441553ff43e0397",
  measurementId: "G-37SDN0V911",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase authentication and Firestore
const auth = getAuth(app); // Firebase authentication
const db = getFirestore(app); // Firestore instance

const provider = new GoogleAuthProvider(); // Google Auth provider instance

// Export Firebase authentication methods and Firestore
export { auth, createUserWithEmailAndPassword, signInWithPopup, provider, db };
