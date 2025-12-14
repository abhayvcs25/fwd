const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Worker = require('../models/Worker');

module.exports = async function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
      return res.status(401).json({ message: 'Unauthorized' });

    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');

    let user = await User.findById(payload.userId).select('-passwordHash');
    if (user) {
      req.user = {
        _id: user._id,
        fullName: user.fullName,
        role: 'customer'
      };
      return next();
    }

    let worker = await Worker.findById(payload.userId).select('-passwordHash');
    if (worker) {
      req.user = {
        _id: worker._id,
        fullName: worker.fullName,
        role: 'worker'
      };
      return next();
    }

    return res.status(401).json({ message: 'Unauthorized' });
  } catch (err) {
    console.error('Auth error:', err.message);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
