import React, { useEffect, useState } from "react";
import axios from "axios";

const ImagesPage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch images from the backend
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/images");
        setImages(response.data); // Store the image data in the state
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {images.length > 0 ? (
        images.map((image) => (
          <div
            key={image._id}
            className="max-w-xs rounded-lg shadow-lg bg-white p-4"
          >
            <img
              src={image.url} // The image URL from Cloudinary stored in MongoDB
              alt="Uploaded"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        ))
      ) : (
        <p>No images available.</p>
      )}
    </div>
  );
};

export default ImagesPage;
