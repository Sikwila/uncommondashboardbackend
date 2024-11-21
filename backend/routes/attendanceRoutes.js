// attendanceRoutes.js

const express = require('express');
const { checkIn, checkOut, getAllRecords } = require('../controllers/attendanceController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Route for users (students or instructors) to check in
router.post('/check-in', authMiddleware, async (req, res) => {
    try {
        await checkIn(req.user);
        res.status(200).json({ message: 'Check-in successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route for users to check out with time validation and optional message if early
router.post('/check-out', authMiddleware, async (req, res) => {
    try {
        const { earlyCheckoutMessage } = req.body;
        await checkOut(req.user, earlyCheckoutMessage);
        res.status(200).json({ message: 'Check-out successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// HR-only route to view all attendance records
router.get('/records', authMiddleware, roleMiddleware('hr'), async (req, res) => {
    try {
        const records = await getAllRecords();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// General route to display the attendance page
router.get('/', (req, res) => {
    res.status(200).send('Attendance Page');
});

// Route to list attendance records
router.get('/list', async (req, res) => {
    try {
        // You can add logic here to fetch a list of attendance records
        res.status(200).json({ message: 'List of Attendance Records' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
hy