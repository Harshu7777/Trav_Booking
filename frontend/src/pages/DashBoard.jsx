import React from "react";
import { useNavigate } from "react-router-dom";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Link,
  IconButton,
  CardMedia,
} from "@mui/material";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/packages"); // Redirect to /packages when the button is clicked
  };

  // Random image URL (can replace with dynamic image or API)
  const randomImage =
    "https://previews.123rf.com/images/miniwide/miniwide2106/miniwide210600372/170214917-vacation-travel-concept-banner-poster-the-suitcases-are-piled-up-and-people-are-having-fun-flat.jpg";

  const travelExperiences = [
    {
      id: 1,
      title: "Explore the Beaches of Bali",
      description:
        "A paradise for sun-seekers, the beaches of Bali offer amazing views and incredible surf spots.",
      image:
        "https://imgs.search.brave.com/tBSPxGZkqTq6x3Vpo5_GWvBjbt7qV_gkromJRREwqSc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTI1/NjcwMjAzL3Bob3Rv/L3Nub3ctYmlraW5n/LWNvdXBsZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9Rkww/TDZRekc2X2d1T1BW/VHRzLUd0d1FvOGdG/azU0QmIwTmh3T2JV/YXZWZz0",
    },
    {
      id: 2,
      title: "Mountain Adventures in the Swiss Alps",
      description:
        "Experience breathtaking views and exhilarating hikes through the majestic Swiss Alps.",
      image:
        "https://imgs.search.brave.com/zNAuS38cFXE8joNBH5jOJ7rD93BihIzkU9e2t18zvUs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3Lzk0LzY0LzEw/LzM2MF9GXzc5NDY0/MTAxOV9rNmVRR29V/TjNkeU9HdWVITzMz/bmU4bUFJVWIyVHIy/dS5qcGc",
    },
    {
      id: 3,
      title: "The Ballons of Rajisthan",
      description:
        "Explore the bustling streets, unique culture, and endless shopping in the heart of Tokyo.",
      image:
        "https://imgs.search.brave.com/6EajUdTIemniwWDUELoGIJ5JJbMguDxU0cMntIq_WI4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ0/MTkyNjQyMC9waG90/by9ob3QtYWlyLWJh/bGxvb25zLWF0LWxv/dmUtdmFsbGV5LWlu/LWNhcHBhZG9jaWEu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PXNncTlXMVo3aHYz/OXUzYW52MzZVVGg2/R3dKYmREWUlhUHpu/OUpLcXd0X289",
    },
    {
      id: 4,
      title: "Explore the Maharastra",
      description:
        "Explore the bustling streets, unique culture, and endless shopping in the heart of Tokyo.",
      image:
        "https://imgs.search.brave.com/XrH8FJUdGterVlbbA8bo1PBuWg68YeQX3B60ERMbOCI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI5/NzM0OTc0Ny9waG90/by9ob3QtYWlyLWJh/bGxvb25zLWZseWlu/Zy1vdmVyLXRoZS1i/b3Rhbi1jYW55b24t/aW4tdHVya2V5Lmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1r/dDgtUlJ6Q0R1bnB4/Z0tGTUJCalo2alN0/ZWV0TmhoU3hIWkZ2/SFEwaE5VPQ",
    },
    {
      id: 5,
      title: "The Vibrant Streets of Tokyo",
      description:
        "Explore the bustling streets, unique culture, and endless shopping in the heart of Tokyo.",
      image:
        "https://imgs.search.brave.com/HbWvoDvdjjEmL2xrEx6ZQO3xEvxshoR02tnrzoNeOrc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzY5LzU1LzE0/LzM2MF9GXzU2OTU1/MTQ2N191eUdqSDh1/bDc5eUZieVdQQW5s/ZGZFaGs3UmZpZ3du/Vy5qcGc",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 3,
        marginTop: 10,
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 5,
          backgroundImage: `url(${randomImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "75vh",
          color: "green",
          borderRadius: 3,
          boxShadow: 4,
          textAlign: "center",
          position: "relative",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: 40,
            padding: "12px 30px",
            borderRadius: "25px",
            textTransform: "none",
            boxShadow: 3,
            "&:hover": { boxShadow: 6 },
          }}
          onClick={handleExploreClick}
        >
          Explore Packages
        </Button>
      </Box>

      <br />

      {/* Dashboard Content Section */}
      <Box sx={{ display: "flex", flexDirection: "column", marginTop: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ textAlign: "center", fontFamily: "Poppins, sans-serif" }}
        >
          Our Travel Experiences
        </Typography>

        {/* Travel Experience Cards */}
        <Grid container spacing={4} sx={{ justifyContent: "center" }}>
          {travelExperiences.map((exp, index) => (
            <Grid item key={exp.id} xs={12} md={index >= 3 ? 4 : 4}>
              {" "}
              {/* Last two cards take up 6 columns */}
              <Card sx={{ height: "100%", boxShadow: 3, borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  alt={exp.title}
                  height="200"
                  image={exp.image}
                  sx={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    {exp.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    {exp.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <br />
      <br />

      <Box
        sx={{
          margin: "0 auto",
          width: "100%",
          height: "17vh",
          overflow: "hidden",
          position: "relative",
          background: "#f5f5f5",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Scrolling content */}
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            whiteSpace: "nowrap",
            animation: "scroll 20s linear infinite",
          }}
        >
          {/* Repeat the company names to make the animation seamless */}
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              {[
                <span style={{ color: "red" }}>🚘 Goibebo</span>,
                <span style={{ color: "green" }}>✈ Makemytrip</span>,
                <span style={{ color: "Black" }}>🚓 Advanture.com</span>,
                <span style={{ color: "yellow" }}>🚀 Trav_dev</span>,
                <span style={{ color: "purple" }}>🏍 Mahindra_Motors</span>,
                <span style={{ color: "Green" }}>🚎 American_Tourist</span>,
                "🚄 Blue_Tour",
                <span style={{ color: "orange" }}>🚁 Big_Travelers</span>,
                "🪂 Ola_Bookings",
              ].map((company, index) => (
                <Typography
                  key={index}
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    margin: "0 20px",
                    fontFamily: "Poppins, sans-serif",
                    color: "#333",
                  }}
                >
                  {company}
                </Typography>
              ))}
            </React.Fragment>
          ))}
        </Box>

        {/* CSS for animation */}
        <style>
          {`
          @keyframes scroll {
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

      {/* New Section with 50% Image and 50% Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Stacks vertically on small screens
          width: "100%",
          height: { xs: "auto", md: "50vh" }, // Adjust height for small screens
          marginTop: 6,
          gap: 2, // Adds spacing between items
        }}
      >
        {/* Video on the left side */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" }, // Full width on small screens, half on medium and above
            height: { xs: "auto", md: "100%" },
          }}
        >
          <video
            src="https://media.istockphoto.com/id/1198918178/video/departure-from-venice-by-boat.mp4?s=mp4-640x640-is&k=20&c=CRxPYyqDbg0HmRSbnu4OtoofkEo_JwN7LmEeeVNAufQ="
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "15px",
            }}
          ></video>
        </Box>

        {/* Content on the right side */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            padding: { xs: 2, md: 3 },
            textAlign: { xs: "center", md: "left" }, // Center-align text on small screens
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "1.5rem", md: "2rem" }, // Adjust font size for responsiveness
            }}
          >
            Discover Venice by Boat
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Roboto, sans-serif",
              marginTop: 2,
              fontSize: { xs: "0.9rem", md: "1rem" }, // Adjust font size for small screens
            }}
          >
            Explore the beauty of Venice from the water and experience its charm
            like never before. Cruise through historic canals and marvel at
            stunning architecture. Plan your dream journey today with our
            exclusive travel deals.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginTop: 3,
              padding: { xs: "8px 20px", md: "10px 30px" }, // Adjust padding for button
              borderRadius: "25px",
              textTransform: "none",
              fontSize: { xs: "0.8rem", md: "1rem" }, // Adjust font size for button
            }}
            onClick={handleExploreClick}
          >
            Book Your Trip
          </Button>
        </Box>
      </Box>

      {/* New Section with 50% Image on Left and 50% Content on Right */}
      <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // Stack vertically on small screens
        width: "100%",
        height: { xs: "auto", md: "50vh" }, // Adjust height for small screens
        marginTop: 6,
        gap: 2, // Adds spacing between items
      }}
    >
      {/* Content on the left side */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" }, // Full width on small screens, half on medium+
          padding: { xs: 2, md: 3 },
          textAlign: { xs: "center", md: "left" }, // Center-align text on small screens
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "1.5rem", md: "2rem" }, // Adjust font size for headings
          }}
        >
          Feel The Nature With Amazon
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "Roboto, sans-serif",
            marginTop: 2,
            fontSize: { xs: "0.9rem", md: "1rem" }, // Adjust font size for body text
          }}
        >
          Explore the beauty of Venice from the water and experience its charm
          like never before. Cruise through historic canals and marvel at
          stunning architecture. Plan your dream journey today with our
          exclusive travel deals.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: 3,
            padding: { xs: "8px 20px", md: "10px 30px" }, // Adjust button padding
            borderRadius: "25px",
            textTransform: "none",
            fontSize: { xs: "0.8rem", md: "1rem" }, // Adjust button font size
          }}
          onClick={handleExploreClick}
        >
          Book Your Trip
        </Button>
      </Box>

      {/* Video on the right side */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" }, // Full width on small screens, half on medium+
          height: { xs: "auto", md: "100%" }, // Adjust height for responsiveness
        }}
      >
        <video
          src="https://media.istockphoto.com/id/1466828952/video/scottish-highlands-in-winter.mp4?s=mp4-640x640-is&k=20&c=iNDUtdW-_uhHjZgM8JdgLUWDB_Csyw0latZhSCKHaIA="
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "15px",
          }}
        ></video>
      </Box>
    </Box>

      <br />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Stack vertically on small screens
          width: "100%",
          height: { xs: "auto", md: "50vh" }, // Adjust height for small screens
          marginTop: 6,
        }}
      >
        {/* Video on the left side */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            height: { xs: "auto", md: "100%" },
          }}
        >
          <video
            src="https://media.istockphoto.com/id/1126019618/video/couple-pause-above-lake-and-floating-palace-at-sunrise.mp4?s=mp4-640x640-is&k=20&c=8HwiBrZgG_hQ3Ugoty2Io4cV9wR_cK3_44QqXaT_OXQ="
            controls
            autoPlay
            loop
            muted
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "15px",
            }}
          ></video>
        </Box>

        {/* Content on the right side */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            padding: { xs: 2, md: 3 },
            textAlign: { xs: "center", md: "left" }, // Center align text on small screens
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "1.5rem", md: "2rem" }, // Adjust font size for responsiveness
            }}
          >
            The street of Itealy
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Roboto, sans-serif",
              marginTop: 2,
              fontSize: { xs: "0.9rem", md: "1rem" }, // Adjust font size for smaller screens
            }}
          >
            Take advantage of our latest offers and get ready to book your next
            dream destination. Take advantage of our latest offers and get ready
            package for you. Take advantage of our latest offers and get ready
            to book your next dream destination.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              marginTop: 3,
              padding: { xs: "8px 20px", md: "10px 30px" }, // Adjust padding for small screens
              borderRadius: "25px",
              textTransform: "none",
              fontSize: { xs: "0.8rem", md: "1rem" }, // Adjust font size for button
            }}
            onClick={handleExploreClick}
          >
            Explore Offers
          </Button>
        </Box>
      </Box>

      <br />

      <Box
        sx={{
          backgroundColor: "#333",
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
              <Link
                href="#"
                color="inherit"
                sx={{ display: "block", textDecoration: "none", mb: 1 }}
              >
                Careers
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ display: "block", textDecoration: "none", mb: 1 }}
              >
                Blog
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ display: "block", textDecoration: "none", mb: 1 }}
              >
                Contact
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
              <Link
                href="#"
                color="inherit"
                sx={{ display: "block", textDecoration: "none", mb: 1 }}
              >
                Custom Tours
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ display: "block", textDecoration: "none", mb: 1 }}
              >
                Group Travel
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ display: "block", textDecoration: "none", mb: 1 }}
              >
                FAQ
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
              textAlign: { xs: "center", md: "left" }, // Center for small screens
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
};

export default Dashboard;
