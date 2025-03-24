import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"; // Import the necessary methods

const firebaseConfig = {
  apiKey: "AIzaSyDtYyAj_K0QliiZbpI2QNHgImpAUeNLbgs",
  authDomain: "bikers-hub-b858c.firebaseapp.com",
  projectId: "bikers-hub-b858c",
  storageBucket: "bikers-hub-b858c.firebasestorage.app",
  messagingSenderId: "367692476726",
  appId: "1:367692476726:web:1233bba441553ff43e0397",
  measurementId: "G-37SDN0V911",
};

const app = initializeApp(firebaseConfig); // Initialize Firebase app
const auth = getAuth(app); // Get Firebase authentication instance

const provider = new GoogleAuthProvider(); // Create GoogleAuthProvider instance

export { auth, createUserWithEmailAndPassword, signInWithPopup, provider };
// Export necessary functions
