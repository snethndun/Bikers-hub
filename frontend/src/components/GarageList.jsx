import React, { useEffect, useState } from "react";
import axios from "axios";
import GarageCard from "./GarageCard";

const GarageList = () => {
  const [garages, setGarages] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4 text-left">
        Garage Listings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
    </div>
  );
};

export default GarageList;
