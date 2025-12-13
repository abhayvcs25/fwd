const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');
const Worker = require('../models/Worker');
const User = require('../models/User');

// Create booking (customer)
router.post('/create', auth, async (req, res) => {
  try {
    const customerId = req.user._id; // Comes from token
    const { workerId, serviceName, location, scheduledAt, currency } = req.body;

    const booking = await Booking.create({
      customerId,
      workerId,
      serviceName,
      location,
      scheduledAt,
      currency,
      status: "pending"
    });
    await Worker.updateOne(
      { _id: workerId },
      { $inc: {"stats.totalBookings" : 1 } }
    );

    await User.updateOne(
      { _id: customerId },
      { $inc: { "stats.totalBookings": 1 } }
    );

    res.status(201).json({ booking });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
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


// GET PENDING BOOKINGS FOR LOGGED-IN WORKER

router.get("/pending/:workerId", async (req, res) => {
  try {
    const workerId = req.params.workerId;

    // Load worker details from DB
    const worker = await Worker.findById(workerId).lean();
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    const hourlyRate = worker.hourlyRate;
    const skillTitle = worker.skills; // array or string depending on schema

    // Find bookings
    const bookings = await Booking.find({
      workerId,
      status: "pending"
    })
      .populate("customerId", "fullName")
      .lean();

    const formatted = bookings.map(b => ({
      id: b._id,
      clientName: b.customerId.fullName,
      description: b.serviceName,
      location: b.location,
      serviceName: skillTitle,
      rate: hourlyRate,
      scheduledAt: b.scheduledAt,
      status: b.status
    }));

    res.json({ pending: formatted });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.put("/accept/:bookingId", async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    const updated = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "accepted" },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Booking not found" });

    res.json({ message: "Booking accepted", booking: updated });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// 3) CANCEL a booking
router.put("/cancel/:bookingId", async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    const updated = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "cancelled" },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Booking not found" });

    res.json({ message: "Booking cancelled", booking: updated });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
