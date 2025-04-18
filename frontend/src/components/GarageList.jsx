import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Make sure your Firebase setup is correct
import { collection, getDocs } from "firebase/firestore";
import HomeGarageCard from "./HomeGarageCard"; // Assuming HomeGarageCard is the GarageCard component

const GarageList = () => {
  const [garages, setGarages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch garages from Firestore when the component mounts
  useEffect(() => {
    const fetchGarages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "garages"));
        const garagesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGarages(garagesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching garages:", error);
        setLoading(false);
      }
    };

    fetchGarages();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
      {garages.map((garage) => (
        <HomeGarageCard key={garage.id} garage={garage} />
      ))}
    </div>
  );
};

export default GarageList;
