// authRoutes.js

const express = require('express');
const { signUp, signIn } = require('../controllers/authController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Public route for signing up a new user
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        await signUp(name, email, password, role);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Public route for signing in a user
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        await signIn(email, password);
        res.status(200).json({ message: 'Sign in successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Protected route for registering a new user (accessible only by HR)
router.post('/register', authMiddleware, roleMiddleware('hr'), async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        await signUp(name, email, password, role);
        res.status(201).json({ message: 'HR registered a new user successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Example protected route for viewing user profile (no specific role required)
router.get('/profile', authMiddleware, (req, res) => {
    try {
        res.status(200).json({ message: `Hello, ${req.user.name}. This is your profile.` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
