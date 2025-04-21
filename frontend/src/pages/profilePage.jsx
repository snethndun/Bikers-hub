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
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Profile
        </h2>

        {user ? (
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-700">
                Welcome,{" "}
                {userData
                  ? `${userData.firstName} ${userData.lastName}`
                  : "User"}
                !
              </h3>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <p>
                <span className="font-semibold text-gray-800">Email:</span>{" "}
                {user.email}
              </p>
              <p>
                <span className="font-semibold text-gray-800">User ID:</span>{" "}
                {user.uid}
              </p>
            </div>

            <div className="mt-6">
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
