import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { FaLocationArrow } from "react-icons/fa";
import axios from "axios";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const MapComponent = ({ setMapCenter }) => {
  const [garages, setGarages] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false); // ✅ Track if map is loaded

  useEffect(() => {
    const fetchGarages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/garages");
        if (Array.isArray(response.data)) {
          setGarages(response.data);
        } else {
          console.error("Invalid data format received.");
        }
      } catch (error) {
        console.error("Error fetching garages:", error);
      }
    };

    fetchGarages();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      setMapCenter(currentLocation);
    }
  }, [currentLocation, setMapCenter]);

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCurrentLocation({ lat, lng });
          setMapCenter({ lat, lng });
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to fetch location. Please allow location access.");
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // ✅ Ensure Google Maps API is loaded before rendering markers
  const handleMapLoad = useCallback(() => {
    setMapLoaded(true);
  }, []);

  return (
    <div className="relative">
      <h2 className="text-xl font-semibold text-center mb-4">Garages on Map</h2>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={currentLocation || { lat: 28.7041, lng: 77.1025 }}
          zoom={14}
          onLoad={handleMapLoad} // ✅ Set map as loaded
        >
          {mapLoaded && // ✅ Only render markers after map is loaded
            garages.map((garage) => (
              <Marker
                key={garage._id}
                position={{
                  lat: parseFloat(garage.latitude),
                  lng: parseFloat(garage.longitude),
                }}
                title={garage.name}
                icon={{
                  path: window.google.maps.SymbolPath.CIRCLE, // ✅ Now safe to access
                  scale: 8,
                  fillColor: "green",
                  fillOpacity: 1,
                  strokeWeight: 2,
                  strokeColor: "white",
                }}
              />
            ))}
        </GoogleMap>
      </LoadScript>

      {/* GPS Button */}
      <div
        onClick={getCurrentLocation}
        className="absolute bottom-4 right-4 p-3 bg-white rounded-full shadow-lg cursor-pointer hover:bg-green-200"
      >
        <FaLocationArrow size={30} color="#4CAF50" />
      </div>
    </div>
  );
};

export default MapComponent;
