// messagingRoutes.js

const express = require('express');
const { sendMessage, getMessagesForUser, markAsRead } = require('../controllers/messagingController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to send a message
router.post('/send', authMiddleware, async (req, res) => {
    try {
        const { fromUser, toUser, content } = req.body;
        const message = await sendMessage(fromUser, toUser, content);
        res.status(200).json({ message: 'Message sent successfully', data: message });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get all messages for the logged-in user
router.get('/messages/:userId', authMiddleware, async (req, res) => {
    try {
        const { userId } = req.params;
        const messages = await getMessagesForUser(userId);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to mark a message as read
router.put('/read/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await markAsRead(id);
        res.status(200).json({ message: 'Message marked as read', data: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
