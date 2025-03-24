import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-6 bg-white p-8 rounded-lg shadow-lg">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          About Us
        </h1>

        {/* Intro Section */}
        <section className="mb-8">
          <p className="text-lg text-gray-700">
            Welcome to our platform! We are dedicated to providing the best
            services and experiences for bikers and enthusiasts alike. Our
            mission is to create a space that brings together a community of
            people who share a love for motorcycles, offering everything from
            service centers to an online shop.
          </p>
        </section>

        {/* Our Mission */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700">
            Our mission is to make sure every biker finds the support,
            equipment, and community they need in one place. Whether you’re
            looking for a trusted service center or the latest motorcycle gear,
            we’ve got you covered!
          </p>
        </section>

        {/* Our Team */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Meet the Team
          </h2>
          <p className="text-lg text-gray-700">
            Our team is made up of passionate motorcycle enthusiasts,
            technicians, and customer service experts who are committed to
            providing top-notch service and ensuring every interaction is a
            positive experience. We’re here to help you with all your biking
            needs!
          </p>
        </section>

        {/* Contact Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-700">
            Have questions or need more information? Feel free to reach out to
            us at:
          </p>
          <p className="text-lg text-gray-700 mt-2">
            Email: contact@bikershub.com
          </p>
          <p className="text-lg text-gray-700 mt-2">Phone: +1 (800) 123-4567</p>
        </section>
      </div>
    </div>
  );
};

export default About;
