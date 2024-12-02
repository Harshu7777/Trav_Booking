const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
  initiatePayment,
  confirmPayment,
  handlePaymentFailure
} = require('../controllers/bookingController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

// Create a new booking (requires authentication)
router.post('/create', protect, createBooking);

// Get all bookings (admin-only route)
router.get('/get', protect, getAllBookings);

// Get booking by ID (requires authentication)
router.get('/:id', protect, getBookingById);

// Update booking status (admin-only route)
router.put('/:id/status', protect, adminOnly, updateBookingStatus);

// Delete a booking (admin-only route)
router.delete('/:id', protect, adminOnly, deleteBooking);

// Initiate Payment for a Booking (requires authentication)
router.post('/:id/payment/initiate', protect, initiatePayment);

// Confirm Payment for a Booking (requires authentication)
router.post('/:id/payment/confirm', protect, confirmPayment);

// Handle Payment Failure (requires authentication)
router.post('/:id/payment/failure', protect, handlePaymentFailure);

module.exports = router;
