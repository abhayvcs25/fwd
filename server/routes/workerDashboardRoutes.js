const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');
const Request = require('../models/Request');
const Message = require('../models/Message');
const Review = require('../models/Review');
const Transaction = require('../models/Transaction');
const Conversation = require('../models/Conversation');
const User = require('../models/User');

// GET /api/worker-dashboard/summary
router.get('/summary', auth, async (req, res) => {
  try {
    const workerId = req.user._id;

    // Active jobs: accepted or in_progress
    const activeJobs = await Booking.countDocuments({ workerId, status: { $in: ['accepted', 'in_progress'] } });

    // Completed jobs
    const completedJobs = await Booking.countDocuments({ workerId, status: 'completed' });

    // Pending requests: assigned to worker, status open or assigned
    const pendingRequests = await Request.countDocuments({ assignedWorkerId: workerId, status: { $in: ['open', 'assigned'] } });

    // Total earnings: sum of paid transactions
    const earningsResult = await Transaction.aggregate([
      { $match: { workerId, status: 'paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalEarnings = earningsResult.length > 0 ? earningsResult[0].total : 0;

    // Average rating
    const ratingResult = await Review.aggregate([
      { $match: { workerId } },
      { $group: { _id: null, avg: { $avg: '$rating' }, count: { $sum: 1 } } }
    ]);
    const averageRating = ratingResult.length > 0 ? ratingResult[0].avg : 0;

    res.json({
      activeJobs,
      completedJobs,
      pendingRequests,
      totalEarnings,
      averageRating: averageRating.toFixed(1)
    });
  } catch (error) {
    console.error('Worker dashboard summary error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/worker-dashboard/upcoming-jobs
router.get('/upcoming-jobs', auth, async (req, res) => {
  try {
    const workerId = req.user._id;

    const bookings = await Booking.find({ workerId, status: { $ne: 'completed' } })
      .populate('customerId', 'fullName')
      .sort({ createdAt: -1 })
      .limit(5)
      .select('serviceName scheduledAt status customerId');

    const result = bookings.map(booking => ({
      id: booking._id,
      title: booking.serviceName || 'Service',
      customer: booking.customerId?.fullName || 'Unknown',
      status: booking.status,
      date: booking.scheduledAt ? booking.scheduledAt.toDateString() : booking.createdAt.toDateString()
    }));

    res.json({ jobs: result });
  } catch (error) {
    console.error('Upcoming jobs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/worker-dashboard/recent-messages
router.get('/recent-messages', auth, async (req, res) => {
  try {
    const workerId = req.user._id;

    // Find conversations for the worker
    const conversations = await Conversation.find({
      "participants.id": workerId
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
      { $limit: 10 }
    ]);

    const result = await Promise.all(latestMessages.map(async (item) => {
      const conv = conversations.find(c => c._id.equals(item._id));
      const sender = conv.participants.find(p => p.id.equals(item.lastMessage.senderId));
      return {
        id: item._id,
        from: sender?.fullName || 'Unknown',
        message: item.lastMessage.text,
        time: new Date(item.lastMessage.createdAt).toLocaleString()
      };
    }));

    res.json({ messages: result });
  } catch (error) {
    console.error('Worker recent messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/worker-dashboard/reviews
router.get('/reviews', auth, async (req, res) => {
  try {
    const workerId = req.user._id;

    const reviews = await Review.find({ workerId })
      .populate('customerId', 'fullName')
      .sort({ createdAt: -1 })
      .limit(5)
      .select('rating comment customerId');

    const result = reviews.map(review => ({
      id: review._id,
      author: review.customerId?.fullName || 'Anonymous',
      rating: review.rating,
      comment: review.comment
    }));

    res.json({ reviews: result });
  } catch (error) {
    console.error('Worker reviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;