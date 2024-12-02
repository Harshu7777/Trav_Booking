import axios from 'axios';

const API_URL = 'http://localhost:4000/api/bookings';

// Fetch all bookings (Admin only)
export const getBookings = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/get`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error.response?.data || error.message);
    throw error;
  }
};

// Fetch a booking by ID
export const getBookingById = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching booking by ID:', error.response?.data || error.message);
    throw error;
  }
};

// Create a new booking
export const createBooking = async (bookingData, token) => {
  try {
    const response = await axios.post(`${API_URL}/create`, bookingData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error.response?.data || error.message);
    throw error;
  }
};

// Update booking status (Admin only)
export const updateBookingStatus = async (id, status, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/${id}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating booking status:', error.response?.data || error.message);
    throw error;
  }
};

// Delete a booking (Admin only)
export const deleteBooking = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting booking:', error.response?.data || error.message);
    throw error;
  }
};

// Initiate payment for a booking
export const initiatePayment = async (id, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/${id}/payment/initiate`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error initiating payment:', error.response?.data || error.message);
    throw error;
  }
};

// Confirm payment for a booking
export const confirmPayment = async (id, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/${id}/payment/confirm`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error confirming payment:', error.response?.data || error.message);
    throw error;
  }
};

// Handle payment failure for a booking
export const handlePaymentFailure = async (id, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/${id}/payment/failure`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error handling payment failure:', error.response?.data || error.message);
    throw error;
  }
};
