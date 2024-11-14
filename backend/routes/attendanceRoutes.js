// attendanceRoutes.js

const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

// Route for users (students or instructors) to check in
router.post('/check-in', authMiddleware, attendanceController.checkIn);

// Route for users to check out with time validation and optional message if early
router.post('/check-out', authMiddleware, attendanceController.checkOut);

// HR-only route to view all attendance records
router.get('/records', authMiddleware, roleMiddleware('hr'), attendanceController.getAllRecords);

module.exports = router;


