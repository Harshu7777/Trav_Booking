import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerAdmin } from "../services/adminServices";
import { TextField, Button, Typography, Box, Alert, MenuItem } from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await registerAdmin(formData);
      if (response.message === "Admin registered successfully") {
        setSuccess(response.message);
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    maxWidth: 400,
    width: "100%", // Full width on smaller screens
    height: '85vh',
    margin: "0 auto", // Center horizontally
    padding: 4,
    border: "1px solid #ccc",
    borderRadius: 2,
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    // Make the form responsive
    "@media (max-width: 600px)": {
      maxWidth: "90%", // Adjust maxWidth for smaller screens
    },
  }}
>
      <Typography variant="h4" component="h2" gutterBottom>
        Admin/User Registration
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          select
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        >
          <MenuItem value="User">User</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
        </TextField>
        <br />
        <Button
          sx={{
            padding: "10px",
            marginTop: 2,
          }}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;  