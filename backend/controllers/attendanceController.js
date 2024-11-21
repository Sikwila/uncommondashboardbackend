// attendanceController.js
const Attendance = require('../models/Attendance'); // Ensure the correct path to your Attendance model

const checkIn = async (userId) => {
    const checkInTime = new Date();

    const attendanceRecord = new Attendance({
        user: userId,
        status: 'present',
        date: checkInTime,
    });

    await attendanceRecord.save();
    console.log(`User  ${userId} checked in at ${checkInTime}`);

    return checkInTime;
};

const checkOut = async (userId) => {
    const checkOutTime = new Date();
    const attendanceRecord = await Attendance.findOne({ user: userId }).sort({ date: -1 });

    if (!attendanceRecord || attendanceRecord.status !== 'present') {
        throw new Error('No active check-in record found for this user.');
    }

    const workedHours = (checkOutTime - attendanceRecord.date) / (1000 * 60 * 60);
    const overtime = workedHours > 8 ? workedHours - 8 : 0;

    attendanceRecord.status = 'checked out';
    await attendanceRecord.save();

    console.log(`User  ${userId} checked out at ${checkOutTime}`);
    console.log(`Worked hours: ${workedHours}, Overtime: ${overtime}`);

    return { workedHours, overtime };
};

const requestEarlyCheckout = async (userId) => {
    const attendanceRecord = await Attendance.findOne({ user: userId }).sort({ date: -1 });

    if (!attendanceRecord || attendanceRecord.status !== 'present') {
        throw new Error('No active check-in record found for this user.');
    }

    attendanceRecord.requestedEarlyCheckout = true; // Assuming you have this field in the schema
    await attendanceRecord.save();

    console.log(`User  ${userId} requested early checkout.`);
    return attendanceRecord;
};

module.exports = {
    checkIn,
    checkOut,
    requestEarlyCheckout,
};