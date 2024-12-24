import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Box,
  Paper,
  Container
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const stripePromise = loadStripe("pk_test_51QQ4RNHU864JrHStp0fhIgq0SI6isIkHe8wLmh5ObV6Z957z12zU5v4ppMLaZ4KzIZdGAI84htnIlHdKDuPAIARl00LDYI5BRI");

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f7f7f7',
  },
  paper: {
    padding: theme.spacing(4),
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: '500px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  inputField: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
  alert: {
    marginTop: theme.spacing(2),
  },
}));

const CreateBooking = () => {
  const [bookingData, setBookingData] = useState({
    customerName: '',
    contactInfo: '',
    numberOfTravelers: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation
  const packagePrice = location.state?.price || 0;

  const classes = useStyles();

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const stripe = await stripePromise;

      const response = await fetch('http://localhost:4000/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: { name: 'Booking Payment', price: packagePrice } }),
      });

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        setErrorMessage(result.error.message);
        return;
      }

      setSuccessMessage('Booking created successfully!');
      navigate('/dashboard');

    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h6" component="h2" gutterBottom className={classes.title}>
          Package Price: ${packagePrice}
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            label="Customer Name"
            name="customerName"
            value={bookingData.customerName}
            onChange={handleChange}
            fullWidth
            className={classes.inputField}
            variant="outlined"
            required
          />
          <TextField
            label="Contact Information"
            name="contactInfo"
            value={bookingData.contactInfo}
            onChange={handleChange}
            fullWidth
            className={classes.inputField}
            variant="outlined"
            required
          />
          <TextField
            label="Number of Travelers"
            name="numberOfTravelers"
            value={bookingData.numberOfTravelers}
            onChange={handleChange}
            type="number"
            fullWidth
            className={classes.inputField}
            variant="outlined"
            required
          />
          {errorMessage && <Alert severity="error" className={classes.alert}>{errorMessage}</Alert>}
          {successMessage && <Alert severity="success" className={classes.alert}>{successMessage}</Alert>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            fullWidth
            className={classes.submitButton}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Create Booking'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateBooking;
