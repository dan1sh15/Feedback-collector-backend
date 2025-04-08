const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const feedbackRoutes = require("./routes/feedback");
const cors = require('cors');

// Load env vars
dotenv.config();

// Initialize express
const app = express();

app.use(
    cors({
        origin: "*",
    })
);

// Connect to database
connectDB();

// Body parser
app.use(express.json());

// Mount routers
app.use("/api/v1", feedbackRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
