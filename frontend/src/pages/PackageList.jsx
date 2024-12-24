import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Modal,
  TextField,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const PackageList = () => {
  const [packages, setPackages] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newPackage, setNewPackage] = useState({
    title: "",
    destination: "",
    price: "",
    date: "",
  });

  // Fetch role and initial packages
  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");

    // Retrieve packages from localStorage (or set initial if empty)
    const savedPackages = JSON.parse(localStorage.getItem("packages")) || [];
    setPackages(savedPackages);
  }, []);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Handle new package creation
  const handleCreatePackage = () => {
    if (
      newPackage.title &&
      newPackage.destination &&
      parseFloat(newPackage.price) > 0
    ) {
      const newId = packages.length + 1;

      // Format the date before adding it to the package
      const formattedDate = new Date(newPackage.date).toLocaleDateString(
        "en-US",
        {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      );

      const packageToAdd = {
        id: newId,
        ...newPackage,
        price: parseFloat(newPackage.price),
        date: formattedDate, // Store the formatted date
      };

      // Update state to add new package
      const updatedPackages = [...packages, packageToAdd];
      setPackages(updatedPackages);

      // Save the updated package list to localStorage
      localStorage.setItem("packages", JSON.stringify(updatedPackages));

      // Close modal and reset form
      setShowModal(false);
      setNewPackage({ title: "", destination: "", price: "", date: "" });
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPackage((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: 15,
        background:
          "linear-gradient(135deg, rgba(255, 223, 186, 0.6), rgba(255, 204, 128, 0.8))",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center", color: "#333" }}
      >
        Travel Packages
      </Typography>

      {isAdmin && (
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Create New Package
        </Button>
      )}

      {/* Modal for Creating a New Package */}
      <Modal
        open={showModal}
        onClose={handleClose}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: 4,
            borderRadius: 2,
            width: "400px",
            boxShadow: 3,
            outline: "none",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Create a New Package
          </Typography>
          <TextField
            label="Package Title"
            name="title"
            value={newPackage.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Destination"
            name="destination"
            value={newPackage.destination}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date"
            name="date"
            type="date"
            value={newPackage.date}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={newPackage.price}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreatePackage}
            >
              Create Package
            </Button>
          </Box>
        </Box>
      </Modal>

      <Grid container spacing={4} sx={{ marginTop: 3 }}>
        {packages.map((pkg) => (
          <Grid item key={pkg.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                height: "50vh",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  height: "100%",
                  backgroundImage:
                    "url(https://imgs.search.brave.com/CMNpmAWKlVrM5bUCevhm-K4WL6Y2EP78BJe801g1sW0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by90/cmF2ZWwtY29uY2Vw/dC13aXRoLWJhZ2dh/Z2VfMjMtMjE0OTE1/MzI2MC5qcGc_c2Vt/dD1haXNfaHlicmlk)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <CardContent
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                    padding: 2,
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{ fontWeight: "bold" }}
                  >
                    {pkg.title}
                  </Typography>
                  <Typography sx={{ fontStyle: "italic" }}>
                    {pkg.destination}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    sx={{ marginTop: 1, fontWeight: "bold", fontSize: 20 }}
                  >
                    Price: ${pkg.price}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 2,
                  }}
                >
                  <Button
                    size="medium"
                    component={RouterLink}
                    to="/bookings/create"
                    state={{ price: pkg.price, title: pkg.title }}
                    sx={{
                      borderRadius: "25px",
                      backgroundColor: "#f9a825",
                      color: "#fff",
                      marginLeft:20,
                      padding: "6px 20px",
                    }}
                  >
                    Book Now
                  </Button>
                </CardActions>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PackageList;
