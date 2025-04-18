import React from "react";
import { Link } from "react-router-dom";

import generalRepairImg from "../assets/general-repair.jpg";
import ebike from "../assets/electric_bike.png";
import LocateNearby from "../assets/Locator_Category.jpg";
import OilChange from "../assets/Lubricating-oil.jpg";

const categories = [
  {
    image: LocateNearby,
    title: "Locate Nearby",
    description:
      "Find the nearest garages, repair shops, and service centers instantly.",
    link: "/categories/customization-upgrades",
  },
  {
    image: generalRepairImg,
    title: "General Repair",
    description:
      "Get your bike repaired for everyday issues like punctures, brakes, and chains.",
    link: "/categories/general-repair",
  },
  {
    image: ebike,
    title: "Electric Bike Service",
    description:
      "Specialized services for electric bikes, including battery and motor repair.",
    link: "/categories/electric-bike-service",
  },
  {
    image: OilChange,
    title: "Oil Change",
    description: "Get an oil change to enhance your bike's performance.",
    link: "/categories/bike-rentals",
  },
];

const CategorySection = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <Link to={category.link} key={index} className="block">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-[350px]">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-[200px] object-cover"
              />
              <div className="p-4 flex flex-col justify-between h-[150px]">
                <h3 className="text-lg font-semibold text-gray-800">
                  {category.title}
                </h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
