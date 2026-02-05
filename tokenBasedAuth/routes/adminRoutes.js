const express = require('express');
const requireAuth = require('../middlewares/requireAuthRoute');
const { User } = require('../models/user');

const router = express.Router();

router.get('/users', requireAuth, async (req, res) => {
  try {
    const requester = await User.findById(req.userId);
    if (!requester || requester.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: admin only' });
    }

    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});

module.exports = router;
