const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// ------------------------------------------------------
// 1. REGISTER WORKER
// ------------------------------------------------------
const Worker = require("../models/Worker"); // adjust path if needed

router.post('/register', async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      age,
      gender,
      skills = [],
      experience = 0,
      city = null,
      state = null,
      country = null,
      profileTitle = "",
      profileBio = "",
      profileSkills = [],
      profileImage = null,
      availability = "available",
      hourlyRate = 0
    } = req.body;

    // Check if email already exists
    const exists = await Worker.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create new worker
    const worker = await Worker.create({
      fullName,
      email,
      passwordHash,
      age,
      gender,
      skills,
      experience,
      location: {
        city,
        state,
        country
      },
      profile: {
        title: profileTitle,
        bio: profileBio,
        skills: profileSkills,
        image: profileImage
      },
      stats: {
        completedProjects: 0,
        avgResponseTime: 0,
        totalEarnings: 0,
        totalBookings: 0,
        favoritesCount: 0,
        ratingAverage: 0,
        ratingCount: 0
      },
      availability,
      hourlyRate,
      profileImage,
      role: "worker",
      isActive: true
    });

    res.json({ message: "Worker registered successfully", worker });

  } catch (err) {    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ------------------------------------------------------
// 2. LOGIN WORKER
// ------------------------------------------------------
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const worker = await Worker.findOne({ email });
    if (!worker) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, worker.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // IMPORTANT FIX: use userId instead of id
    const token = jwt.sign(
      { userId: worker._id, role: worker.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      worker: {
        id: worker._id,
        fullName: worker.fullName,
        email: worker.email,
        role: worker.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ------------------------------------------------------
// 3. GET WORKER AGGREGATED DETAILS (Dashboard)
// ------------------------------------------------------
router.get("/me", async (req, res) => {
  try {
    const workerId = req.query.id;
    if (!workerId) {
      return res.status(400).json({ message: "Worker ID is required" });
    }

    const worker = await Worker.findById(workerId);
    console.log(worker);
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    // Send only the relevant fields for the form
    res.json({
      fullName: worker.fullName,
      email: worker.email,
      age: worker.age,
      gender: worker.gender,
      skills: worker.skills,
      experience: worker.experience,
      location: {
        city: worker.location.city,
        state: worker.location.state,
        country: worker.location.country,
      },
      profile: {
        title: worker.profile.title,
        bio: worker.profile.bio,
      },
      availability: worker.availability,
      hourlyRate: worker.hourlyRate,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



// ------------------------------------------------------
// UPDATE WORKER PROFILE
// ------------------------------------------------------
router.put("/update/:id", async (req, res) => {
  try {
    const workerId = req.params.id;

    const updateData = {
      fullName: req.body.fullName,
      email: req.body.email,
      age: req.body.age,
      gender: req.body.gender,
      skills: req.body.skills,
      experience: req.body.experience,
      availability: req.body.availability,
      hourlyRate: req.body.hourlyRate,
      profileImage: req.body.profileImage,

      location: {
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
      },

      profile: {
        title: req.body.profileTitle,
        bio: req.body.profileBio,
        skills: req.body.profileSkills || [],
      },
    };

    const updatedWorker = await Worker.findByIdAndUpdate(
      workerId,
      updateData,
      { new: true } // return updated document
    );

    if (!updatedWorker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.json({
      message: "Profile updated successfully",
      worker: updatedWorker,
    });

  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


//===================================
// 4. SEARCH WORKERS BY SKILL
//===================================

// GET /api/workers?skill=Driver
router.get("/search", async (req, res) => {
  try {
    const skill = req.query.skill;
    if (!skill) return res.status(400).json({ message: "Skill is required" });

    const regex = new RegExp(skill, "i"); // case-insensitive search

    const workers = await Worker.find({
      $or: [
        { skills: { $regex: regex } },
        { "profile.skills": { $regex: regex } },
      ],
      isActive: true,
    });

    res.json(workers);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// =======================================================
// GET WORKER BY ID (Profile Page)
// =======================================================
router.get("/details/:id", async (req, res) => {
  try {
    const workerId = req.params.id;

    const worker = await Worker.findById(workerId);

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.json(worker);
  } catch (err) {
    console.error("Get Worker Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// =======================================================
// GET RECENT BOOKINGS FOR A WORKER
// =======================================================
router.get('/:workerId/bookings', async (req, res) => {
  try {
    const { workerId } = req.params;

    const bookings = await Booking.aggregate([
      { $match: { workerId: new mongoose.Types.ObjectId(workerId) } },
      { $lookup: { from: 'customers', localField: 'customerId', foreignField: '_id', as: 'customer' } },
      { $unwind: '$customer' },
      { $project: { customerName: '$customer.fullName', description: '$serviceName', date: '$scheduledAt', status: 1 } },
      { $sort: { date: -1 } },
      { $limit: 5 }
    ]);

    res.json(bookings);
  } catch (err) {
    console.error('Get Worker Bookings Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

