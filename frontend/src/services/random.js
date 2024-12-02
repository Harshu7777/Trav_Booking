<Box sx={{ mt: 4 }}>
  <Button
    variant="contained"
    color="primary"
    component={RouterLink}
    to="/packages1"
    sx={{
      mr: 2,
      fontSize: "1.1rem",
      padding: "12px 30px",
      borderRadius: "25px",
      textTransform: "none",
      fontFamily: "Poppins, sans-serif",
      boxShadow: 4,
      "&:hover": {
        boxShadow: 8,
      },
    }}
  >
    ➤ Explore Packages
  </Button>
  <Button
    variant="outlined"
    color="primary"
    component={RouterLink}
    to="/register"
    sx={{
      fontSize: "1.1rem",
      padding: "12px 30px",
      borderRadius: "25px",
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
</Box>;
