const mongoose = require("mongoose");

/**
 * @desc Connects to MongoDB using Mongoose
 * @access Private (used internally in server setup)
 */
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the connection string from environment variables
    await mongoose.connect(process.env.MOGODB_URL);

    // Log success message on successful connection
    console.log("MongoDB Connected...");
  } catch (err) {
    // Log error message if connection fails
    console.error("Database connection error:", err.message);

    // Exit the process with failure code
    process.exit(1);
  }
};

module.exports = connectDB;
