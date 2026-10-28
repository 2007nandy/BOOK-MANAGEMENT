const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bookRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection string
const MONGO_URI = "mongodb://localhost:27017/";

// Connect to MongoDB and start server
async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected Successfully!");

    app.use("/api/books", bookRoutes);

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

startServer();
