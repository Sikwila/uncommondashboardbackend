const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('Student', studentSchema);