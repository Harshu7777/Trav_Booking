import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const PackageCard = ({ packageData }) => {
  return (
    <Card sx={{ margin: 2, width: '300px', boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {packageData?.title || "No Title Available"}
        </Typography>
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          {packageData?.description || "No description available"}
        </Typography>
        <Typography variant="body1" color="primary" sx={{ marginTop: 2 }}>
          Price: ${packageData?.price || "N/A"}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          component={Link}
          to={`/bookings/create/${packageData?.id}`} // Ensure that packageData contains an `id` field
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default PackageCard;
