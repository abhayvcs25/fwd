const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Transaction = require('../models/Transaction');

// create transaction (admin or webhook)
router.post('/create', async (req, res) => {
  try {
    const t = await Transaction.create(req.body);
    res.status(201).json({ transaction: t });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

// get transactions for worker
router.get('/worker/:id', auth, async (req, res) => {
  try {
    const txs = await Transaction.find({ workerId: req.params.id }).sort({ createdAt: -1 });
    const total = txs.reduce((s, t) => s + (Number(t.amount) || 0), 0);
    res.json({ transactions: txs, totalEarnings: total });
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
});

module.exports = router;
