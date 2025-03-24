import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/logo.png"; // Replace with your logo
import profileimg from "../assets/profile_img.jpg"; // Replace with user's actual profile image if available
import { auth } from "../firebase"; // Firebase auth import
import { signOut, onAuthStateChanged } from "firebase/auth"; // Firebase signOut import
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Firestore methods

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu
  const [user, setUser] = useState(null); // State to store the logged-in user
  const [userData, setUserData] = useState(null); // State to store additional user data like first and last name
  const dropdownRef = useRef(null); // Ref for the dropdown menu

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
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
        setUser(null); // Reset user data if not logged in
      }
    });
    return () => unsubscribe(); // Clean up on component unmount
  }, []);

  // Handle sign-out
  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      setUser(null); // Reset user state
      setUserData(null); // Reset additional user data
    } catch (error) {
      console.error("Error signing out: ", error.message);
    }
  };

  // Close the dropdown when clicking outside of it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false); // Close the dropdown if clicked outside
    }
  };

  // Listen for clicks outside the dropdown
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Navigation links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Service Centers", path: "/ServiseCenters" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white border-gray-200 shadow-sm fixed w-full top-0 left-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} className="h-8" alt="Logo" />
        </Link>

        {/* User Profile */}
        <div className="flex items-center space-x-3 md:order-2">
          {/* Login Button (Now Links to Login Page) */}
          {!user && (
            <Link
              to="/login"
              className="py-2 px-6 font-semibold bg-yellow-500 text-white rounded hover:bg-yellow-400"
            >
              Login
            </Link>
          )}

          {/* User Profile Dropdown */}
          {user && (
            <div className="relative user-profile" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)} // Toggle dropdown menu on click
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src={user.photoURL || profileimg} // Use user's photoURL or fallback image
                  alt="user photo"
                />
              </button>

              {/* Dropdown Menu (Always visible) */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                  <div className="px-4 py-3">
                    {/* Display First and Last Name */}
                    <span className="block text-sm text-gray-900">
                      {userData
                        ? `${userData.firstName} ${userData.lastName}`
                        : "User"}
                    </span>
                    <span className="block text-sm text-gray-500 truncate">
                      {user.email}
                    </span>
                  </div>
                  <ul className="py-2">
                    {/* Link to Profile Page */}
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        onClick={handleSignOut}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center md:order-1">
          <ul className="flex space-x-8 text-gray-700 font-medium">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="py-2 px-3 hover:text-yellow-400"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
