import React from "react";
import Hero from "../components/Hero";
import HomePageG from "../components/GarageSectionHome";
import CategorySection from "./Categories";

function HomePage() {
  return (
    <div className="bg-white-100">
      {/* Hero Section */}
      <div className="w-full">
        <Hero />
      </div>

      {/* Category Section */}
      <div className="max-w-screen-xl mx-auto py-10 px-4">
        <CategorySection />
      </div>

     {/* Garage Section */}
<div className="max-w-screen-xl mx-auto py-10 px-8">
  <HomePageG />
</div>

</div>

    
  );
}

export default HomePage;
