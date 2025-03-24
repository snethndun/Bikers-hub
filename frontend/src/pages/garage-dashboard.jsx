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
import GarageCard from "../components/GarageCard"; // Component to display garages

const GarageDashboard = () => {
  const [garages, setGarages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    const fetchGarages = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        navigate("/login");
        return;
      }

      try {
        const q = query(
          collection(db, "garages"),
          where("ownerId", "==", userId)
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
  }, [navigate, db]);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Garage Dashboard
        </h2>

        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/add-garage")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add New Garage
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading garages...</p>
        ) : garages.length === 0 ? (
          <p className="text-center text-gray-600">
            No garages found. Add one!
          </p>
        ) : (
          <div className="grid gap-4">
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
