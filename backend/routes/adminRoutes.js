const express = require('express');
const {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
} = require('../controllers/authController'); 
const { protect, adminOnly } = require('../middlewares/authMiddleware'); // Include admin middleware
const { validate } = require('../middlewares/validateMiddleware');
const { registerSchema, loginSchema } = require('../utils/auth-validator'); 

const router = express.Router();

// Registration route
router.post('/register', validate(registerSchema), registerAdmin);

// Login route
router.post('/login', validate(loginSchema), loginAdmin);

// Protected Profile Route (requires authentication)
router.get('/profile', protect, getAdminProfile);


module.exports = router;
