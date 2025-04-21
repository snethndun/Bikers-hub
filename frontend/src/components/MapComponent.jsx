import React, { useState, useEffect } from "react";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  Circle,
  InfoWindow,
} from "@react-google-maps/api";
import GarageMarkerCard from "./GarageMarkerCard"; // Optional card for garage info

const MapComponent = ({ onLocationSelect, garages = [] }) => {
  const [center, setCenter] = useState(null);
  const [zoom, setZoom] = useState(14);
  const [selectedGarage, setSelectedGarage] = useState(null);
  const [isLocationReady, setIsLocationReady] = useState(false);
  const [error, setError] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          setIsLocationReady(true);
          onLocationSelect?.(latitude, longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError(
            "Unable to fetch location. Please enable location services."
          );
        }
      );
    } else {
      setError("Geolocation is not supported.");
    }
  }, []);

  const handleMapClick = (event) => {
    const clickedLat = event.latLng.lat();
    const clickedLng = event.latLng.lng();
    const newCenter = { lat: clickedLat, lng: clickedLng };
    setCenter(newCenter);
    onLocationSelect?.(clickedLat, clickedLng);
  };

  const zoomInAndCenter = () => {
    if (center) {
      setZoom((prev) => Math.min(prev + 2, 21));
    }
  };

  if (!isLoaded) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!isLocationReady) return <div>Fetching your location...</div>;

  return (
    <div className="w-full h-[400px] mb-6 relative">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={zoom}
        onClick={handleMapClick}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        {/* User Location Marker */}
        <Marker position={center} title="Your location" />

        {/* 2km Radius Circle */}
        <Circle
          center={center}
          radius={2000}
          options={{
            fillColor: "#0000FF",
            fillOpacity: 0.1,
            strokeColor: "#0000FF",
            strokeOpacity: 0.3,
            strokeWeight: 2,
          }}
        />

        {/* Garage Markers using default Google markers */}
        {garages.map((garage) => (
          <Marker
            key={garage.id}
            position={{
              lat: garage.location.latitude,
              lng: garage.location.longitude,
            }}
            onClick={() => setSelectedGarage(garage)}
          />
        ))}

        {/* Optional: Info window when a garage is selected */}
        {selectedGarage && (
          <InfoWindow
            position={{
              lat: selectedGarage.location.latitude,
              lng: selectedGarage.location.longitude,
            }}
            onCloseClick={() => setSelectedGarage(null)}
          >
            <GarageMarkerCard garage={selectedGarage} />
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Zoom-in Button */}
      <div
        onClick={zoomInAndCenter}
        className="absolute top-2 left-2 bg-white rounded-full p-2 shadow-md cursor-pointer z-10"
      >
        <img
          src="https://img.icons8.com/?size=100&id=60991&format=png&color=000000"
          alt="Zoom In"
          className="w-6 h-6"
        />
      </div>
    </div>
  );
};

export default MapComponent;
