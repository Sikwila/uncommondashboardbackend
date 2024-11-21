// messagingController.js
const Message = require('../models/Message'); // Ensure the correct path to your Message model

const sendMessage = async (fromUser , toUser , messageContent) => {
    const timestamp = new Date();
    const msg = new Message({ sender: fromUser , receiver: toUser , content: messageContent, timestamp });
    await msg.save();
    console.log(`Message sent from ${fromUser } to ${toUser }: ${messageContent}`);
    return msg;
};

const getMessagesForUser  = async (userId) => {
    return await Message.find({ $or: [{ receiver: userId }, { sender: userId }] }).populate('sender receiver');
};

module.exports = {
    sendMessage,
    getMessagesForUser ,
};
