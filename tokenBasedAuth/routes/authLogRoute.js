const express = require("express");
const jwtUtils = require("../utils/jwt");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const router = express.Router();

router.post('/login', async (req, res) => {
   try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
         return res.status(401).json({ message: "Invalid Credentials!" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(401).json({ message: "Invalid Credentials!" });
      }
      const accessToken = await jwtUtils.generateAccessToken(user._id);
      const refreshToken = await jwtUtils.generateRefreshToken(user._id);
      res.json({
         username,
         accessToken,
         refreshToken
      });
   } catch (error) {
      res.status(500).json({ message: "Login Failed", error: error.message });
   }
});

module.exports = router;

