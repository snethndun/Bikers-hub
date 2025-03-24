import React from "react";
import heroImage from "../assets/hero_bg.jpg";
import { BsArrowRight } from "react-icons/bs"; // Import the React icon

const HeroSection = () => {
  return (
    <section
      className="relative h-screen flex items-center justify-start text-white bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      {/* Dark Overlay (Using Tailwind's bg-black with RGBA) */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Text Content */}
      <div className="relative z-10 text-left px-4 md:px-8 max-w-3xl ml-6">
        <h1 className="text-4xl font-extrabold mb-4 md:text-5xl xl:text-6xl">
          Discover Your Perfect Ride with Biker's Hub
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Biker's Hub is your go-to place for everything related to biking! We
          provide resources, services, and community connections for passionate
          bikers.
        </p>
        <a
          href="#"
          className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-400"
        >
          Get started
          <BsArrowRight size={20} className="ml-2" /> {/* React Icon */}
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
