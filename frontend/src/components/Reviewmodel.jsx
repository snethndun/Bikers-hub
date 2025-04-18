import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import {
  getFirestore,
  doc,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";

const ReviewModal = ({ garageId, onClose }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [email, setEmail] = useState(""); // New state to hold user's email
  const db = getFirestore();

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleSubmit = async () => {
    if (rating === 0 || reviewText === "" || email === "") {
      alert("Please provide a rating, review text, and email.");
      return;
    }

    try {
      // Save review in Firestore
      const reviewRef = collection(doc(db, "garages", garageId), "reviews");
      await addDoc(reviewRef, {
        rating,
        reviewText,
        email, // Save email
        timestamp: Timestamp.fromDate(new Date()), // Add timestamp
      });

      alert("Review submitted successfully!");
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error("Error saving review: ", error);
      alert("There was an error submitting your review.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Write a Review</h2>

        {/* Star Rating */}
        <div className="flex mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`text-2xl cursor-pointer ${
                star <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => handleStarClick(star)}
            />
          ))}
        </div>

        {/* Review Text */}
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows="4"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          placeholder="Write your review here..."
        />

        {/* User's Email */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          placeholder="Your email address"
        />

        {/* Submit Button */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="text-gray-600 border border-gray-400 py-2 px-4 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
