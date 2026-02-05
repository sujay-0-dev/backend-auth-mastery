const bcrypt = require('bcryptjs');
const express = require('express');
const { User } = require('../models/user');
const jwtUtils = require('../utils/jwt');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({ message: 'Fullname, email and password are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            fullname,
            email,
            password: hashedPassword
        });

        const accessToken = await jwtUtils.generateAccessToken(user._id);
        const refreshToken = await jwtUtils.generateRefreshToken(user._id);

        res.status(201).json({
            user: { id: user._id, fullname: user.fullname, email: user.email, role: user.role },
            accessToken,
            refreshToken
        });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
});


module.exports = router;

