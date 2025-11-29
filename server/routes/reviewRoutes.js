const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Review = require('../models/Review');

// Create a review
router.post('/', auth, async (req, res) => {
  try {
    const { bookingId, workerId, rating, comment } = req.body;
    const review = await Review.create({ bookingId, customerId: req.user._id, workerId, rating, comment });
    res.status(201).json({ review });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

// Get reviews for worker
router.get('/worker/:id', async (req, res) => {
  try {
    const reviews = await Review.find({ workerId: req.params.id }).sort({ createdAt: -1 });
    // compute average rating
    const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) : 0;
    res.json({ reviews, averageRating: avg });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

module.exports = router;
