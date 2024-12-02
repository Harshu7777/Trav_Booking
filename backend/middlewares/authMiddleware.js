const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');

// Middleware to verify JWT and authenticate user
const protect = (req, res, next) => {
  const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

  console.log("Raw token:", token); // Debug raw token

  if (!token) {
    return next(new ApiError(401, 'Unauthorized request'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Debug decoded token
    req.user = decoded; // Attach decoded user data to the request
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message); // Log error details
    return next(new ApiError(401, 'Invalid token'));
  }
};

// Middleware to allow only admins to proceed
const adminOnly = (req, res, next) => {
  try {
    console.log("User from token:", req.user); // Debug user info
    if (req.user && req.user.role?.toLowerCase() === 'admin') {
      return next(); 
    }
    res.status(403).json({ message: 'Access forbidden, admin only' }); // Forbidden if not admin
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { protect, adminOnly };
