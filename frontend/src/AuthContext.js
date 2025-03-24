import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase"; // Import your Firebase auth module
import { onAuthStateChanged } from "firebase/auth";

// Create the context
const AuthContext = createContext();

// Custom hook to access the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // State to hold the current user's data

  // Listen to authentication state changes (sign in, sign out, etc.)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Update state when user authentication state changes
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children} {/* Provide the context value to the rest of the app */}
    </AuthContext.Provider>
  );
};
