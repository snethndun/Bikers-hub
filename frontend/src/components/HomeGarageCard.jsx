import React from "react";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const HomeGarageCard = ({ garage }) => {
  const handleDirectionsClick = () => {
    if (garage?.location?.lat && garage?.location?.lng) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${garage.location.lat},${garage.location.lng}`,
        "_blank"
      );
    }
  };

  return (
    <Link
      to={`/garage/${garage.id}`} // Use Link to navigate to SingleGaragePage
      className="bg-white p-5 rounded-2xl shadow-md border border-gray-300 transition-transform transform hover:scale-105 duration-300"
    >
      {/* Garage Image */}
      <img
        src={garage.imageUrl || "https://via.placeholder.com/300"}
        alt="Garage"
        className="w-full h-48 object-cover rounded-xl mb-4"
      />

      {/* Garage Details */}
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {garage.garageName}
      </h3>
      <p className="text-gray-700 mb-3 text-sm">{garage.description}</p>

      {/* Location */}
      <div className="flex items-center gap-2 text-gray-700 mb-3">
        <FaMapMarkerAlt
          className="text-blue-500 text-lg cursor-pointer"
          onClick={handleDirectionsClick} // Google Maps navigation
        />
        <span
          className="cursor-pointer hover:underline"
          onClick={handleDirectionsClick} // Google Maps navigation
        >
          Get Directions
        </span>
      </div>

      {/* Open & Close Time */}
      <div className="flex justify-between text-sm font-medium text-gray-800 mb-3">
        <p className="text-green-600">Open: {garage.openTime} AM</p>
        <p className="text-red-600">Close: {garage.closeTime} PM</p>
      </div>

      {/* Contact Button */}
      <a
        href={`tel:${garage.contactNumber}`}
        className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full text-center font-medium"
      >
        <FaPhone className="mr-2" /> {garage.contactNumber}
      </a>
    </Link>
  );
};

export default HomeGarageCard;
