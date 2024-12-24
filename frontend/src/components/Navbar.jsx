import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { logoutUser } from "../pages/Logout";

function Navbar({ isLoggedIn, isAdmin }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logoutUser(navigate);
  };

  const externalLinks = [
    { name: "✈ Flight", href: "https://www.kayak.com/flights" },
    { name: "🏩 Hotels", href: "https://www.makemytrip.com/hotels/" },
    { name: "🚄 Trains", href: "https://www.makemytrip.com/trains/" },
    { name: "🚘 Cabs", href: "https://www.makemytrip.com/cabs/" },
    { name: "🚎 Bus", href: "https://www.makemytrip.com/buses/" },
    { name: "⛱ Holiday", href: "https://www.makemytrip.com/hotels/" },
  ];

  const drawerContent = (
    <Box sx={{ width: 250, padding: 2 }}>
      <Typography
        variant="h6"
        sx={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, marginBottom: 2 }}
      >
        TOURIST_<span style={{ color: "orange" }}>VERS</span>
      </Typography>
      <List>
        <ListItem button component={NavLink} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        {isLoggedIn ? (
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <ListItem button component={NavLink} to="/login">
            <ListItemText primary="Login" />
          </ListItem>
        )}
        <ListItem button component={NavLink} to="/contacts">
          <ListItemText primary="Contact Us" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "white", color: "black" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={NavLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "red",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
          }}
        >
          TOURIST_<span style={{ color: "orange" }}>VERS</span>
        </Typography>

        {/* Mobile Menu Icon */}
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <IconButton edge="start" color="inherit" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Desktop Links */}
        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
          {externalLinks.map((link) => (
            <Button
              key={link.name}
              color="inherit"
              component="a"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "black" }}
            >
              {link.name}
            </Button>
          ))}
          {isLoggedIn ? (
            <Button color="inherit" onClick={handleLogout} sx={{ color: "black" }}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={NavLink} to="/login" sx={{ color: "black" }}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        {drawerContent}
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
