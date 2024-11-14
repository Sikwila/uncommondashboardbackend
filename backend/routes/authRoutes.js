// authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

// Public route for user login
router.post('/login', authController.login);

// Protected route for registering a new user (Only accessible by HR)
router.post('/register', authMiddleware, roleMiddleware('hr'), authController.register);

// Example route for a logged-in user to view their profile (no specific role required)
router.get('/profile', authMiddleware, (req, res) => {
    res.send(`Hello, ${req.user.name}. This is your profile.`);
});

module.exports = router;
