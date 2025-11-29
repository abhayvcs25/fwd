const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const auth = require('../middleware/auth');

// ➤ ADD favorite
router.post('/add', auth, async (req, res) => {
  try {
    const customerId = req.user._id;
    const { workerId } = req.body;

    const fav = await Favorite.create({ customerId, workerId });

    res.status(201).json({
      message: "Added to favorites",
      favorite: fav
    });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Already added to favorites" });
    }
    res.status(500).json({ error: err.message });
  }
});

// ➤ REMOVE favorite
router.post('/remove', auth, async (req, res) => {
  try {
    const customerId = req.user._id;
    const { workerId } = req.body;

    const deleted = await Favorite.findOneAndDelete({ customerId, workerId });

    if (!deleted) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.json({ message: "Removed from favorites" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➤ GET all favorites
router.get('/list', auth, async (req, res) => {
  try {
    const customerId = req.user._id;

    const favorites = await Favorite.find({ customerId })
      .populate("workerId"); // shows worker details

    res.json({ favorites });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
