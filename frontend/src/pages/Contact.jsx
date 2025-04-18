import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="mt-6">
      <div className="grid sm:grid-cols-2 items-start gap-12 p-8 mx-auto max-w-4xl bg-white shadow-lg rounded-md">
        <div>
          <h1 className="text-gray-800 text-3xl font-bold">Let's Talk</h1>
          <p className="text-sm text-gray-500 mt-4">
            Have some big idea or brand to develop and need help? Reach out!
          </p>

          <div className="mt-12">
            <h2 className="text-gray-800 text-base font-bold">Email</h2>
            <ul className="mt-4">
              <li className="flex items-center">
                <div className="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center">
                  <MdEmail size={20} color="black" />
                </div>
                <a
                  href="mailto:info@example.com"
                  className="text-gray-800 text-sm ml-4 hover:underline"
                >
                  <strong>info@example.com</strong>
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-12">
            <h2 className="text-gray-800 text-base font-bold">Socials</h2>
            <ul className="flex mt-4 space-x-4">
              {[FaFacebook, FaTwitter, FaLinkedin].map((Icon, index) => (
                <li
                  key={index}
                  className="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
                >
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <Icon size={20} color="black" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h1 className="text-gray-800 text-3xl font-bold">Contact Us</h1>
          <p className="text-sm text-gray-500 mt-4">
            We'd love to hear from you! Send us a message.
          </p>

          {isSubmitted ? (
            <p className="text-green-600 text-center mt-6">
              Thank you! Your message has been sent.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6">
              {[
                { label: "Name", type: "text", name: "name" },
                { label: "Email", type: "email", name: "email" },
              ].map(({ label, type, name }) => (
                <div key={name} className="mb-4">
                  <label
                    htmlFor={name}
                    className="block text-gray-800 text-sm font-semibold"
                  >
                    {label}
                  </label>
                  <input
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    className="w-full mt-2 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              ))}

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
                  className="w-full mt-2 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition w-full"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
