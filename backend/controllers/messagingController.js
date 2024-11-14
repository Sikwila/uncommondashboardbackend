// messagingController.js Messaging between HR & instructors
const Message = require('../models/Message');
const User = require('../models/User');

// Send a message
exports.sendMessage = async (req, res) => {
    const { receiverId, content } = req.body;
    
    try {
        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return res.status(404).json({ message: 'Receiver not found' });
        }

        const message = new Message({
            sender: req.user.id,
            receiver: receiverId,
            content
        });
        
        await message.save();
        res.status(201).json({ message: 'Message sent successfully', data: message });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all messages for the logged-in user
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [{ sender: req.user.id }, { receiver: req.user.id }]
        })
        .populate('sender', 'name')
        .populate('receiver', 'name')
        .sort({ timestamp: -1 });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mark a message as read
exports.markAsRead = async (req, res) => {
    const { id } = req.params;

    try {
        const message = await Message.findById(id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        // Check if the logged-in user is the receiver
        if (message.receiver.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        message.read = true;
        await message.save();

        res.status(200).json({ message: 'Message marked as read' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
