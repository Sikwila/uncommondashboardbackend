const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db'); // Import MongoDB connection
const authRoutes = require('./routes/authRoutes'); // Import auth routes (use the route file instead of the controller)
const attendanceRoutes = require('./routes/attendanceRoutes'); // Import attendance routes
const messagingRoutes = require('./routes/messagingRoutes'); // Import messaging routes

const app = express();
const PORT = process.env.PORT || 3000;

// Load environment variables from .env
require('dotenv').config();

// Initialize body-parser middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectDB(); // Ensure MongoDB is connected

// Use routes
app.use('/auth', authRoutes); // Link the auth routes
app.use('/attendance', attendanceRoutes);
app.use('/messaging', messagingRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
