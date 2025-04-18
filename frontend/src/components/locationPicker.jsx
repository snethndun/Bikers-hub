import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = { lat: 51.505, lng: -0.09 };

const LocationPicker = ({ onLocationChange }) => {
  const [position, setPosition] = useState(defaultCenter);
  const mapRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (userPosition) => {
          const { latitude, longitude } = userPosition.coords;
          setPosition({ lat: latitude, lng: longitude });
          if (mapRef.current) {
            mapRef.current.panTo({ lat: latitude, lng: longitude });
          }
        },
        (error) => console.error("Error getting user location:", error)
      );
    }
  }, []);

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setPosition({ lat, lng });

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCAs_bulttBIYFhBVFmJ4segZKQcegMNIA`
      );
      const data = await response.json();
      const address = data.results[0]?.formatted_address || "Unknown location";
      onLocationChange(lat, lng, address);
    } catch (error) {
      console.error("Error fetching address:", error);
      onLocationChange(lat, lng, "Address not found");
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const address = searchInputRef.current.value;
    if (!address) return;

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=YOUR_GOOGLE_MAPS_API_KEY`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setPosition({ lat, lng });
        onLocationChange(lat, lng, data.results[0].formatted_address);
        if (mapRef.current) {
          mapRef.current.panTo({ lat, lng });
        }
      } else {
        alert("Location not found. Try a different search term.");
      }
    } catch (error) {
      console.error("Error searching for address:", error);
    }
  };

  return (
    <div className="mt-1 border border-gray-300 rounded-md overflow-hidden">
      <form
        onSubmit={handleSearch}
        className="p-2 bg-gray-50 border-b border-gray-300"
      >
        <div className="flex">
          <input
            type="text"
            ref={searchInputRef}
            placeholder="Search for an address"
            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Search
          </button>
        </div>
      </form>
      <div className="h-96 w-full">
        <LoadScript googleMapsApiKey="AIzaSyCAs_bulttBIYFhBVFmJ4segZKQcegMNIA">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={position}
            zoom={13}
            onLoad={(map) => (mapRef.current = map)}
            onClick={handleMapClick}
          >
            <Marker position={position} />
          </GoogleMap>
        </LoadScript>
      </div>
      <div className="p-2 bg-gray-50 border-t border-gray-300 text-xs text-gray-500">
        Click on the map to select a location or search for an address above
      </div>
    </div>
  );
};

export default LocationPicker;
