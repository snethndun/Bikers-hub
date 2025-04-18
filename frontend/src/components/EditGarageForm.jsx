import React, { useState, useEffect, useRef } from "react";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const CLOUDINARY_CLOUD_NAME = "dhgou55im";
const CLOUDINARY_UPLOAD_PRESET = "garage_img"; // Make sure this is correct

const EditGarageForm = () => {
  const [garageName, setGarageName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" }); // State for alert
  const [errors, setErrors] = useState({}); // Validation errors

  const db = getFirestore();
  const auth = getAuth();
  const navigate = useNavigate();
  const { garageId } = useParams(); // To get the garageId from the URL

  // Fetch the garage details on component mount
  useEffect(() => {
    const fetchGarageData = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const garageDocRef = doc(db, "garages", garageId);
        const garageDoc = await getDoc(garageDocRef);

        if (garageDoc.exists()) {
          const garageData = garageDoc.data();
          setGarageName(garageData.garageName);
          setContactNumber(garageData.contactNumber);
          setOpenTime(garageData.openTime);
          setCloseTime(garageData.closeTime);
          setDescription(garageData.description);
          setLocation(garageData.location);
          setImageUrl(garageData.imageUrl); // Optional, if imageUrl is stored
        } else {
          alert("Garage not found.");
        }
      } catch (error) {
        console.error("Error fetching garage data:", error);
        alert("Error fetching garage data, please try again.");
      }
    };

    fetchGarageData();
  }, [garageId, db, navigate, auth]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!garageName) newErrors.garageName = "Garage name is required.";
    if (!contactNumber) newErrors.contactNumber = "Contact number is required.";
    if (!openTime) newErrors.openTime = "Opening time is required.";
    if (!closeTime) newErrors.closeTime = "Closing time is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!location.lat || !location.lng)
      newErrors.location = "Please select a location on the map.";
    if (!image && !imageUrl)
      newErrors.image = "Please select an image or keep the existing image.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop if validation fails

    setLoading(true);
    try {
      let uploadedImageUrl = imageUrl; // Use existing image if no new image selected

      if (image) {
        // Upload new image to Cloudinary
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
          uploadedImageUrl = data.secure_url;
          setAlert({
            message: "Image uploaded successfully!",
            type: "success",
          });
        } else {
          setAlert({
            message: `Error uploading image: ${data.error.message}`,
            type: "error",
          });
          return;
        }
      }

      await updateGarageDataInFirestore(uploadedImageUrl);
    } catch (error) {
      setAlert({
        message: "Error uploading image, please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateGarageDataInFirestore = async (imageUrl) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setAlert({ message: "User not logged in!", type: "error" });
        return;
      }

      const garageDocRef = doc(db, "garages", garageId);
      await updateDoc(garageDocRef, {
        garageName,
        contactNumber,
        openTime,
        closeTime,
        description,
        location,
        imageUrl,
        ownerId: user.uid, // Store the owner ID
      });

      setAlert({
        message: "Garage details updated successfully!",
        type: "success",
      });
      resetForm(); // Clear the form fields after successful submission
      navigate("/garage-dashboard"); // Redirect to dashboard after successful update
    } catch (error) {
      console.error("Error saving to Firestore:", error);
      setAlert({
        message: "Error updating garage details, please try again.",
        type: "error",
      });
    }
  };

  const resetForm = () => {
    setGarageName("");
    setContactNumber("");
    setOpenTime("");
    setCloseTime("");
    setDescription("");
    setLocation({ lat: null, lng: null });
    setImage(null);
    setImageUrl("");
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

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Edit Garage</h2>

      {/* Alert message */}
      {alert.message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            alert.type === "error"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {alert.message}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Form */}
        <div className="flex-1 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Garage Name"
              value={garageName}
              onChange={(e) => setGarageName(e.target.value)}
              className={`w-full px-4 py-3 border ${
                errors.garageName ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.garageName && (
              <p className="text-red-500 text-sm">{errors.garageName}</p>
            )}
            <input
              type="text"
              placeholder="Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className={`w-full px-4 py-3 border ${
                errors.contactNumber ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-sm">{errors.contactNumber}</p>
            )}
            <input
              type="text"
              placeholder="Location (Click on the map)"
              value={
                location.lat && location.lng
                  ? `${location.lat}, ${location.lng}`
                  : ""
              }
              readOnly
              className={`w-full px-4 py-3 border ${
                errors.location ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location}</p>
            )}
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-4 py-3 border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
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
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image}</p>
            )}
            <button
              type="submit"
              className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload Image and Save Garage"}
            </button>
          </form>

          {imageUrl && (
            <div className="mt-6">
              <h3 className="text-xl">Uploaded Image:</h3>
              <img
                src={imageUrl}
                alt="Uploaded"
                className="mt-2 w-full rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Right Side - Google Map */}
        <div className="flex-1">
          <div className="h-96">
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={location.lat ? location : { lat: 40.7128, lng: -74.006 }} // Use the garage location or default to New York
              zoom={12}
              onClick={handleMapClick}
            >
              {location.lat && location.lng && <Marker position={location} />}
            </GoogleMap>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditGarageForm;
