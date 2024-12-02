import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { createBooking } from '../services/bookServices.js';

const stripePromise = loadStripe('pk_test_51QQ4RNHU864JrHStp0fhIgq0SI6isIkHe8wLmh5ObV6Z957z12zU5v4ppMLaZ4KzIZdGAI84htnIlHdKDuPAIARl00LDYI5BRI');

function CreateBooking() {
  const [bookingData, setBookingData] = useState({
    customerName: '',
    contactInfo: '',
    numberOfTravelers: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    if (!stripe || !elements) {
      setErrorMessage('Stripe.js has not loaded properly.');
      setIsLoading(false);
      return;
    }

    try {
      const cardElement = elements.getElement(CardElement);
      const { token, error } = await stripe.createToken(cardElement);

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }

      const response = await createBooking({ ...bookingData, token: token.id });
      setSuccessMessage(`Booking created successfully! Booking ID: ${response.id}`);
      setBookingData({ customerName: '', contactInfo: '', numberOfTravelers: '' });
    } catch (err) {
      setErrorMessage(err.response?.data?.message || err.message || 'Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create a Booking
        </Typography>
        <Box sx={{ mt: 3 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              name="customerName"
              value={bookingData.customerName}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Contact Information"
              name="contactInfo"
              value={bookingData.contactInfo}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Number of Travelers"
              name="numberOfTravelers"
              type="number"
              value={bookingData.numberOfTravelers}
              onChange={handleChange}
              required
              margin="normal"
            />
            <Box sx={{ mt: 3, border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
              <Typography variant="body1">Payment Details:</Typography>
              <CardElement />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Confirm Booking & Pay'}
            </Button>
          </form>
          {successMessage && <Typography color="success.main">{successMessage}</Typography>}
          {errorMessage && <Typography color="error.main">{errorMessage}</Typography>}
        </Box>
      </Container>
    </Elements>
  );
}

export default CreateBooking;
