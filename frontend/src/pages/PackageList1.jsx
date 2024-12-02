import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function PackageList1() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    // Fetch packages from API
    // For now, we'll use dummy data
    setPackages([
      { id: 1, title: 'Beach Getaway', destination: 'Maldives', price: 1500 },
      { id: 2, title: 'Mountain Adventure', destination: 'Swiss Alps', price: 1200 },
      { id: 3, title: 'City Explorer', destination: 'Tokyo', price: 1800 },
    ]);
  }, []);

  return (
    <Container 
      maxWidth="lg" 
      sx={{
        marginTop: 15, 
        background: 'linear-gradient(135deg, rgba(255, 223, 186, 0.6), rgba(255, 204, 128, 0.8))',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', color: '#333' }}>
        Travel Packages
      </Typography>
      
      {/* Highlighted Section */}
      <Box 
        sx={{
          backgroundColor: '#ffffff', 
          padding: 3, 
          marginBottom: 4, 
          borderRadius: 3, 
          boxShadow: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" color="primary" align="center">
          For More Package Offers, Please 
          <RouterLink to="/register">
            <span style={{ color: 'green', fontWeight: 'bold',  }}>  Register  </span>
          </RouterLink>
          or
          <RouterLink to="/login">
            <span style={{ color: 'red', fontWeight: 'bold' }}>  Login</span>
          </RouterLink>
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        {packages.map((pkg) => (
          <Grid item key={pkg.id} xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#333' }}>
                  {pkg.title}
                </Typography>
                <Typography color="textSecondary" sx={{ fontStyle: 'italic' }}>
                  {pkg.destination}
                </Typography>
                <Typography variant="body2" component="p" sx={{ marginTop: 1, fontWeight: 'bold' }}>
                  Price: ${pkg.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={RouterLink} to={`/packages/${pkg.id}`} sx={{
                  borderRadius: '20px', 
                  backgroundColor: '#ff7b54', 
                  color: '#fff', 
                  '&:hover': {
                    backgroundColor: '#ff5722'
                  }
                }}>
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default PackageList1;
