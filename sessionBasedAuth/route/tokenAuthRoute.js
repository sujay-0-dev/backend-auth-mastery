const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { generateToken } = require('../config/token');

// Token-based Register Route
router.post("/token/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    res.status(201).json({ 
      message: "Registration successful", 
      token,
      user: {
        id: user._id,
        username: user.username
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Token-based Login Route
router.post("/token/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.status(200).json({ 
      message: "Login successful", 
      token,
      user: {
        id: user._id,
        username: user.username
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Token-based Logout Route (client-side token deletion)
router.post('/token/logout', (req, res) => {
  // Token-based auth is stateless, so logout just requires client to delete the token
  res.status(200).json({ message: "Logout successful. Please delete the token from client." });
});

module.exports = router;
