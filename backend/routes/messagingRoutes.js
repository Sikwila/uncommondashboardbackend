// messagingRoutes.js

const express = require('express');
const router = express.Router();
const messagingController = require('../controllers/messagingController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Route to send a message
router.post('/send', authMiddleware, messagingController.sendMessage);

// Route to get all messages for the logged-in user
router.get('/inbox', authMiddleware, messagingController.getMessages);

// Route to mark a message as read
router.put('/read/:id', authMiddleware, messagingController.markAsRead);

module.exports = router;
