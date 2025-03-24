// Import Firestore functions
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase-config"; // Import the Firebase Firestore database

const addGarage = async (garageData) => {
  try {
    const garageRef = collection(db, "garages"); // Reference to the 'garages' collection

    // Add a new document with the garage data
    const docRef = await addDoc(garageRef, {
      name: garageData.name,
      address: garageData.address,
      contactNumber: garageData.contactNumber,
      description: garageData.description,
      openTime: garageData.openTime,
      closeTime: garageData.closeTime,
      imageUrl: garageData.imageUrl || "", // Store the image URL if uploaded
      location: {
        latitude: parseFloat(garageData.latitude),
        longitude: parseFloat(garageData.longitude),
      },
    });

    console.log("Garage added with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding garage: ", error);
  }
};
