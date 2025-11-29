const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const RequestModel = require('../models/Request');

// Create a request
router.post('/create', auth, async (req, res) => {
  try {
    const customerId = req.user._id;
    const doc = await RequestModel.create({ ...req.body, customerId });
    res.status(201).json({ request: doc });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

// List requests (optionally by customer)
router.get('/list', async (req, res) => {
  try {
    const list = await RequestModel.find().sort({ createdAt: -1 }).limit(100);
    res.json({ requests: list });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

// Get single request
router.get('/:id', async (req, res) => {
  try {
    const r = await RequestModel.findById(req.params.id);
    if (!r) return res.status(404).json({ message: 'Request not found' });
    res.json({ request: r });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

module.exports = router;
