const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');

// send message (auth required)
router.post('/send', auth, async (req, res) => {
  try {
    const { receiverId, text } = req.body;
    const msg = await Message.create({ senderId: req.user._id, receiverId, text });
    res.status(201).json({ message: msg });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

// get recent messages for worker
router.get('/worker/:id', auth, async (req, res) => {
  try {
    const messages = await Message.find({ $or: [{ workerId: req.params.id }, { receiverId: req.params.id }, { senderId: req.params.id }] }).sort({ createdAt: -1 }).limit(50);
    res.json({ messages });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

module.exports = router;
