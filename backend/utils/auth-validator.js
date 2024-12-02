const { z } = require('zod');

// Schema for user registration
const registerSchema = z.object({
  name: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(['Admin', 'User']).default('User'),  
});

// Schema for user login
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

module.exports = { registerSchema, loginSchema };
