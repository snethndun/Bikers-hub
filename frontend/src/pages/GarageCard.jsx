import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase"; // Ensure correct import for your Firebase setup

const GarageCard = ({ garage }) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // To store success/error message
  const [messageType, setMessageType] = useState(""); // To determine message type ('success' or 'error')

  // Navigate to the edit page for this garage
  const handleEdit = () => {
    navigate(`/edit-garage/${garage.id}`);
  };

  // Handle deletion of the garage
  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "garages", garage.id));
      setLoading(false);
      setMessage("Garage deleted successfully!");
      setMessageType("success");
      // Optionally, trigger re-fetch or state update after deletion
    } catch (error) {
      setLoading(false);
      console.error("Error deleting garage:", error);
      setMessage("Error deleting garage. Please try again.");
      setMessageType("error");
    }
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      {/* Check if the image URL exists */}
      {garage.imageUrl ? (
        <img
          src={garage.imageUrl}
          alt={garage.garageName || "Garage Image"}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
      ) : (
        <img
          src="https://via.placeholder.com/150"
          alt="Placeholder"
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
      )}

      <h3 className="text-xl font-bold text-gray-800">{garage.garageName}</h3>
      <p className="text-gray-600">
        Location:{" "}
        {garage.location && typeof garage.location === "object"
          ? `${garage.location.lat}, ${garage.location.lng}`
          : "Location not available"}
      </p>
      <p className="text-green-600 font-semibold">
        Contact number: {garage.contactNumber}
      </p>
      <p className="text-gray-700 mt-2">{garage.description}</p>

      {/* Buttons Section */}
      <div className="mt-4 flex justify-between gap-4">
        {/* Edit Button */}
        <button
          onClick={handleEdit}
          className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 text-center"
        >
          Edit
        </button>

        {/* Delete Button */}
        <button
          onClick={openDeleteModal}
          className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300 text-center"
        >
          Delete
        </button>
      </div>

      {/* Success/Error Alert */}
      {message && (
        <div
          className={`${
            messageType === "success" ? "bg-green-500" : "bg-red-500"
          } text-white p-4 rounded-md mt-4 text-center`}
        >
          {message}
        </div>
      )}

      {/* Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-25">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this garage?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={closeDeleteModal}
                className="bg-gray-50 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GarageCard;
