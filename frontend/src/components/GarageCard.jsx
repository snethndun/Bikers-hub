import React, { useState } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { FaDirections } from "react-icons/fa"; // Importing direction icon

const GarageCard = ({ garage }) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleHeart = () => {
    setIsLiked(!isLiked);
  };

  const handleContactClick = () => {
    alert(`Contacting: ${garage.contactNumber}`);
  };

  const handleDirectionsClick = () => {
    // Open Google Maps with directions to the garage using latitude and longitude
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${garage.location.latitude},${garage.location.longitude}`;
    window.open(googleMapsUrl, "_blank"); // Opens in a new tab
  };

  return (
    <div className="max-w-sm w-full h-96 p-4 bg-white rounded-lg shadow-md flex flex-col">
      <div className="relative h-48 overflow-hidden">
        {/* Display the garage image from the URL stored in the database */}
        <img
          src={garage.imageUrl || "https://via.placeholder.com/150"} // Fallback if image is not available
          alt={garage.name}
          className="w-full h-full object-cover"
        />
        {/* Like button */}
        <button
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
          onClick={toggleHeart}
        >
          {isLiked ? "❤️" : "🤍"}
        </button>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        {/* Garage Name */}
        <h3 className="text-xl font-semibold text-gray-800 truncate">
          {garage.name}
        </h3>
        {/* Garage Address */}
        <p className="text-gray-600 text-sm truncate">{garage.address}</p>
        {/* Garage Description */}
        <p className="text-gray-600 text-sm truncate">{garage.description}</p>
        {/* Garage Open and Close Time */}
        <p className="text-green-600 text-sm">Open: {garage.openTime}AM</p>
        <p className="text-red-400 text-sm">Close: {garage.closeTime}PM</p>

        {/* Rating Section */}
        <div className="flex items-center mt-2">
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
          <FaStarHalfAlt className="text-yellow-500" />
          <FaRegStar className="text-yellow-500" />
          <span className="ml-2 text-gray-600 text-sm">
            {garage.reviewsCount} Reviews
          </span>
        </div>

        {/* Location Information */}
        <div className="mt-4 flex items-center text-sm text-gray-600">
          <span>Location: </span>
          <span className="ml-2">
            {garage.location.latitude}, {garage.location.longitude}
          </span>
          <button
            onClick={handleDirectionsClick}
            className="ml-2 p-1 text-blue-500 hover:text-blue-700"
          >
            <FaDirections size={20} /> {/* Direction Icon */}
          </button>
        </div>
        {/* Contact Number Button */}
        <button
          onClick={handleContactClick}
          className="w-full mt-4 p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
        >
          {garage.contactNumber}
        </button>
      </div>
    </div>
  );
};

export default GarageCard;
