const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Worker = require('../models/Worker');

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, companyName, phone, location } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      fullName,
      email,
      passwordHash: hashedPassword,
      companyName,
      phone,
      location,
    });

    await user.save();

    // avoid returning password hash
    const safeUser = user.toObject();
    delete safeUser.passwordHash;

    res.status(201).json({ message: 'User registered successfully', user: safeUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
if (!user) return res.status(400).json({ message: 'Invalid email or password' });

const isMatch = await bcrypt.compare(password, user.passwordHash);
if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });


    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1h' }
    );
    // avoid returning password hash
    const safeUser = user.toObject();
    delete safeUser.passwordHash;

    res.json({ message: 'Login successful', token, user: safeUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// -------------------------
// 3. GET LOGGED-IN CUSTOMER DETAILS
// -------------------------
router.get('/me', async (req, res) => {
  try {
    const customerId = req.query.id;
    if (!customerId) {
      return res.status(400).json({ message: "Customer ID is required" });
    }

    const customer = await User.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({
      fullName: customer.fullName,
      email: customer.email,
      companyName: customer.companyName,
      phone: customer.phone,
      location: customer.location,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// -------------------------
// 4. UPDATE CUSTOMER PROFILE
// -------------------------
router.put('/update/:id', async (req, res) => {
  try {
    const customerId = req.params.id;

    if (!customerId) {
      return res.status(400).json({ message: "Customer ID is required" });
    }

    const updateData = {
      fullName: req.body.fullName,
      email: req.body.email,
      companyName: req.body.companyName,
      phone: req.body.phone,
      location: req.body.location
    };

    const updatedCustomer = await User.findByIdAndUpdate(
      customerId,
      updateData,
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({
      message: "Profile updated successfully",
      customer: updatedCustomer
    });

  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// -------------------------
// 5. GET WORKER DETAILS BY ID
// -------------------------
router.get("/:id", async (req, res) => {
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


router.put('/change-password/:id', async (req, res) => {
  try {
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }

    // Hash new password
    const passwordHash1 = await bcrypt.hash(newPassword, 10);

    // Update worker password
    const result = await Worker.updateOne(
      { _id: req.params.id },
      { passwordHash: passwordHash1 }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.json({
      message: "Password updated successfully"
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;