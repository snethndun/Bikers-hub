import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import GarageCard from "./GarageCard";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";

const GarageDashboard = () => {
  const [garages, setGarages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    const fetchGarages = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/login");
        return;
      }
      try {
        const q = query(
          collection(db, "garages"),
          where("ownerId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const garagesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGarages(garagesList);
      } catch (error) {
        console.error("Error fetching garages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGarages();
  }, [db, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <div className="max-w-6xl w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center animate-fadeIn">
          Garage Dashboard
        </h2>

        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/add-garage")}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FaPlus /> Add New Garage
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center space-x-2">
            <div className="w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            <span className="text-gray-600">Loading garages...</span>
          </div>
        ) : garages.length === 0 ? (
          <p className="text-center text-gray-600 animate-fadeIn">
            No garages found. Add one!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {garages.map((garage) => (
              <GarageCard key={garage.id} garage={garage} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GarageDashboard;
