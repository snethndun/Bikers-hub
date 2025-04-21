import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import CategorySection from "./Categories";
import GarageList from "../components/garagelist";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import {
  FaTools,
  FaMapMarkedAlt,
  FaStar,
  FaSearchLocation,
  FaMotorcycle,
  FaHandshake,
} from "react-icons/fa";
import BikeModel from "../components/BikeModel";

function HomePage() {
  const navigate = useNavigate();
  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [garages, setGarages] = useState([]);

  useEffect(() => {
    setGarages([
      {
        id: 1,
        garageName: "Garage 1",
        location: "Location 1",
        contactNumber: "123-456-7890",
        description: "Reliable service with experienced mechanics.",
        imageUrl: "https://via.placeholder.com/300",
      },
      {
        id: 2,
        garageName: "Garage 2",
        location: "Location 2",
        contactNumber: "987-654-3210",
        description: "Affordable and quick car repairs.",
        imageUrl: "https://via.placeholder.com/300",
      },
      {
        id: 3,
        garageName: "Garage 3",
        location: "Location 3",
        contactNumber: "555-555-5555",
        description: "Best offers on maintenance and tuning.",
        imageUrl: "https://via.placeholder.com/300",
      },
    ]);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 30 }}
        transition={{ duration: 1 }}
      >
        <Hero />
      </motion.div>
      {/* Category Section */}
      <motion.section
        className="max-w-screen-xl mx-auto py-16 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Browse Categories
        </h2>
        <CategorySection />
      </motion.section>
      {/*promo*/}
      <motion.section
        className="relative py-20 px-4 bg-gray-100 min-h-[500px] flex items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {/* Content - Positioned on the right side */}
        <div className="relative z-10 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
          {/* Text Content - Right side */}
          <div className="text-center md:text-left space-y-6">
            <h3 className="text-4xl md:text-5xl font-extrabold text-black leading-tight">
              Experience the Ultimate Ride
            </h3>
            <p className="text-lg text-black/90">
              Discover top-notch bike repairs, maintenance, and accessories with
              the best in the industry. Let us help you keep your bike in top
              shape for every adventure.
            </p>
            <motion.button
              className="bg-white text-black py-3 px-8 rounded-full font-semibold hover:bg-gray-200 transition duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert("Shop Now!")}
            >
              Shop Now
            </motion.button>
          </div>

          {/* Canvas - 3D Model (bike) positioned on the left side */}
          <div className="relative h-[400px] w-full md:w-[700px] mx-auto">
            <BikeModel />
          </div>
        </div>
      </motion.section>
      ;{/* Why Choose Us */}
      <motion.section
        className="max-w-screen-xl mx-auto py-16 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Choose Biker's Hub?
        </h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {[
            {
              icon: <FaTools className="text-yellow-500 text-5xl mb-4" />,
              title: "Top Quality Repairs",
              text: "Experienced mechanics providing reliable servicing for all bike models.",
            },
            {
              icon: (
                <FaMapMarkedAlt className="text-yellow-500 text-5xl mb-4" />
              ),
              title: "Find Garages Nearby",
              text: "Easily locate trusted service centers near your location.",
            },
            {
              icon: <FaStar className="text-yellow-500 text-5xl mb-4" />,
              title: "Rated by Riders",
              text: "Thousands of bikers trust and rate our listed garages.",
            },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              {item.icon}
              <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
              <p className="text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </motion.section>
      {/* Available Garages */}
      <motion.section
        className="max-w-screen-xl mx-auto py-16 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Available Garages
        </h2>
        <GarageList garages={garages} />
      </motion.section>
      {/* How It Works */}
      <motion.section
        className="max-w-screen-xl mx-auto py-16 px-4 bg-gray-50 mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {[
            {
              icon: (
                <FaSearchLocation className="text-blue-500 text-5xl mb-4" />
              ),
              title: "Search",
              text: "Find garages and services in your preferred area.",
            },
            {
              icon: <FaMotorcycle className="text-blue-500 text-5xl mb-4" />,
              title: "Book",
              text: "Schedule a service or visit easily through our platform.",
            },
            {
              icon: <FaHandshake className="text-blue-500 text-5xl mb-4" />,
              title: "Get Serviced",
              text: "Let trusted mechanics take care of your bike.",
            },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              {item.icon}
              <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
              <p className="text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </motion.section>
      <motion.section
        className="relative py-16 px-4 text-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto bg-white/30 backdrop-blur-sm rounded-2xl p-10 border border-white/20 shadow-lg">
          {/* Left Side - Text and Button */}
          <div className="w-1/2 text-left">
            <h3 className="text-4xl font-extrabold mb-4 tracking-tight">
              Need Help?
            </h3>
            <p className="text-lg mb-8 text-black/90">
              Our team is here for you. Reach out anytime for personalized
              support or assistance.
            </p>
            <motion.button
              className="bg-white text-yellow-600 py-3 px-8 rounded-full font-semibold hover:bg-yellow-100 transition duration-300 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/Contact")}
            >
              Contact Us
            </motion.button>
          </div>
        </div>

        {/* Right Side - Image (outside the text content div) */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/3">
          <img
            src="/bike2.png" // Ensure the image is in your public folder
            alt="Bike"
            className="w-full h-auto rounded-lg "
          />
        </div>
      </motion.section>
    </div>
  );
}

export default HomePage;
