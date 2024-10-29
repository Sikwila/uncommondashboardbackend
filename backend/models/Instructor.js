const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    attendanceRecords: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Attendance',
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
        }
    ],
});

module.exports = mongoose.model('Instructor', instructorSchema);