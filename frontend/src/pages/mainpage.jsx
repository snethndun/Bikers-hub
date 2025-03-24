// MainPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation

const MainPage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch all images from the backend
    const fetchImages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/images");
        setImages(res.data); // Set images state
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-semibold mb-4">Image Gallery</h1>

      {/* Show all images */}
      <div className="flex flex-wrap justify-center gap-6 mb-6">
        {images.length > 0 ? (
          images.map((image) => (
            <div
              key={image._id}
              className="max-w-xs rounded-lg shadow-lg bg-white p-4"
            >
              <img
                src={image.url}
                alt="Uploaded"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          ))
        ) : (
          <p>No images available.</p>
        )}
      </div>

      {/* Button to navigate to the upload page */}
      <Link to="/upload">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Upload Image
        </button>
      </Link>
    </div>
  );
};

export default MainPage;
