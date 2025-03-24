// MainLayout.jsx
import React from "react";
import Navbar from "./components/Navbr"; // Importing the Navbar component
import Footer from "./components/Footer"; // Importing the Footer component

function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen ">
      {/* Navbar - Sticky at the top */}
      <Navbar />

      {/* Main content area with padding-top to prevent overlap */}
      <main className="flex-grow pt-10 bg-white-100">
        {children} {/* This will display page-specific content */}
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
  
export default MainLayout;
