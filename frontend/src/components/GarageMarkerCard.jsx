import React from "react";

const GarageMarkerCard = ({ garage, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white p-2 rounded-md shadow-md cursor-pointer"
      style={{
        width: "150px",
        height: "auto",
        textAlign: "center",
      }}
    >
      {/* Garage Image */}
      <img
        src={garage.imageUrl || "https://via.placeholder.com/100"}
        alt="Garage"
        className="w-16 h-16 object-cover rounded-full mx-auto mb-2"
      />

      {/* Garage Name */}
      <h3 className="text-sm font-semibold text-gray-900">
        {garage.garageName}
      </h3>

      {/* Location / Distance (optional) */}
      <p className="text-xs text-gray-600">2 km away</p>
    </div>
  );
};

export default GarageMarkerCard;
