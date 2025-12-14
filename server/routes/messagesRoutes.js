const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const User = require('../models/User');
const Worker = require('../models/Worker');

// send message (auth required)
router.post("/send", auth, async (req, res) => {
  try {
    const { senderId, senderfullName,senderType, receiverId, receiverType, text } = req.body;

    if (!senderId || !receiverId)
      return res.status(400).json({ message: "Missing senderId or receiverId" });

    // 1. Check if conversation exists
    let conversation = await Conversation.findOne({
      "participants.id": { $all: [senderId, receiverId] }
    });

    // 2. Create if not exists
    if (!conversation) {
      // Look up receiver's fullName
      const receiverModel = receiverType === 'worker' ? Worker : User;
      const receiverDoc = await receiverModel.findById(receiverId).select('fullName');
      const receiverfullName = receiverDoc?.fullName || 'Unknown';

      conversation = await Conversation.create({
        participants: [
          { id: senderId, role: senderType, fullName: req.user.fullName },
          { id: receiverId, role: receiverType, fullName: receiverfullName },
        ],
      });
    }

    // 3. Save message
    const receiverfullName = conversation.participants.find(p => p.id.toString() === receiverId.toString()).fullName;
    const msg = await Message.create({
      conversationId: conversation._id,
      senderId,
      receiverId,
      senderfullName: req.user.fullName,
      receiverfullName,
      senderType,
      receiverType,
      text,
    });

    res.status(201).json({ message: msg });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/conversation/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    }).sort({ createdAt: 1 });

    res.json({ messages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/unread/:receiverId", async (req, res) => {
  try {
    const receiverId = req.params.receiverId;

    const count = await Message.countDocuments({
      receiverId,
      readAt: null,
    });

    res.json({ unread: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get conversations for user// IMPORTANT

router.get('/conversations', auth, async (req, res) => {
  try {
    const userId = req.user._id;

    const conversations = await Conversation.find({
      'participants.id': userId
    });

    const conversationsWithDetails = await Promise.all(
      conversations.map(async (conv) => {

        // find the other participant
        const otherParticipant = conv.participants.find(
          p => p.id.toString() !== userId.toString()
        );

        if (!otherParticipant) return null;

        const lastMessage = await Message.findOne({
          conversationId: conv._id
        }).sort({ createdAt: -1 });

        const unreadCount = await Message.countDocuments({
          conversationId: conv._id,
          receiverId: userId,
          readAt: null
        });

        return {
          _id: conv._id,
          otherUser: {
            _id: otherParticipant.id,
            fullName: otherParticipant.fullName,
            role: otherParticipant.role
          },
          lastMessage: lastMessage ? lastMessage.text : '',
          lastMessageTime: lastMessage ? lastMessage.createdAt : null,
          unreadCount
        };
      })
    );

    res.json({
      conversations: conversationsWithDetails.filter(Boolean)
    });

  } catch (err) {
    console.error('🔥 Conversations error:', err);
    res.status(500).json({ error: err.message });
  }
});


// create or get conversation
router.post('/conversation', auth, async (req, res) => {
  try {
    const { otherUserId, otherUserRole, otherUserFullName } = req.body;
    const userId = req.user._id;
    const userRole = req.user.role; // assume User has role

    let conversation = await Conversation.findOne({
      'participants.id': { $all: [userId, otherUserId] }
    });

    if (!conversation) {
      let otherFullName = otherUserFullName;
      if (!otherFullName) {
        // Look up other user's fullName
        const otherModel = otherUserRole === 'worker' ? Worker : User;
        const otherDoc = await otherModel.findById(otherUserId).select('fullName');
        otherFullName = otherDoc?.fullName || 'Unknown';
      }

      conversation = await Conversation.create({
        participants: [
          { id: userId, role: userRole, fullName: req.user.fullName },
          { id: otherUserId, role: otherUserRole, fullName: otherFullName }
        ]
      });
    }

    res.json({ conversation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get recent messages for worker
router.get('/worker/:id', auth, async (req, res) => {
  try {
    const messages = await Message.find({ $or: [{ workerId: req.params.id }, { receiverId: req.params.id }, { senderId: req.params.id }] }).sort({ createdAt: -1 }).limit(50);
    res.json({ messages });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

module.exports = router;
