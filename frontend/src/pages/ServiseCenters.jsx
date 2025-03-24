import React, { useEffect, useState } from "react";
import axios from "axios";
import GarageCard from "../components/GarageCard";
import MapComponent from "../components/map"; // Import the Map component

const GarageList = () => {
  const [garages, setGarages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState({ lat: 28.7041, lng: 77.1025 }); // Default center

  useEffect(() => {
    const fetchGarages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/garages");
        setGarages(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching garages:", error);
        setLoading(false);
      }
    };

    fetchGarages();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-lg">Loading...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Map Component with space between map and listings */}
      <div className="mb-12">
        <MapComponent garages={garages} setMapCenter={setMapCenter} />
      </div>

      {/* Garage Listings */}
      <div>
        <h1 className="text-3xl font-bold mb-6 text-center">Garage Listings</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {garages.length > 0 ? (
            garages.map((garage) => (
              <div key={garage._id} className="flex justify-center">
                <GarageCard garage={garage} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-xl text-gray-600">
              No garages found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GarageList;
