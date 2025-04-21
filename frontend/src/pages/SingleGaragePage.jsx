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
import ReviewModal from "../components/reviewmodel";

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

  const handleMapClick = () => {
    const lat = parseFloat(garage?.location?.lat);
    const lng = parseFloat(garage?.location?.lng);
    if (!isNaN(lat) && !isNaN(lng)) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
        "_blank"
      );
    } else {
      alert("Invalid location data. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left: Garage Image */}
          <div className="flex-1">
            <img
              src={garage.imageUrl || "https://via.placeholder.com/600"}
              alt={garage.garageName}
              className="w-full h-80 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Right: Garage Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {garage.garageName}
              </h1>
              <p className="text-gray-600 mb-4">{garage.description}</p>

              <div className="flex items-center text-yellow-500 mb-3">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`text-lg ${
                      index < garage.rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-700 text-sm">
                  ({garage.rating || 0}/5) - {reviews.length} reviews
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-700 mb-3">
                <FaMapMarkerAlt className="text-blue-600" />
                <span>{garage.address || "No address provided"}</span>
              </div>

              <div className="flex justify-between text-sm font-medium text-gray-800 mb-6">
                <p className="text-green-600">Open: {garage.openTime} AM</p>
                <p className="text-red-600">Close: {garage.closeTime} PM</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-4">
              <a
                href={`tel:${garage.contactNumber}`}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl shadow hover:bg-blue-700 transition"
              >
                <FaPhone /> Call
              </a>

              <button
                onClick={handleMapClick}
                className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl shadow hover:bg-green-700 transition"
              >
                <FaMapMarkerAlt /> Directions
              </button>

              <button
                onClick={() => setShowReviewModal(true)}
                className="flex items-center gap-2 bg-yellow-500 text-white px-5 py-2.5 rounded-xl shadow hover:bg-yellow-600 transition"
              >
                <FaStar /> Write Review
              </button>
            </div>

            {showReviewModal && (
              <ReviewModal
                garageId={id}
                onClose={() => setShowReviewModal(false)}
              />
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">User Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center text-yellow-500 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${
                          i < review.rating ? "text-yellow-500" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">{review.reviewText}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    By: {review.email || "Anonymous"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleGaragePage;
