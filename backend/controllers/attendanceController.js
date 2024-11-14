// # attendanceController.js


const Attendance = require('../models/Attendance');

exports.checkIn = async (req, res) => {
    try { 
        const newAttendance = await Attendance.create({
            user: req.user.id,
            status: 'present'
        });
        res.status(201).json(newAttendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.checkOut = async (req, res) => {
    const currentTime = new Date();
    const checkoutHour = 16; // 4:00 PM in 24-hour format

    if (currentTime.getHours() < checkoutHour) {
        //Allow users to provide a message for early checkouts
        if (!req.body.message) {
            return res.status(400).json({ message: 'Please provide a reason for early checkout.' });
        }
    }

    // Update attendance status or record checkout (assuming there’s a field to track checkout time)
    // Add your logic here based on your Attendance schema structure
    res.status(200).json({ message: 'Checked out successfully' });
};

exports.getAllRecords = async (req, res) => {
    try {
        const records = await Attendance.find();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
