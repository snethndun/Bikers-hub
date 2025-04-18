import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import Hero from "../components/Hero";
import CategorySection from "./Categories";
import GarageList from "../components/garagelist";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import seriveImg1 from "../assets/servise1.jpg";
import seriveImg2 from "../assets/servise2.jpg";
import seriveImg3 from "../assets/servise3.png";
import imgtext from "../assets/texture.svg";
function HomePage() {
  const navigate = useNavigate(); // Hook for navigation
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
      <motion.div
        className="max-w-screen-xl mx-auto py-10 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Browse Categories
        </h2>
        <CategorySection />
      </motion.div>

      {/* Garage List Section */}
      <motion.div
        className="max-w-screen-xl mx-auto py-10 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Available Garages
        </h2>
        <GarageList garages={garages} />
      </motion.div>

      {/* Discover More Section - Full Width */}
      <div className="py-16 bg-white flex flex-col items-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-10">
          Discover More
        </h2>
        <motion.div
          className="flex justify-center gap-6 w-full px-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
          }}
        >
          {/* Card 1 */}
          <motion.div
            className="w-1/3 h-[350px] rounded-lg shadow-lg relative"
            style={{
              backgroundImage: `url(${seriveImg1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {/* Dark Overlay for Better Readability */}
            <div className="absolute inset-0 bg-black opacity-60 rounded-lg"></div>

            <div className="absolute bottom-5 left-5 text-white z-10">
              <h3 className="text-3xl font-bold">
                Premium Bike Repairs & Servicing
              </h3>
              <p className="text-lg">
                Top-notch servicing from expert mechanics who understand your
                ride.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="w-1/3 h-[350px] rounded-lg shadow-lg relative"
            style={{
              backgroundImage: `url(${seriveImg2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {/* Dark Overlay for Better Readability */}
            <div className="absolute inset-0 bg-black opacity-60 rounded-lg"></div>

            <div className="absolute bottom-5 left-5 text-white z-10">
              <h3 className="text-3xl font-bold">
                Trusted Experts for Every Ride
              </h3>
              <p className="text-lg">
                From quick fixes to full service, our professionals ensure peak
                performance.
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="w-1/3 h-[350px] rounded-lg shadow-lg relative"
            style={{
              backgroundImage: `url(${seriveImg3})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {/* Dark Overlay for Better Readability */}
            <div className="absolute inset-0 bg-black opacity-60 rounded-lg"></div>

            <div className="absolute bottom-5 left-5 text-white z-10">
              <h3 className="text-3xl font-bold">Fair Pricing, No Surprises</h3>
              <p className="text-lg">
                Transparent pricing with no hidden costs—get the best deals for
                your bike.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="py-16 bg-yellow-400 text-white text-center relative bg-opacity-25"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        style={{
          backgroundImage: `url(${imgtext})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h3 className="text-4xl font-bold mb-4">Need Help?</h3>
        <p className="mb-6 text-lg">
          We are here to assist you. Reach out to us for support.
        </p>

        <motion.button
          className="bg-yellow-500 text-black py-3 px-6 rounded-full hover:bg-gray-100 transition duration-300 text-lg font-semibold"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/Contact")} // Link to Contact Us page
        >
          Contact Us
        </motion.button>
      </motion.div>
    </div>
  );
}

export default HomePage;
