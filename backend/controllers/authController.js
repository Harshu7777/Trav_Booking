const bcrypt = require('bcryptjs');
const Admin = require('../models/adminModel');
const generateToken = require("../utils/generateToken"); // Ensure you have this utility

// Register Admin
exports.registerAdmin = async (req, res) => {
  const { name, email, password, role } = req.body; // Added role to the request body

  try {
    // Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    // Check if an admin already exists with the provided email
    const userExists = await Admin.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const userRole = role;

    // Create and save the new admin user
    const newAdmin = new Admin({ name, email, password: hashedPassword, role: userRole });
    await newAdmin.save();

    // Generate JWT token for the registered admin
    const token = generateToken(newAdmin); 

    // Send response with success message and token
    res.status(201).json({
      message: "Admin registered successfully",
      token: token,
      userId: newAdmin._id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login Admin
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for missing fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await Admin.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Admin does not exist" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // Generate JWT token after successful login
      const token = generateToken(user); // Using generateToken from utils
      return res.status(200).json({
        message: "Login Successful",
        token: token,
        userId: user._id.toString(),
        role: user.role // Include role in the response
      });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Admin Profile
exports.getAdminProfile = async (req, res) => {
  try {
    const { email } = req.user; // Extract email from token
    const user = await Admin.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      msg: `User profile retrieved successfully`,
      user: { // Return user details including role
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};