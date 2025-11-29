const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker');
const Booking = require('../models/Booking');
const Review = require('../models/Review');
const Transaction = require('../models/Transaction');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// ------------------------------------------------------
// 1. REGISTER WORKER
// ------------------------------------------------------
const bcrypt = require("bcrypt");
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

    const token = jwt.sign(
      { id: worker._id, role: worker.role },
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

module.exports = router;
