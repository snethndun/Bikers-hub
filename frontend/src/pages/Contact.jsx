import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa"; // Import necessary React Icons
import { MdEmail } from "react-icons/md"; // Import email icon

const Contact = () => {
  // Define form data state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle input change to update form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="mt-6">
      <div className="grid sm:grid-cols-2 items-start gap-12 p-8 mx-auto max-w-4xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md font-[sans-serif]">
        <div>
          <h1 className="text-gray-800 text-3xl font-bold">Let's Talk</h1>
          <p className="text-sm text-gray-500 mt-4">
            Have some big idea or brand to develop and need help? Then reach out
            we'd love to hear about your project and provide help.
          </p>

          <div className="mt-12">
            <h2 className="text-gray-800 text-base font-bold">Email</h2>
            <ul className="mt-4">
              <li className="flex items-center">
                <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <MdEmail size={20} color="black" />
                </div>
                <a
                  href="mailto:info@example.com"
                  className="text-[#1a1a1b] text-sm ml-4"
                >
                  <small className="block">Mail</small>
                  <strong>info@example.com</strong>
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-12">
            <h2 className="text-gray-800 text-base font-bold">Socials</h2>
            <ul className="flex mt-4 space-x-4">
              <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook size={20} color="black" />
                </a>
              </li>
              <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter size={20} color="black" />
                </a>
              </li>
              <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin size={20} color="black" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Left Side - Contact Form */}
        <div>
          <h1 className="text-gray-800 text-3xl font-bold">Contact Us</h1>
          <p className="text-sm text-gray-500 mt-4">
            We'd love to hear from you! Please fill out the form below and send
            us your message.
          </p>

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-800 text-sm font-semibold"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-800 text-sm font-semibold"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-800 text-sm font-semibold"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded"
                rows="4"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-black text-white py-2 px-4 rounded hover:bg-gray-700"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
