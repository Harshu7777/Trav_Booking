"use client";

import React, { useState, useEffect } from "react";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "../assets/home.css";
import { styled } from '@mui/system'
import { Heart, Plane } from "lucide-react";
import {
  Card,
  Paper,
  CardMedia,
  CardContent,
  TextField,
  Divider,
  Avatar,
  Button,
  Box,
  Typography,
  Grid,
  IconButton,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup
} from "@mui/material";
import {
  LocationOn,
  Search,
  CalendarToday,
  Language,
  KeyboardArrowUp,
} from "@mui/icons-material";

// Placeholder data for popular destinations and testimonials
const popularDestinations = [
  {
    name: "Paris",
    image:
      "https://imgs.search.brave.com/AQ4AwLPdsgxHhAqKmMujMIXy8hZT-7QBt9fz7AMRzLo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTY4/MDIyNDcxMS9waG90/by9wYXJpcy1laWZm/ZWwtdG93ZXIuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPVU0/NGpPc0lzNFhEUUtJ/Nl9MLXgtWS1hRWZ5/c29sdnlmaVM1Y2JE/eXZXd1U9",
  },
  {
    name: "Bali",
    image:
      "https://imgs.search.brave.com/Exo7XIkZ6yWNEksGqeXhl6KQOhaobAuc6n5B8Spv2Oo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTEz/ODI0MDc2L3Bob3Rv/L2Zsb2F0aW5nLXRl/bXBsZS1iYWxpLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1J/MzZ4RkxBekdVdVVN/eWJtTTlSVXN0TFBh/MWJQVEpYRUxYdXJJ/QVE5MXpVPQ",
  },
  {
    name: "New York",
    image:
      "https://imgs.search.brave.com/7cNRgPizg0LNpJoZE8H05BhtN-_ONFdG8_TIJ7XWcS0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjE1/Mzk4Mzc2L3Bob3Rv/L25ldy15b3JrLWNp/dHktbnljLXVzYS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/cmxyc3J0NGpiT1JQ/RFNPVzVkZjA2SWtf/WF81aVFvMXJZUWQ1/M3hTczRudz0",
  },
  {
    name: "Tokyo",
    image:
      "https://imgs.search.brave.com/PL0AVzUZTDCNbpIgg6xR-UKqxTLel7x4HVOVWpXyMVo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTY2/MzQzNzI2MC9waG90/by90b2t5by1za3ls/aW5lLWF0LW5pZ2h0/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz0wLU95bVBYZ2tZ/Vy1uaHJoOHdPZ2Nq/bUtKNV9xS2lYa0Q1/el9BbTF3OFVzPQ",
  },
  {
    name: "Australia",
    image:
      "https://imgs.search.brave.com/GXnwey0B-R0_bncamGoSV_IvzXPErh760UNy8iFy3vg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDkz/NjIxMTkyL3Bob3Rv/L21lbGJvdXJuZS1h/dC1kdXNrLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1vZ2pR/MVZPR3lSZFd2TGZR/TGZNQURJNGJLZEtD/X252MlQyalNSdE04/Q0NBPQ",
  },
  {
    name: "Russia",
    image:
      "https://imgs.search.brave.com/2FC88fVZWjF27DV4s3VY6dp0vPBEZT7vKmraRvliMbg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9zdC1iYXNpbC1z/LWNhdGhlZHJhbC1y/ZWQtc3F1YXJlLW1v/c2Nvdy1jb2xvcmZ1/bC1jYXRoZWRyYWwt/cnVzc2lhLXN1bW1l/ci1kYXlzXzExNjEy/NC02NDk4LmpwZz9z/ZW10PWFpc19oeWJy/aWQ",
  },
];


const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-8px)',
  },
}))


const testimonials = [
  {
    avatar:
      "https://imgs.search.brave.com/y5zdCzxMd1rePeIj6P8bP_mOstAYAnN_Mh0rv-yMeAs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2Lzc4LzA5Lzc4/LzI0MF9GXzY3ODA5/Nzg3MV9HN09wb0hR/bWlaVGo0YkhCN1lX/MkhvSDFzeVdmQ2JC/OS5qcGc",
    name: "John Doe",
    content: "This is an amazing experience!",
  },
  {
    avatar:
      "https://imgs.search.brave.com/RFZbemleUi9dbWtTsXfrxlzRu-C2XhAbGGqCf-FBqkc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzA0LzE2Lzcy/LzM2MF9GXzkwNDE2/NzI2MV80bGNySFNI/azdMaWt1TmhIZ2ZN/WmdMblRDb0RQTVFL/Si5qcGc",
    name: "Jane Smith",
    content: "I loved traveling with them!",
  },
  {
    avatar:
      "https://imgs.search.brave.com/bbnlqsY1kTsq60mfS0ozlvbGe-l3A-EaSjOg1-5M4U4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5LzM0LzQ3Lzgz/LzM2MF9GXzkzNDQ3/ODMyMV9nV3ZIR0ZK/U3ZtdHVaVDVIWG9o/V09iYjc1cElCZ21v/Ri5qcGc",
    name: "Alice Brown",
    content: "Best trip ever!",
  },
  {
    avatar:
      "https://imgs.search.brave.com/sCUvyxsDp-YnJRfRdq1eFO1xARu1m10nGCtayEMAmzE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjA1/ODMxOTQxNy9waG90/by9mYWNlLWJ1c2lu/ZXNzLWFuZC13b21h/bi13aXRoLWFybXMt/Y3Jvc3NlZC1zbWls/ZS1hbmQtY2FyZWVy/LXdpdGgtdGVhbXdv/cmstbWVldGluZy1v/ci1wbGFubmluZy53/ZWJwP2E9MSZiPTEm/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9anRG/NFU0S3k0RmlHOWdE/dW1vZE1HVnhYbVJZ/R1FVd2tUcGFVRXdp/UHFCZz0",
    name: "Bob White",
    content: "Wonderful service!",
  },
  {
    avatar:
      "https://imgs.search.brave.com/zUZarrsXtjOMiEOshVAukZx-QV1bPv85iLkUVR9mMYw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9o/YXBweS1yZWQtaGFp/cmVkLW1hbi10YWtp/bmctc2VsZmllLXBo/b3RvXzEyNjItNTEx/OC5qcGc_c2VtdD1h/aXNfaHlicmlk",
    name: "Charlie Green",
    content: "I will definitely come back!",
  },
  {
    avatar:
      "https://imgs.search.brave.com/hovUv4jkZuXzTfO2Bb_rMPwqkgdubWe2OVa5xVe2VEw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbHVz/LnVuc3BsYXNoLmNv/bS9wcmVtaXVtX3Bo/b3RvLTE2Njk4Nzk4/MjU4ODEtNmQ0ZTRi/ZGU2N2Q1P2ZtPWpw/ZyZxPTYwJnc9MzAw/MCZpeGxpYj1yYi00/LjAuMyZpeGlkPU0z/d3hNakEzZkRCOE1I/eHpaV0Z5WTJoOE5Y/eDhjbUZ1Wkc5dEpU/SXdjR1Z2Y0d4bGZH/VnVmREI4ZkRCOGZI/d3c",
    name: "Diana Black",
    content: "Highly recommend this travel agency!",
  },
];

const destinations = [
  {
    city: "San Francisco",
    code: "SFO",
    price: 1867,
    imageUrl:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=2400&q=80",
  },
  {
    city: "Doha",
    code: "DOH",
    price: 514,
    imageUrl:
      "https://imgs.search.brave.com/fuB7XZ9Roz3enhV1-txG9o51rj4-w3iS-i7t_ZhOYdE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTk3/MjkwNTcwL3Bob3Rv/L3ZpcmJhc2huamkt/ZG9sLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1xT2lJYXpv/RXhPMzN2c0ZkdWR0/a3Etd1k4TTdYWllT/WURKcUJINXhhcVdF/PQ",
  },
  {
    city: "Cairo",
    code: "CAI",
    price: 707,
    imageUrl:
      "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=2400&q=80",
  },
];

function Header({ startDate, endDate }) {
  return (
    <Box mb={4}>
      <Box display="flex" alignItems="center" gap={1}>
        <Plane size={24} color="blue" />
        <Typography variant="h5" fontWeight="bold">
          Explore the world from Lucknow
        </Typography>
      </Box>
      <Typography variant="subtitle1" color="textSecondary">
        Find flights departing {startDate} and returning {endDate}
      </Typography>
    </Box>
  );
}

// Map Component
function Map() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: 400,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <iframe
        title="Flight Map"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30766587.069145154!2d60.975476867354665!3d19.725949986729145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1733637505061!5m2!1sen!2sin"
      />
    </Box>
  );
}

// Flight Card Component
function FlightCard({ city, code, price, imageUrl }) {
  return (
    <Card sx={{ display: "flex", boxShadow: 2 }}>
      <CardMedia
        component="img"
        image={imageUrl}
        alt={city}
        sx={{ width: 120, height: 120, borderRadius: 2 }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{city}</Typography>
        <Typography variant="body2" color="textSecondary">
          LKO - {code}
        </Typography>
        <Typography variant="h6" fontWeight="bold" mt={1}>
          ${price.toLocaleString()}
        </Typography>
      </CardContent>
      <IconButton>
        <Heart size={24} style={{ transition: "0.3s" }} />
      </IconButton>
    </Card>
  );
}


export default function HomePage() {
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % popularDestinations.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const visibleDestinations = [
    popularDestinations[currentIndex],
    popularDestinations[(currentIndex + 1) % popularDestinations.length],
    popularDestinations[(currentIndex + 2) % popularDestinations.length],
  ];

  // Check if `popularDestinations` is empty
  if (!popularDestinations || popularDestinations.length === 0) {
    return <Typography>No destinations available</Typography>;
  }


  useEffect(() => {
    const toggleScrollButtonVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsScrollButtonVisible(true);
      } else {
        setIsScrollButtonVisible(false);
      }
    };
    window.addEventListener("scroll", toggleScrollButtonVisibility);
    return () =>
      window.removeEventListener("scroll", toggleScrollButtonVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [alignment, setAlignment] = useState("today");

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const [selectedOffer, setSelectedOffer] = useState("");

  const handleChange = (event) => {
    setSelectedOffer(event.target.value);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #1e3a8a, #2563eb)",
        color: "white",
      }}
    >
      <Box sx={{ mx: "auto", px: 2, maxWidth: "1200px" }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: "center", py: 6, mt: 5 }}>
          <Typography
            variant="h2"
            component="h1"
            fontWeight="bold"
            gutterBottom
          >
            Discover Your Next Adventure
          </Typography>
          <Typography variant="h6" gutterBottom>
            Explore the world with TOURIST_VERS
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={Link}
            to="/login"
            sx={{
              fontSize: "1.1rem",
              padding: "8px 17px",
              borderRadius: "10px",
              marginTop: 2,
              textTransform: "none",
              fontFamily: "Poppins, sans-serif",
              borderColor: "#fff",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#2596be",
              },
            }}
          >
            ➤ Start Your Journey
          </Button>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={Link}
            to="/register"
            sx={{
              fontSize: "1.1rem",
              padding: "8px 17px",
              borderRadius: "10px",
              marginTop: 2,
              marginLeft: 1,
              textTransform: "none",
              fontFamily: "Poppins, sans-serif",
              borderColor: "#fff",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#2596be",
              },
            }}
          >
            ➤ Sign Up Now
          </Button>
        </Box>

        {/* Search Section */}
        <Box sx={{ flexGrow: 1 }}>
          <Card
            sx={{
              mb: 6,
              p: 5,
              backgroundColor: "#fff",
              borderRadius: 4,
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Grid container spacing={2}>
              {/* Source Name Input */}
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Enter Source Name"
                  variant="outlined"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      "& fieldset": {
                        borderColor: "#ff5722",
                      },
                      "&:hover fieldset": {
                        borderColor: "#ff5722",
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <LocationOn sx={{ mr: 1 }} style={{ color: "#ff5722" }} />
                    ),
                  }}
                />
              </Grid>

              {/* Destination Name Input */}
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Enter Destination Name"
                  variant="outlined"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      "& fieldset": {
                        borderColor: "#ff5722",
                      },
                      "&:hover fieldset": {
                        borderColor: "#ff5722",
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <LocationOn sx={{ mr: 1 }} style={{ color: "#ff5722" }} />
                    ),
                  }}
                />
              </Grid>

              {/* Departure Section */}
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Departure"
                  type="date" // Specifies the input as a date picker
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      "& fieldset": {
                        borderColor: "#ff5722",
                      },
                      "&:hover fieldset": {
                        borderColor: "#ff5722",
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: <CalendarToday />,
                  }}
                />
              </Grid>

              {/* Traveller and Class Section */}
              <Grid item xs={12} sm={2.6}>
                <TextField
                  label="Traveller and Class"
                  variant="outlined"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      "& fieldset": {
                        borderColor: "#ff5722",
                      },
                      "&:hover fieldset": {
                        borderColor: "#ff5722",
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <LocationOn sx={{ mr: 1 }} style={{ color: "#ff5722" }} />
                    ),
                  }}
                />
              </Grid>

              {/* This is the Selector section */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column", // Stack vertically on mobile
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  backgroundColor: "#dcefee",
                  padding: "16px",
                  borderRadius: "8px",
                  marginTop: 3,
                  "@media (min-width:600px)": {
                    flexDirection: "row", // Row layout on medium screens and above
                  },
                }}
              >
                {/* Left Section - More Benefits and Special Fares */}
                <Box
                  sx={{
                    width: "20%",
                    textAlign: "center",
                    marginBottom: { xs: 2, sm: 0 }, // Spacing on small screens
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "blue",
                      padding: "8px 16px",
                      fontSize: "14px",
                      color: "white",
                      fontWeight: "bold",
                      fontFamily: "sans-serif",
                      borderRadius: "4px",
                      border: "none",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease, color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "darkblue";
                      e.target.style.color = "lightblue";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "blue";
                      e.target.style.color = "white";
                    }}
                  >
                    More Benefits
                  </button>

                  <Typography
                    variant="h5"
                    sx={{ marginTop: "8px", fontFamily: "sans-serif" }}
                  >
                    Special Fares
                  </Typography>
                </Box>

                {/* Right Section - Radio Buttons with Labels */}
                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <RadioGroup
                    value={selectedOffer}
                    onChange={handleChange}
                    row
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" }, // Stack on small screens, row on larger ones
                      alignItems: "flex-start",
                      justifyContent: "center",
                      width: "100%",
                      gap: "16px",
                    }}
                  >
                    {/* Individual Offer Labels */}
                    <FormControlLabel
                      value="student"
                      control={<Radio />}
                      label={
                        <Box
                          sx={{
                            padding: "8px 12px",
                            backgroundColor: "#e0f7fa",
                            border: "1px solid #00796b",
                            borderRadius: "4px",
                            width: "100%",
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="body2">
                            👨‍🎓 <span style={{ fontSize: "20px" }}>Student</span>{" "}
                            <br /> Extra Offer
                          </Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      value="senior"
                      control={<Radio />}
                      label={
                        <Box
                          sx={{
                            padding: "8px 12px",
                            backgroundColor: "#e0f7fa",
                            border: "1px solid #00796b",
                            borderRadius: "4px",
                            width: "100%",
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="body2">
                            👴{" "}
                            <span style={{ fontSize: "20px" }}>
                              Senior Citizen
                            </span>{" "}
                            <br /> Exclusive Offer
                          </Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      value="armedForce"
                      control={<Radio />}
                      label={
                        <Box
                          sx={{
                            padding: "8px 12px",
                            backgroundColor: "#e0f7fa",
                            border: "1px solid #00796b",
                            borderRadius: "4px",
                            width: "100%",
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="body2">
                            💂‍♀️{" "}
                            <span style={{ fontSize: "20px" }}>
                              Armed Force
                            </span>{" "}
                            <br /> Exclusive Offer
                          </Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      value="doctorNurse"
                      control={<Radio />}
                      label={
                        <Box
                          sx={{
                            padding: "8px 12px",
                            backgroundColor: "#e0f7fa",
                            border: "1px solid #00796b",
                            borderRadius: "4px",
                            width: "100%",
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="body2">
                            👨‍⚕️{" "}
                            <span style={{ fontSize: "20px" }}>
                              Doctor & Nurse{" "}
                            </span>
                            <br /> Discount
                          </Typography>
                        </Box>
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    textTransform: "uppercase",
                    padding: 2,
                    borderRadius: "24px",
                    width: "250px",
                    fontWeight: "bold",
                    backgroundColor: "#ff5722",
                    "&:hover": {
                      backgroundColor: "#f4511e",
                    },
                  }}
                >
                  Search Trains
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Box>

        {/* Model from website */}

        <Box sx={{ minHeight: "100vh", py: 3 }}>
          <Box
            sx={{
              maxWidth: "lg",
              mx: "auto",
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: 3,
              p: 4,
            }}
          >
            {/* Header */}
            <Header startDate="Tue, 01/07" endDate="Tue, 01/14" />

            <Grid container spacing={4}>
              {/* Map Section */}
              <Grid item xs={14} lg={6}>
                <Paper
                  elevation={4}
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <Map />
                </Paper>

              </Grid>

              {/* Destinations Section */}
              <Grid item xs={12} lg={6}>
                <Box
                  mb={2}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ borderBottom: "2px solid #e0e0e0", pb: 1 }}
                >
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    color="primary.dark"
                  >
                    Popular Destinations
                  </Typography>
                  <Button variant="contained" color="primary" size="small">
                    See all
                  </Button>
                </Box>

                <Grid container spacing={2}>
                  {destinations.map((destination) => (
                    <Grid item xs={12} key={destination.code}>
                      <FlightCard
                        city={destination.city}
                        code={destination.code}
                        price={destination.price}
                        imageUrl={destination.imageUrl}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Popular Destinations */}
        <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 2, py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Popular Destinations
      </Typography>
      <Grid container spacing={2}>
        {visibleDestinations.map((destination, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StyledCard>
              <CardMedia
                component="img"
                height="240"
                image={destination.image}
                alt={destination.name}
              />
              <CardContent>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h5" fontWeight="bold">
                    {destination.name}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ ml: 'auto' }}
                  >
                    50% OFF First Trip
                  </Button>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>

        {/* Testimonials Section with Animation */}
        <Box mb={6}>
          <Typography variant="h4" gutterBottom>
            What Our Travelers Say
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: "35vh", // You can adjust the height as needed
              overflow: "hidden",
              position: "relative",
              background: "#f5f5f5",
              borderRadius: "10px",
            }}
          >
            {/* Scrolling content */}
            <Box
              sx={{
                marginTop: 2.8,
                display: "flex",
                position: "absolute",
                whiteSpace: "nowrap",
                animation: "scrollTestimonials 17s linear infinite",
              }}
            >
              {/* Repeat the testimonials to make the animation seamless */}
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <Card
                  key={index}
                  sx={{
                    flexShrink: 0,
                    minWidth: 300,
                    marginRight: 2,
                    marginTop: 2,
                  }}
                >
                  <CardContent>
                    <Avatar
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      sx={{ mx: "auto", mb: 2, width: 56, height: 56 }}
                    />
                    <Typography variant="body2" fontStyle="italic" gutterBottom>
                      &quot;{testimonial.content}&quot;
                    </Typography>
                    <Typography fontWeight="bold">
                      {testimonial.name} ★★★★★
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>

          {/* CSS for animation */}
          <style>
            {`
              @keyframes scrollTestimonials {
                0% {
                  transform: translateX(0%);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
            `}
          </style>
        </Box>

        {/* Newsletter */}
        <Card>
          <img
            src="https://platforms.makemytrip.com/contents/f6d3cc79-7332-408b-b064-b453fbfa27e0"
            alt=""
            width={"100%"}
            height={"110%"}
          />
        </Card>

        {/* Divider */}
        <Divider sx={{ my: 4, bgcolor: "white" }} />

        {/* Featured Experiences */}
        <Box mb={6}>
          <Typography variant="h4" gutterBottom>
            Featured Experiences
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: "100%" }}>
                <Box
                  component="img"
                  src="https://imgs.search.brave.com/ywytdbSKiYRLK2KzTFfNdQTC8BXavCQZ9YRa9r1qn5Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/ODQyNjQ4ODM4NDYt/ZWIwNDQwNGFmMzEw/P2ZtPWpwZyZxPTYw/Jnc9MzAwMCZpeGxp/Yj1yYi00LjAuMyZp/eGlkPU0zd3hNakEz/ZkRCOE1IeHpaV0Z5/WTJoOE1ueDhkSEps/YTJ0cGJtZDhaVzU4/TUh4OE1IeDhmREE9"
                  alt="Adventure"
                  sx={{ width: "100%", height: 200, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    Mountain Adventure
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Experience the thrill of the mountains.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: "100%" }}>
                <Box
                  component="img"
                  src="https://imgs.search.brave.com/WeyOyV7shuNFPIbVdPDcAIfJZht3WAgafmlBUVxL_Lo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvdHJv/cGljYWwtYmVhY2gt/Y2FiYW5hLXZpbGxh/LTU1cmdxNnU5cHc0/bXJtazcuanBn"
                  alt="Beach"
                  sx={{ width: "100%", height: 200, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    Tropical Beach Getaway
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Unwind on the serene beach.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: "100%" }}>
                <Box
                  component="img"
                  src="https://imgs.search.brave.com/1Q2eOBXoUsc6vymlf7yDm0aLgb0VP0MQHTKr6-MhrZE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVudHJhdGEuY29t/L2ltYWdlL3VwbG9h/ZC9zLS1NUkFtWm9H/Ti0tL2FyXzEuNSxj/X2ZpbGwsZHByX2F1/dG8sd19hdXRvL3Yx/NzIzNzQ3ODYwL25l/dy15b3JrLTQ3MjUx/MTUtc2NhbGVkX3Jz/dzJjNV9uaXhoaW8u/anBnP19hPUJBQ0FE/S0V2"
                  alt="City Tour"
                  sx={{ width: "100%", height: 200, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    City Tour
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Explore the best sights in the city.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Scroll to Top Button */}
        {isScrollButtonVisible && (
          <IconButton
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
              backgroundColor: "primary.main",
              color: "white",
              borderRadius: "50%",
              boxShadow: 2,
            }}
            onClick={scrollToTop}
          >
            <KeyboardArrowUp />
          </IconButton>
        )}
      </Box>

      {/* footer */}
      <Box
        sx={{
          backgroundColor: "#696969",
          width: "87%",
          margin: "0 auto",
          borderRadius: 2,
          fontSize: 18,
          color: "white",
          padding: "20px 0",
          marginTop: "auto",
        }}
      >
        <Grid
          container
          spacing={4}
          sx={{
            justifyContent: "center",
            padding: "0 20px", // Add padding for smaller screens
          }}
        >
          {/* Left Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Box>
              <Link
                href="#"
                color="inherit"
                sx={{ display: "block", textDecoration: "none", mb: 1 }}
              >
                About Us
              </Link>
              <br />
              <Link
                href="#"
                color="inherit"
                sx={{ display: "block", textDecoration: "none", mb: 1 }}
              >
                Blog
              </Link>
            </Box>
          </Grid>

          {/* Center Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Services
            </Typography>
            <Box>
              <Link
                href="#"
                color="inherit"
                sx={{ display: "block", textDecoration: "none", mb: 1 }}
              >
                Travel Packages
              </Link>
              <br />
              <Link
                href="#"
                color="inherit"
                sx={{ display: "block", textDecoration: "none", mb: 1 }}
              >
                Custom Tours
              </Link>
              <br />
              <Link
                href="#"
                color="inherit"
                sx={{ display: "block", textDecoration: "none", mb: 1 }}
              >
                Group Travel
              </Link>
            </Box>
          </Grid>

          {/* Right Section - Social Media Icons */}
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            sx={{
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
                gap: "10px",
              }}
            >
              <IconButton href="#" color="inherit">
                <Facebook />
              </IconButton>
              <IconButton href="#" color="inherit">
                <Twitter />
              </IconButton>
              <IconButton href="#" color="inherit">
                <Instagram />
              </IconButton>
              <IconButton href="#" color="inherit">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom Section */}
        <Box sx={{ textAlign: "center", marginTop: "20px" }}>
          <Typography
            variant="body2"
            color="inherit"
            sx={{ fontSize: { xs: "14px", md: "16px" } }}
          >
            &copy; {new Date().getFullYear()} Travel Agency. All Rights
            Reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
