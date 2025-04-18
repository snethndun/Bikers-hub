import React, { useEffect, useState } from "react";
import { collection, getDocs, getFirestore, doc } from "firebase/firestore";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ garageId }) => {
  const [reviews, setReviews] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsRef = collection(doc(db, "garages", garageId), "reviews");
        const snapshot = await getDocs(reviewsRef);
        const reviewsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(reviewsList);
      } catch (error) {
        console.error("Error fetching reviews: ", error);
      }
    };

    fetchReviews();
  }, [garageId]);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">
        User Reviews ({reviews.length})
      </h2>
      {reviews.length === 0 ? (
        <p className="text-gray-600">No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white"
            >
              {/* Star Rating */}
              <div className="flex items-center text-yellow-500 mb-2">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`${
                      index < review.rating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-800 mb-2">{review.reviewText}</p>

              {/* Email */}
              <p className="text-sm text-gray-500">
                By: {review.email || "Anonymous"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
