const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');

// Create booking (customer)
router.post('/create', auth, async (req, res) => {
  try {
    const customerId = req.user._id;
    const { workerId, serviceName, scheduledAt, price, currency } = req.body;
    const b = await Booking.create({ customerId, workerId, serviceName, scheduledAt, price, currency });
    res.status(201).json({ booking: b });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

// Get bookings for worker
router.get('/worker/:id', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ workerId: req.params.id }).sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

// Get bookings for customer
router.get('/customer/:id', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.params.id }).sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

module.exports = router;
