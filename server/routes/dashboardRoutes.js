const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');
const Request = require('../models/Request');
const Message = require('../models/Message');
const Favorite = require('../models/Favorite');
const Conversation = require('../models/Conversation');
const Worker = require('../models/Worker');

// GET /api/dashboard/summary
router.get('/summary', auth, async (req, res) => {
  try {
    const customerId = req.user._id;

    // Total bookings
    const totalBookings = await Booking.countDocuments({ customerId });

    // Total requests
    const totalRequests = await Request.countDocuments({ customerId });

    // Total favorites
    const totalFavorites = await Favorite.countDocuments({ customerId });

    // Total messages: count messages in conversations where user is participant
    const conversations = await Conversation.find({
      "participants.id": customerId
    }).select('_id');

    const conversationIds = conversations.map(c => c._id);
    const totalMessages = await Message.countDocuments({ conversationId: { $in: conversationIds } });

    res.json({
      totalBookings,
      totalRequests,
      totalMessages,
      totalFavorites
    });
  } catch (error) {
    console.error('Dashboard summary error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/dashboard/pending-bookings-count
router.get('/pending-bookings-count', auth, async (req, res) => {
  try {
    const customerId = req.user._id;
    const count = await Booking.countDocuments({ customerId, status: 'pending' });
    res.json({ count });
  } catch (error) {
    console.error('Pending bookings count error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/dashboard/recent-bookings
router.get('/recent-bookings', auth, async (req, res) => {
  try {
    const customerId = req.user._id;

    const bookings = await Booking.find({ customerId })
      .populate('workerId', 'fullName')
      .sort({ createdAt: -1 })
      .limit(5)
      .select('serviceName scheduledAt status workerId');

    const result = bookings.map(booking => ({
      workerName: booking.workerId?.fullName || 'Unknown',
      serviceName: booking.serviceName || 'Service',
      bookingDate: booking.scheduledAt ? booking.scheduledAt.toDateString() : booking.createdAt.toDateString(),
      status: booking.status
    }));

    res.json({ bookings: result });
  } catch (error) {
    console.error('Recent bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/dashboard/messages
router.get('/messages', auth, async (req, res) => {
  try {
    const customerId = req.user._id;

    // Find conversations for the user
    const conversations = await Conversation.find({
      "participants.id": customerId
    });

    const conversationIds = conversations.map(c => c._id);

    // Get the latest message for each conversation
    const latestMessages = await Message.aggregate([
      { $match: { conversationId: { $in: conversationIds } } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: '$conversationId',
          lastMessage: { $first: '$$ROOT' }
        }
      },
      { $sort: { 'lastMessage.createdAt': -1 } },
      { $limit: 10 } // Limit to recent 10
    ]);

    const result = await Promise.all(latestMessages.map(async (item) => {
      const conv = conversations.find(c => c._id.equals(item._id));
      const sender = conv.participants.find(p => p.id.equals(item.lastMessage.senderId));
      return {
        senderName: sender?.fullName || 'Unknown',
        lastMessageText: item.lastMessage.text,
        timestamp: item.lastMessage.createdAt
      };
    }));

    res.json({ messages: result });
  } catch (error) {
    console.error('Dashboard messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;