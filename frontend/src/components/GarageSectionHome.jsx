// HomePage.js (Example for showing sample garages)
import React, { useEffect, useState } from "react";
import axios from "axios";
import GarageCard from "../components/GarageCard";
import { Link } from "react-router-dom"; // For the "See More" link

const HomePageG = () => {
  const [garages, setGarages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGarages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/garages");
        setGarages(response.data); // Store the fetched garages in state
        setLoading(false); // Update the loading state
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
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-3 text-left">
        Garages Near You
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {garages.length > 0 ? (
          garages.map((garage) => (
            <div key={garage._id} className="flex justify-center">
              <GarageCard garage={garage} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-xl">
            No garages found.
          </div>
        )}
      </div>

      {/* Link to see more garages */}
      <div className="text-center mt-6">
        <Link
          to="/ServiseCenters"
          className="text-yellow-500 hover:text-yellow-600 font-semibold"
        >
          See More Garages
        </Link>
      </div>
    </div>
  );
};

export default HomePageG;
