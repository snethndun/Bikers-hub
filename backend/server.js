// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const garageRoutes = require("./route/garageRoutes");

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Body parser for JSON

// Routes
app.use("/api/garages", garageRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
