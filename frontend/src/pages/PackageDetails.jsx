import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Box, Chip } from '@mui/material';

function PackageDetails() {
  const [packageDetails, setPackageDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Fetch package details from API
    // For now, we'll use dummy data
    setPackageDetails({
      id: 1,
      title: 'Beach Getaway',
      destination: 'Maldives',
      description: 'Enjoy a relaxing week in the beautiful Maldives.',
      price: 1500,
      availableDates: ['2023-07-01', '2023-07-15', '2023-08-01'],
      maxTravelers: 4,
    });
  }, [id]);

  if (!packageDetails) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {packageDetails.title}
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        {packageDetails.destination}
      </Typography>
      <Typography variant="body1" paragraph>
        {packageDetails.description}
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Price: ${packageDetails.price}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Max Travelers: {packageDetails.maxTravelers}
        </Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Available Dates:
        </Typography>
        {packageDetails.availableDates.map((date) => (
          <Chip key={date} label={date} sx={{ mr: 1, mb: 1 }} />
        ))}
      </Box>
      <Button variant="contained" color="primary" component={RouterLink} to={`/bookings/create?packageId=${packageDetails.id}`}>
        Book Now
      </Button>
    </Container>
  );
}

export default PackageDetails;

