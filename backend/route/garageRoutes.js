// routes/garageRoutes.js
const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { promisify } = require("util");

// Initialize Firebase Admin SDK
const serviceAccount = require("../config/serviceAccountKey.json");
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore(); // Firestore instance

// Configure multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");

// Cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload image to Cloudinary
const uploadToCloudinary = promisify((buffer, callback) => {
  cloudinary.uploader
    .upload_stream((error, result) => {
      if (error) return callback(error, null);
      callback(null, result);
    })
    .end(buffer);
});

// POST route to add garage
router.post("/", upload, async (req, res) => {
  try {
    const {
      userId, // Make sure frontend sends authenticated user's UID
      name,
      address,
      contactNumber,
      description,
      openTime,
      closeTime,
      latitude,
      longitude,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    let imageUrl = "";
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    }

    const garageData = {
      name,
      address,
      contactNumber,
      description,
      openTime,
      closeTime,
      imageUrl,
      location: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Store garage data under the user's UID in Firestore
    const garageRef = db
      .collection("garages")
      .doc(userId)
      .collection("userGarages")
      .doc();
    await garageRef.set(garageData);

    res.status(200).json({ message: "Garage added successfully!" });
  } catch (error) {
    console.error("Error adding garage:", error);
    res.status(500).json({ message: "Failed to add garage." });
  }
});

module.exports = router;
