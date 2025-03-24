import React, { useState } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { db, addDoc, collection } from "../firebase"; // Firebase import

const defaultCenter = { lat: 37.7749, lng: -122.4194 }; // Default to San Francisco
const mapContainerStyle = { width: "100%", height: "400px" };

const AddGarageForm = () => {
  const [garageData, setGarageData] = useState({
    name: "",
    address: "",
    contactNumber: "",
    description: "",
    openTime: "",
    closeTime: "",
    image: null,
    latitude: defaultCenter.lat,
    longitude: defaultCenter.lng,
  });

  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGarageData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    setGarageData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  // Handle map click to update marker position
  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarkerPosition({ lat, lng });
    setMapCenter({ lat, lng });
    setGarageData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
  };

  // Get current location of the user
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMarkerPosition({ lat: latitude, lng: longitude });
          setMapCenter({ lat: latitude, lng: longitude });
          setGarageData((prev) => ({
            ...prev,
            latitude,
            longitude,
          }));
        },
        (error) => {
          alert("Error getting location: " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add garage data to Firebase Firestore
    try {
      const docRef = await addDoc(collection(db, "garages"), garageData);

      alert("Garage added successfully! ✅");
      setGarageData({
        name: "",
        address: "",
        contactNumber: "",
        description: "",
        openTime: "",
        closeTime: "",
        image: null,
        latitude: defaultCenter.lat,
        longitude: defaultCenter.lng,
      });
      setMarkerPosition(defaultCenter);
      setMapCenter(defaultCenter);
    } catch (error) {
      console.error("Error adding garage: ", error);
      alert("Failed to add garage.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <h2 className="text-2xl font-semibold text-center mb-6">Add Garage</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Garage Name"
              value={garageData.name}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg w-full"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={garageData.address}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg w-full"
            />
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact No."
              value={garageData.contactNumber}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg w-full"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={garageData.description}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg w-full"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="time"
                name="openTime"
                value={garageData.openTime}
                onChange={handleChange}
                required
                className="p-3 border rounded-lg w-full"
              />
              <input
                type="time"
                name="closeTime"
                value={garageData.closeTime}
                onChange={handleChange}
                required
                className="p-3 border rounded-lg w-full"
              />
            </div>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="p-3 border rounded-lg w-full"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="latitude"
                placeholder="Latitude"
                value={garageData.latitude}
                onChange={handleChange}
                required
                className="p-3 border rounded-lg w-full"
              />
              <input
                type="text"
                name="longitude"
                placeholder="Longitude"
                value={garageData.longitude}
                onChange={handleChange}
                required
                className="p-3 border rounded-lg w-full"
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Garage
            </button>
          </form>

          <div className="flex flex-col">
            <div className="h-full w-full bg-gray-200 rounded-lg overflow-hidden shadow-md">
              <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
              >
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={mapCenter}
                  zoom={15}
                  onClick={handleMapClick}
                >
                  <Marker position={markerPosition} />
                </GoogleMap>
              </LoadScript>
            </div>
            <button
              type="button"
              onClick={getCurrentLocation}
              className="mt-4 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Use Current Location 📍
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGarageForm;
