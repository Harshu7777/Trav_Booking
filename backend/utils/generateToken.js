const jwt = require('jsonwebtoken');
require('dotenv').config();

// Generate JWT token
const generateToken = (user) => {
  const payload = { 
    userId: user._id, 
    role: user.role || 'user' // Optional: Include role or other metadata
  };

  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION || '30d' } // Configurable expiration
  );
};

module.exports = generateToken;
