//server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

// Import models
const User = require('./models/User');
const Student = require('./models/Student');
const Instructor = require('./models/Instructor');
const Attendance = require('./models/Attendance');
const Message = require('./models/Message');

// Test route
app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

// Sample route to create a new user (SignUp)
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const newUser = new User({ name, email, password, role });
        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user" });
    }
});

// Sample route to fetch all students
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find().populate('user', 'name email');
        res.status(200).json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching students" });
    }
});

// Sample route to fetch all instructors
app.get('/api/instructors', async (req, res) => {
    try {
        const instructors = await Instructor.find().populate('user', 'name email');
        res.status(200).json(instructors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching instructors" });
    }
});

// Sample route to create a new attendance record
app.post('/api/attendance', async (req, res) => {
    try {
        const { userId, status } = req.body;
        const newAttendance = new Attendance({ user: userId, status });
        await newAttendance.save();
        res.status(201).json({ message: "Attendance recorded", attendance: newAttendance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error recording attendance" });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
