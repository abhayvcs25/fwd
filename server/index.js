const express = require('express');
const path = require('path');
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const favoriteRoutes = require('./routes/favoriteRoutes.js');
const bookingsRoutes = require('./routes/bookingsRoutes.js');
const reviewRoutes = require('./routes/reviewRoutes.js');
const messagesRoutes = require('./routes/messagesRoutes.js');
const transactionRoutes = require('./routes/transactionRoutes.js');
const requestsRoutes = require('./routes/requestsRoutes.js');
const workerRoutes = require('./routes/workersRoutes.js');




const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// API ROUTES
app.use("/api/users", userRoutes);
app.use('/favorite', favoriteRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/requests', requestsRoutes);
app.use('/workers', workerRoutes);


// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
