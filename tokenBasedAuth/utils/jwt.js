const jwt = require("jsonwebtoken");

exports.generateAccessToken = (userId) =>{
   return jwt.sign(
    {userId},
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION }
   );
};

exports.generateRefreshToken = (userId) =>{
    return jwt.sign(
        {userId},
        process.env.JWT_REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION}
    );
};