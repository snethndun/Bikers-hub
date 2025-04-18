import React, { useState, useEffect } from "react";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  Circle,
} from "@react-google-maps/api";

const MapComponent = () => {
  const [center, setCenter] = useState(null); // Start with null to wait for user's location
  const [zoom, setZoom] = useState(14); // Set an appropriate zoom level
  const [isLocationReady, setIsLocationReady] = useState(false); // Flag to check if location is ready
  const [error, setError] = useState(null); // For tracking geolocation errors

  // Function to get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          setIsLocationReady(true);
          setZoom(14); // Set zoom level for closer view
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          setError(
            "Error getting your location. Please check your browser permissions."
          );
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  // Load the Google Maps API
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Access the API key from environment variables
  });

  useEffect(() => {
    getCurrentLocation(); // Get user location when component is mounted
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  // Show error message if there was an issue with location fetching
  if (error) return <div>{error}</div>;

  // Show loading message if user's location is not ready yet
  if (!isLocationReady) return <div>Loading your location...</div>;

  // Function to recenter the map to user's current location
  const recenterMap = () => {
    if (center) {
      setCenter(center); // Reset the center to user's current location
    }
  };

  // Function to zoom out from the current location
  const zoomOutLocation = () => {
    if (center && zoom > 3) {
      setZoom(zoom - 2); // Zoom out by 2 levels (you can adjust this value)
    }
  };

  return (
    <div>
      {/* Map Section with full width */}
      <div className="w-full h-[400px] mb-6 relative">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }} // Ensures map takes up full width and height
          center={center}
          zoom={zoom}
          options={{
            // Disable default map controls (zoom, map type, etc.)
            disableDefaultUI: true,
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {/* Marker for user's current location */}
          <Marker position={center} title="Your Current Location" />

          {/* Circle around the marker to represent 2 km area */}
          <Circle
            center={center} // The circle's center is the user's location
            radius={2000} // 2 km = 2000 meters
            options={{
              fillColor: "#0000FF", // Blue color for the circle
              fillOpacity: 0.1, // Adjust opacity for a subtle circle
              strokeColor: "#0000FF", // Blue border for the circle
              strokeOpacity: 0.3, // Set opacity for the border
              strokeWeight: 2, // Border thickness
            }}
          />
        </GoogleMap>

        {/* GPS Button to recenter map */}
        <div
          onClick={zoomOutLocation} // Call zoomOutLocation when clicked
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            backgroundColor: "white",
            borderRadius: "50%",
            padding: "10px",
            cursor: "pointer",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            zIndex: 10,
          }}
        >
          <img
            src="https://img.icons8.com/?size=100&id=60991&format=png&color=000000" // Custom GPS icon
            alt="Zoom Out Location"
            style={{
              width: "30px",
              height: "30px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
