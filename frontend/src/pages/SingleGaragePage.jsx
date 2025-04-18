import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";
import { FaMapMarkerAlt, FaPhone, FaStar } from "react-icons/fa";
import ReviewModal from "../components/reviewmodel"; // Import ReviewModal

const SingleGaragePage = () => {
  const { id } = useParams();
  const [garage, setGarage] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchGarage = async () => {
      const docRef = doc(db, "garages", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setGarage(docSnap.data());
      } else {
        console.error("Garage not found");
      }
    };

    const fetchReviews = async () => {
      const reviewsRef = collection(doc(db, "garages", id), "reviews");
      const reviewsSnap = await getDocs(reviewsRef);
      const fetchedReviews = reviewsSnap.docs.map((doc) => doc.data());
      setReviews(fetchedReviews);
    };

    fetchGarage();
    fetchReviews();
  }, [id]);

  if (!garage) return <p className="text-center mt-10">Loading...</p>;

  const services = Array.isArray(garage.services) ? garage.services : [];

  return (
    <div className="max-w-6xl mx-auto p-6 mt-12 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-xl">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-1">
          <img
            src={garage.imageUrl || "https://via.placeholder.com/600"}
            alt={garage.garageName}
            className="w-full h-80 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {garage.garageName}
          </h1>
          <p className="text-gray-700 mb-6">{garage.description}</p>

          <div className="flex items-center text-yellow-500 mb-4">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`text-lg ${
                  index < garage.rating ? "text-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-gray-600 text-base">
              ({garage.rating || 0}/5) - {reviews.length} reviews
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-700 mb-6">
            <FaMapMarkerAlt className="text-blue-500 text-lg" />
            <span className="text-lg">
              {garage.address || "No address provided"}
            </span>
          </div>

          <div className="flex justify-between text-sm font-medium text-gray-800 mb-6">
            <p className="text-green-600">Open: {garage.openTime} AM</p>
            <p className="text-red-600">Close: {garage.closeTime} PM</p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-4 mb-6">
            <a
              href={`tel:${garage.contactNumber}`}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
            >
              <FaPhone />
              Call Now
            </a>

            <button
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${garage.location.lat},${garage.location.lng}`,
                  "_blank"
                )
              }
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-all duration-200"
            >
              <FaMapMarkerAlt />
              Get Directions
            </button>

            <button
              onClick={() => setShowReviewModal(true)}
              className="flex items-center justify-center gap-2 bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition-all duration-200"
            >
              <FaStar />
              Write a Review
            </button>
          </div>

          {/* Review Modal */}
          {showReviewModal && (
            <ReviewModal
              garageId={id}
              onClose={() => setShowReviewModal(false)}
            />
          )}
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">User Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center text-yellow-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${
                        i < review.rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-800 mb-2">{review.reviewText}</p>
                <p className="text-sm text-gray-500">
                  By: {review.email || "Anonymous"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleGaragePage;
