import React from "react";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeGarageCard = ({ garage }) => {
  const handleDirectionsClick = (e) => {
    e.preventDefault(); // Prevent Link navigation
    if (garage?.location?.lat && garage?.location?.lng) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${garage.location.lat},${garage.location.lng}`,
        "_blank"
      );
    }
  };

  return (
    <Link
      to={`/garage/${garage.id}`}
      className="bg-transparent rounded-2xl   p-4 w-full max-w-sm transition-transform duration-300 hover:scale-[1.02]"
    >
      {/* Garage Image */}
      <div className="w-full h-44 rounded-xl overflow-hidden mb-4">
        <img
          src={garage.imageUrl || "https://via.placeholder.com/300"}
          alt="Garage"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Garage Info */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">
          {garage.garageName}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {garage.description}
        </p>

        {/* Location Link */}
        <div
          className="flex items-center gap-2 text-sm text-blue-600 cursor-pointer hover:underline"
          onClick={handleDirectionsClick}
        >
          <FaMapMarkerAlt className="text-base" />
          Get Directions
        </div>

        {/* Timings */}
        <div className="flex justify-between text-xs text-gray-500 font-medium">
          <span className="text-green-600">Open: {garage.openTime}</span>
          <span className="text-red-500">Close: {garage.closeTime}</span>
        </div>

        {/* Contact Button */}
        <a
          href={`tel:${garage.contactNumber}`}
          className="mt-3 inline-flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-xl hover:bg-blue-600 transition"
        >
          <FaPhone className="mr-2" /> {garage.contactNumber}
        </a>
      </div>
    </Link>
  );
};

export default HomeGarageCard;
