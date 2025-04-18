import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import MapComponent from "../components/MapComponent";
import HomeGarageCard from "../components/HomeGarageCard";

const ServiceCenterPage = () => {
  const [garages, setGarages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const db = getFirestore();

  useEffect(() => {
    const fetchGarages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "garages"));
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
  }, [db]);

  const filteredGarages = garages.filter((garage) =>
    garage.garageName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto bg-transparent p-6 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Service Centers
        </h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search garages..."
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Map Section */}
        <MapComponent garages={filteredGarages} />

        {/* Garage Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {loading ? (
            <p className="text-center text-gray-600">Loading garages...</p>
          ) : filteredGarages.length > 0 ? (
            filteredGarages.map((garage) => (
              <HomeGarageCard key={garage.id} garage={garage} />
            ))
          ) : (
            <p className="text-center text-gray-600">No garages found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCenterPage;
