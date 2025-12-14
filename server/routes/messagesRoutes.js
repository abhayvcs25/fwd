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
    const { receiverId, receiverType, text } = req.body;
    const senderId = req.user._id;
    const senderRole = req.user.role;

    if (!receiverId || !text) return res.status(400).json({ message: "Missing receiverId or text" });

    let conversation = await Conversation.findOne({
      "participants.id": { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      const model = receiverType === "worker" ? Worker : User;
      const doc = await model.findById(receiverId).select("fullName");
      const receiverFullName = doc?.fullName || "Unknown";

      conversation = await Conversation.create({
        participants: [
          { id: senderId, role: senderRole, fullName: req.user.fullName },
          { id: receiverId, role: receiverType, fullName: receiverFullName },
        ],
      });
    }

    const receiverFullName = conversation.participants.find(
      (p) => p.id.toString() === receiverId.toString()
    )?.fullName || "Unknown";

    const message = await Message.create({
      conversationId: conversation._id,
      senderId,
      receiverId,
      senderfullName: req.user.fullName,
      receiverfullName: receiverFullName,
      senderRole,
      receiverRole: receiverType,
      text,
    });

    res.status(201).json({ message });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ error: err.message });
  }
});


router.get("/conversation/:conversationId", auth, async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.conversationId);
    if (!conversation)
      return res.status(404).json({ message: "Conversation not found" });

    const isParticipant = conversation.participants.some(
      p => p.id.toString() === req.user._id.toString()
    );
    if (!isParticipant)
      return res.status(403).json({ message: "Forbidden" });

    const messages = await Message.find({ conversationId: conversation._id }).sort({ createdAt: 1 });

    // Ensure messages array always exists
    res.json({ messages: messages || [], conversation });
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

router.get("/conversations", auth, async (req, res) => {
  try {
    const userId = req.user._id;

    const conversations = await Conversation.find({
      "participants.id": userId,
    }).populate("participants.id");

    const formattedConversations = conversations.map((conv) => {
      const otherUser = conv.participants.find((p) => p.id.toString() !== userId.toString());
      return {
        _id: conv._id,
        participants: conv.participants,
        otherUser,
        lastMessage: conv.lastMessage || "",
        lastMessageTime: conv.lastMessageTime || "",
        unreadCount: conv.unreadCount || 0,
      };
    });

    res.json({ conversations: formattedConversations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// create or get conversation
router.post("/conversation", auth, async (req, res) => {
  try {
    const { otherUserId, otherUserRole, otherUserFullName } = req.body;
    const userId = req.user._id;
    const userRole = req.user.role;

    let conversation = await Conversation.findOne({
      "participants.id": { $all: [userId, otherUserId] },
    });

    if (!conversation) {
      let fullName = otherUserFullName;
      if (!fullName) {
        const model = otherUserRole === "worker" ? Worker : User;
        const doc = await model.findById(otherUserId).select("fullName");
        fullName = doc?.fullName || "Unknown";
      }

      conversation = await Conversation.create({
        participants: [
          { id: userId, role: userRole, fullName: req.user.fullName },
          { id: otherUserId, role: otherUserRole, fullName },
        ],
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
