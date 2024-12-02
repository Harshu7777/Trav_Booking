import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { createPackage } from "../services/packageServices.js";

const CreatePackage = ({ onPackageCreated, token }) => {
  const [newPackage, setNewPackage] = useState({
    title: "",
    destination: "",
    description: "",
    maxTravelers: "",
    price: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPackage((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !newPackage.title ||
      !newPackage.destination ||
      !newPackage.description ||
      !newPackage.maxTravelers ||
      !newPackage.price ||
      parseFloat(newPackage.price) <= 0 ||
      parseInt(newPackage.maxTravelers) <= 0
    ) {
      setError("Please fill in all fields correctly.");
      return;
    }

    try {
      const createdPackage = await createPackage(newPackage, token);
      if (onPackageCreated) {
        onPackageCreated(createdPackage); // Update the parent with the new package
      }
      // Clear form and error
      setNewPackage({
        title: "",
        destination: "",
        description: "",
        maxTravelers: "",
        price: "",
      });
      setError(""); // Reset error
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred while creating the package.");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Create a New Package
      </Typography>
      <TextField
        label="Title"
        name="title"
        value={newPackage.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Destination"
        name="destination"
        value={newPackage.destination}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        value={newPackage.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Max Travelers"
        name="maxTravelers"
        value={newPackage.maxTravelers}
        onChange={handleChange}
        type="number"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={newPackage.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default CreatePackage;
