import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/adminServices.js';
import { TextField, Button, Typography, Box } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAdmin({ email, password });
      localStorage.setItem('token', response.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh', // Full viewport height
        width: '100vw', // Full viewport width
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#696969', 
        backgroundColor: 'black', 
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          minWidth: 300,
          maxWidth: 600,
          minHeight: 350,
          padding: 4,
          border: '1px solid #ccc',
          borderRadius: 2,
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff', // White background for the form
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          <span style={{color: "orangered"}}>Login</span>
        </Typography>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />
        <Button
          sx={{ padding: '10px' }}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
