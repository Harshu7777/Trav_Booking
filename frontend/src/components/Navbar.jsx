import React from "react";
import { Link as RouterLink } from "react-router-dom";
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

function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const buttonStyles = { color: "black" }; // Reusable button styles

  const drawerContent = (
    <Box sx={{ width: 250, padding: 2 }}>
      <Typography
        variant="h6"
        sx={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, marginBottom: 2 }}
      >
        TOURIST_<span style={{ color: "orange" }}>VERS</span>
      </Typography>
      <List>
        <ListItem button component={RouterLink} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={RouterLink} to="/login">
          <ListItemText primary="Login" />
        </ListItem>
        <ListItem button component={RouterLink} to="/contacts">
          <ListItemText primary="Contact Us" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Flight" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Hotels" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Trains" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Cabs" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        zIndex: 1300,
        backgroundColor: "white",
        color: "black",
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
            fontSize: { xs: "1.5rem", sm: "1.8rem" },
            display: "flex",
            alignItems: "center",
          }}
        >
          TOURIST_<span style={{ color: "orange" }}>VERS</span>
        </Typography>

        {/* Mobile Menu Icon */}
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Desktop Menu */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            gap: 2,
            marginLeft: "30px",
            fontSize: { xs: "0.9rem", sm: "1.1rem" },
          }}
        >
          <Button
            color="inherit"
            component="a"
            href="https://www.kayak.com/flights"
            target="_blank"
            rel="noopener noreferrer"
            sx={buttonStyles}
          >
            ✈ Flight
          </Button>
          <Button
            color="inherit"
            component="a"
            href="https://www.makemytrip.com/hotels/"
            target="_blank"
            rel="noopener noreferrer"
            sx={buttonStyles}
          >
            🏩 Hotels
          </Button>
          <Button
            color="inherit"
            component="a"
            href="https://www.makemytrip.com/trains/"
            target="_blank"
            rel="noopener noreferrer"
            sx={buttonStyles}
          >
            🚄 Trains
          </Button>
          <Button
            color="inherit"
            component="a"
            href="https://www.makemytrip.com/cabs/"
            target="_blank"
            rel="noopener noreferrer"
            sx={buttonStyles}
          >
            🚘 Cabs
          </Button>
          <Button
            color="inherit"
            component="a"
            href="https://www.makemytrip.com/buses/"
            target="_blank"
            rel="noopener noreferrer"
            sx={buttonStyles}
          >
            🚎 Bus
          </Button>
          <Button
            color="inherit"
            component="a"
            href="https://www.makemytrip.com/hotels/"
            target="_blank"
            rel="noopener noreferrer"
            sx={buttonStyles}
          >
            ⛱ Holiday
          </Button>
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        aria-label="Navigation Menu"
        sx={{
          display: { xs: "block", sm: "none" },
        }}
      >
        {drawerContent}
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
