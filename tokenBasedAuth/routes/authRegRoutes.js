const bcrypt = require('bcrypt');
const express = require('express');
const { User } = require('../models/user');
const jwtUtils = require('../utils/jwt');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    
    const existingUser = await User.findOne({ username });
    if (existingUser){
        return res.status(409).json({message : "User Already Exist"});
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
        username,
        password: hashedPassword
    });
    const accessToken = await jwtUtils.generateAccessToken(user._id);
    const refreshToken = await jwtUtils.generateRefreshToken(user._id);

    res.status(201).json({
        username,
        accessToken,
        refreshToken
    });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
});


module.exports = router;

