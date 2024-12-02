import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from "@mui/material";

function Navbar() {
  // Assume we have an isAuthenticated state and a user object
  const isAuthenticated = false; // Replace with actual auth state
  const user = null; // Replace with actual user object
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleMobileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setMobileMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuOpen(false);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        zIndex: 1300, // Ensures it appears above other elements
        backgroundColor: "white",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "red",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: { xs: "1.5rem", sm: "1.8rem" }, // Responsive font size
            display: "flex",
            alignItems: "center",
            "& span": {
              color: "orange",
            },
          }}
        >
          TOURIST_<span>VERS</span>
        </Typography>

        {/* Menu for larger screens */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" }, // Hide on small screens
            marginLeft: "30px",
            fontSize: { xs: "0.9rem", sm: "1.1rem" },
            cursor: "pointer",
          }}
        >
          <span style={{ color: "black", marginRight: "40px" }}> ✈ Flight</span>
          <span style={{ color: "black", marginRight: "40px" }}>🌃 Hotels</span>
          <span style={{ color: "black", marginRight: "40px" }}>🚄 Trains</span>
          <span style={{ color: "black", marginRight: "40px" }}>🚖 Cabs</span>
          <span style={{ color: "black", marginRight: "40px" }}>🚌 Bus</span>
          <span style={{ color: "black", marginRight: "40px" }}>⛺ Holiday</span>
        </Box>

        {/* Mobile Menu Button (for smaller screens) */}
        <Box
          sx={{
            display: { xs: "block", sm: "none" }, // Show only on small screens
          }}
        >
          <Button
            color="inherit"
            onClick={handleMobileMenuOpen}
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "1.5rem",
            }}
          >
            ☰
          </Button>
        </Box>

        {/* Mobile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={mobileMenuOpen}
          onClose={handleMobileMenuClose}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <MenuItem onClick={handleMobileMenuClose} component={RouterLink} to="/login">
            Login
          </MenuItem>
          <MenuItem onClick={handleMobileMenuClose} component={RouterLink} to="/contacts">
            ContactUs
          </MenuItem>
        </Menu>

        {/* Right Side Buttons */}
        <Box sx={{ display: "flex", color: "lightgreen" }}>
          {isAuthenticated ? (
            <>
              {user && user.role === "Admin" && (
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/packages/create"
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: { xs: "0.9rem", sm: "1.2rem" },
                    fontWeight: "500",
                    padding: "6px 16px",
                    transition: "background-color 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                  }}
                >
                  Create Package
                </Button>
              )}
              <Button
                color="inherit"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: { xs: "0.9rem", sm: "1.2rem" },
                  fontWeight: "500",
                  padding: "6px 16px",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "red",
                  },
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={RouterLink}
                to="/login"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: { xs: "0.9rem", sm: "1.2rem" },
                  fontWeight: "500",
                  padding: "6px 16px",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/contacts"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: { xs: "0.9rem", sm: "1.2rem" },
                  fontWeight: "500",
                  padding: "6px 16px",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                Contact Us
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
