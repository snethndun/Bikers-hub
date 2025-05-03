import React, { useEffect, useState } from "react";
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
import { FaSignOutAlt, FaPlus } from "react-icons/fa";

const GarageDashboard = () => {
  const [garages, setGarages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("garages");
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    const fetchData = async () => {
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
        const garageSnap = await getDocs(q);
        const garagesList = [];
        const reviewsList = [];

        for (const garageDoc of garageSnap.docs) {
          const garageData = { id: garageDoc.id, ...garageDoc.data() };
          garagesList.push(garageData);

          const reviewsRef = collection(db, "garages", garageDoc.id, "reviews");
          const reviewsSnap = await getDocs(reviewsRef);
          reviewsSnap.docs.forEach((r) =>
            reviewsList.push({ garageName: garageData.garageName, ...r.data() })
          );
        }

        setGarages(garagesList);
        setReviews(reviewsList);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const goToAddGarage = () => {
    navigate("/add-garage");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-6">Garage Dashboard</h1>
        <button
          onClick={() => setActiveSection("garages")}
          className={`block w-full text-left px-4 py-2 rounded-md mb-3 ${
            activeSection === "garages" ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          Garages
        </button>
        <button
          onClick={() => setActiveSection("reviews")}
          className={`block w-full text-left px-4 py-2 rounded-md mb-6 ${
            activeSection === "reviews" ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          Reviews
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Content */}
      <main className="w-3/4 p-8 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="w-10 h-10 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : activeSection === "garages" ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">My Garages</h2>
              <button
                onClick={goToAddGarage}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                <FaPlus /> Add Garage
              </button>
            </div>
            {garages.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {garages.map((garage) => (
                  <GarageCard key={garage.id} garage={garage} />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No garages found.</p>
            )}
          </>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              All Reviews
            </h2>
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-xl shadow border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-700">
                        {review.garageName}
                      </h3>
                      <span className="text-sm text-yellow-500">
                        ⭐ {review.rating}/5
                      </span>
                    </div>
                    <p className="text-gray-700">{review.reviewText}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      By: {review.email || "Anonymous"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No reviews available.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default GarageDashboard;
