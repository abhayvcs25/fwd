const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const auth = require('../middleware/auth');

// Create a review
router.post('/', auth, async (req, res) => {
  try {
    const { workerId, rating, comment } = req.body;
    const customerId = req.user._id;

    const review = new Review({
      workerId,
      customerId,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ message: 'Review created successfully', review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get reviews for a worker
router.get('/:workerId', async (req, res) => {
  try {
    const { workerId } = req.params;
    const reviews = await Review.find({ workerId }).populate('customerId', 'fullName');
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;