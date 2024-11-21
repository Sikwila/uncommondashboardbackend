// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['student', 'instructor', 'hr'],
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

// Create a model using the schema
const User = mongoose.model('User ', userSchema);

// Export the model for use in other files
module.exports = User;