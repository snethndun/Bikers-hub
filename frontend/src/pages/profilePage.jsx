import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Import Firebase auth
import { signOut } from "firebase/auth"; // Import signOut method from Firebase
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Firestore methods

const Profile = () => {
  const [user, setUser] = useState(null); // To hold user data
  const [userData, setUserData] = useState(null); // To hold additional user data like first and last name
  const navigate = useNavigate(); // For navigation after logout

  useEffect(() => {
    const currentUser = auth.currentUser; // Get current authenticated user
    if (currentUser) {
      setUser(currentUser); // Set user data

      // Fetch user data from Firestore
      const db = getFirestore();
      const userDocRef = doc(db, "users", currentUser.uid);

      const fetchUserData = async () => {
        try {
          const docSnapshot = await getDoc(userDocRef);
          if (docSnapshot.exists()) {
            setUserData(docSnapshot.data()); // Set additional user data like firstName and lastName
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      };

      fetchUserData();
    } else {
      navigate("/login"); // Redirect to login if no user is logged in
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      localStorage.removeItem("userId"); // Remove user ID from localStorage
      localStorage.removeItem("authToken"); // Remove auth token from localStorage
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error signing out: ", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg w-96 shadow-lg relative">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Profile
        </h2>

        {user ? (
          <div className="text-center">
            <p className="mb-4">
              Welcome,{" "}
              {userData ? `${userData.firstName} ${userData.lastName}` : "User"}
              !
            </p>
            <p className="mb-4">Email: {user.email}</p>
            <p className="mb-4">User ID: {user.uid}</p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-center text-red-500">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
