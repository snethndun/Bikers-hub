import React, { useState, useEffect, useRef } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

const CLOUDINARY_CLOUD_NAME = "dhgou55im";
const CLOUDINARY_UPLOAD_PRESET = "garage_img"; // Make sure this is correct

const AddGarageForm = () => {
  const [garageName, setGarageName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [alertMessage, setAlertMessage] = useState(null); // For custom alert messages
  const [alertType, setAlertType] = useState(""); // 'success' or 'error'

  const db = getFirestore();
  const auth = getAuth();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Validation
  const validateForm = () => {
    if (!garageName) {
      setAlertMessage("Garage name is required.");
      setAlertType("error");
      return false;
    }
    if (!contactNumber || !/^\d{10}$/.test(contactNumber)) {
      setAlertMessage("Please enter a valid contact number (10 digits).");
      setAlertType("error");
      return false;
    }
    if (!openTime || !closeTime) {
      setAlertMessage("Please enter both open and close times.");
      setAlertType("error");
      return false;
    }
    if (!description) {
      setAlertMessage("Description is required.");
      setAlertType("error");
      return false;
    }
    if (!image) {
      setAlertMessage("Please upload an image.");
      setAlertType("error");
      return false;
    }
    if (!location.lat || !location.lng) {
      setAlertMessage("Please select a location on the map.");
      setAlertType("error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok && data.secure_url) {
        setImageUrl(data.secure_url);
        await saveGarageDataToFirestore(data.secure_url);
      } else {
        setAlertMessage(`Error uploading image: ${data.error.message}`);
        setAlertType("error");
      }
    } catch (error) {
      setAlertMessage("Error uploading image, please try again.");
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  const saveGarageDataToFirestore = async (imageUrl) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setAlertMessage("User not logged in!");
        setAlertType("error");
        return;
      }

      await addDoc(collection(db, "garages"), {
        garageName,
        contactNumber,
        openTime,
        closeTime,
        description,
        location,
        imageUrl,
        ownerId: user.uid, // Store the owner ID
      });

      setAlertMessage("Garage details saved successfully!");
      setAlertType("success");

      // Clear the form
      setGarageName("");
      setContactNumber("");
      setOpenTime("");
      setCloseTime("");
      setDescription("");
      setLocation({ lat: null, lng: null });
      setImage(null);
      setImageUrl("");

      // Redirect to the garage dashboard
      navigate("/garage-dashboard"); // Adjust the path as needed
    } catch (error) {
      setAlertMessage("Error saving to Firestore: " + error.message);
      setAlertType("error");
    }
  };

  // Google Maps hook
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Access the API key from environment variables
  });

  const mapRef = useRef();

  const handleMapClick = (e) => {
    const { latLng } = e;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setLocation({ lat, lng });
  };

  // Get the user's current location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        () => {
          setAlertMessage("Unable to retrieve your location");
          setAlertType("error");
          setLocation({ lat: 40.7128, lng: -74.006 }); // Default to New York if geolocation fails
        }
      );
    } else {
      setAlertMessage("Geolocation is not supported by this browser");
      setAlertType("error");
      setLocation({ lat: 40.7128, lng: -74.006 }); // Default to New York if geolocation is not supported
    }
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Add Garage</h2>

      {/* Alert Messages */}
      {alertMessage && (
        <div
          className={`p-4 mb-6 rounded-lg text-white ${
            alertType === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {alertMessage}
        </div>
      )}

      {/* Image upload status container */}
      <div className="mb-6">
        <div className="relative">
          {!imageUrl && !loading && (
            <div className="flex items-center justify-center p-4 border border-gray-300 rounded-lg bg-gray-100">
              <p className="text-gray-500">Image upload not completed</p>
            </div>
          )}
          {loading && (
            <div className="flex items-center justify-center p-4 border border-gray-300 rounded-lg bg-gray-100 animate-pulse">
              <div className="mr-2 w-6 h-6 border-t-2 border-blue-500 rounded-full animate-spin"></div>
              <p className="text-gray-500">Uploading...</p>
            </div>
          )}
          {imageUrl && (
            <div className="p-4 border border-gray-300 rounded-lg bg-gray-100">
              <h3 className="text-xl">Uploaded Image:</h3>
              <img
                src={imageUrl}
                alt="Uploaded"
                className="mt-2 w-full rounded-lg"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Form */}
        <div className="flex-1 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Garage Name"
              value={garageName}
              onChange={(e) => setGarageName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Location (Click on the map)"
              value={
                location.lat && location.lng
                  ? `${location.lat}, ${location.lng}`
                  : ""
              }
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <div className="grid grid-cols-2 gap-8">
              <input
                type="time"
                value={openTime}
                onChange={(e) => setOpenTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
              <input
                type="time"
                value={closeTime}
                onChange={(e) => setCloseTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <button
              type="submit"
              className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload Image and Save Garage"}
            </button>
          </form>
        </div>

        {/* Right Side - Google Map */}
        <div className="flex-1">
          <div className="h-125 rounded-lg border border-gray-100">
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={location.lat ? location : { lat: 40.7128, lng: -74.006 }} // Use the user's location or default to New York
              zoom={14}
              onClick={handleMapClick}
              options={{
                disableDefaultUI: true,
                zoomControl: true,
              }}
              ref={mapRef}
            >
              {location.lat && location.lng && (
                <Marker position={location} title="Garage Location" />
              )}
            </GoogleMap>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGarageForm;
