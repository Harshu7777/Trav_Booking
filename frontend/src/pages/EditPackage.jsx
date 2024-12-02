import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

function EditPackage() {
  const { id } = useParams();
  const [packageData, setPackageData] = useState({
    destination: '',
    title: '',
    description: '',
    price: '',
    maxTravelers: '',
  });

  useEffect(() => {
    // Fetch package data from API
    // For now, we'll use dummy data
    setPackageData({
      destination: 'Maldives',
      title: 'Beach Getaway',
      description: 'Enjoy a relaxing week in the beautiful Maldives.',
      price: '1500',
      maxTravelers: '4',
    });
  }, [id]);

  const handleChange = (e) => {
    setPackageData({ ...packageData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement update package logic here
    console.log('Update package', packageData);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Package
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Destination"
            name="destination"
            value={packageData.destination}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            name="title"
            value={packageData.title}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={packageData.description}
            onChange={handleChange}
            multiline
            rows={4}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Price"
            name="price"
            type="number"
            value={packageData.price}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Max Travelers"
            name="maxTravelers"
            type="number"
            value={packageData.maxTravelers}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Update Package
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default EditPackage;

