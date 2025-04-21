import React, { useEffect, useRef, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import HomeGarageCard from "../components/HomeGarageCard";
import { FaTimes } from "react-icons/fa";
import Draggable from "react-draggable";

const FullMapPage = () => {
  const mapRef = useRef(null);
  const draggableCardRef = useRef(null); // for Draggable nodeRef
  const [garages, setGarages] = useState([]);
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedGarage, setSelectedGarage] = useState(null);

  // Fetch garages from Firestore
  useEffect(() => {
    const fetchGarages = async () => {
      const db = getFirestore();
      const snapshot = await getDocs(collection(db, "garages"));
      const garageList = [];

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (data.location?.lat && data.location?.lng) {
          garageList.push({
            id: doc.id,
            ...data,
            latitude: data.location.lat,
            longitude: data.location.lng,
          });
        }
      });

      setGarages(garageList);
    };

    fetchGarages();
  }, []);

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setUserLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      },
      (error) => console.error("Error getting location", error)
    );
  }, []);

  // Initialize Map
  useEffect(() => {
    if (window.google && mapRef.current && !map) {
      const googleMap = new window.google.maps.Map(mapRef.current, {
        center: userLocation || { lat: 0, lng: 0 },
        zoom: 12,
        disableDefaultUI: true,
      });
      setMap(googleMap);
    }
  }, [mapRef, map, userLocation]);

  // Add garage markers
  useEffect(() => {
    if (map && garages.length) {
      garages.forEach((garage) => {
        const marker = new window.google.maps.Marker({
          position: { lat: garage.latitude, lng: garage.longitude },
          map,
          title: garage.garageName,
          icon: {
            url: "https://img.icons8.com/ios-glyphs/30/home.png",
            scaledSize: new window.google.maps.Size(30, 30),
          },
        });

        marker.addListener("click", () => {
          setSelectedGarage(garage);
        });
      });
    }
  }, [map, garages]);

  // Add user marker and 2km radius
  useEffect(() => {
    if (map && userLocation) {
      const loc = {
        lat: userLocation.latitude,
        lng: userLocation.longitude,
      };

      new window.google.maps.Marker({
        position: loc,
        map,
        title: "Your Location",
      });

      new window.google.maps.Circle({
        strokeColor: "#1E90FF",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#1E90FF",
        fillOpacity: 0.2,
        map,
        center: loc,
        radius: 2000,
      });
    }
  }, [map, userLocation]);

  // Center on user
  const zoomInAndCenter = () => {
    if (map && userLocation) {
      map.setCenter({
        lat: userLocation.latitude,
        lng: userLocation.longitude,
      });
      map.setZoom(14);
    }
  };

  return (
    <div className="w-screen h-screen relative">
      <div ref={mapRef} className="w-full h-full" />

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

      {/* Draggable Garage Card */}
      {selectedGarage && (
        <Draggable nodeRef={draggableCardRef}>
          <div
            ref={draggableCardRef}
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-300 w-[90%] md:w-[400px] cursor-move"
          >
            {/* Close Button */}
            <div className="flex justify-end p-2">
              <button
                onClick={() => setSelectedGarage(null)}
                className="text-gray-600 hover:text-red-500 transition"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="px-4 pb-4">
              <HomeGarageCard garage={selectedGarage} />
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default FullMapPage;
