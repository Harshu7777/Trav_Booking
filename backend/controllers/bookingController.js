const Booking = require('../models/bookingModel');
const Package = require('../models/packageModel');
const paymentService = require('../utils/PaymentService');

// Create a Booking
exports.createBooking = async (req, res) => {
  const { customerName, contactInfo, packageId, numberOfTravelers, bookingStatus } = req.body;
  try {
    const mongoose = require('mongoose');
    if (!mongoose.Types.ObjectId.isValid(packageId)) {
      return res.status(400).json({ message: 'Invalid package ID format' });
    }

    const travelPackage = await Package.findById(packageId);
    console.log('Result of findById:', travelPackage);

    if (!travelPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    const booking = new Booking({
      customerName,
      contactInfo,
      package: packageId,
      numberOfTravelers,
      bookingStatus: bookingStatus || 'Pending',
      payment: {
        status: 'Pending',
      },
    });

    await booking.save();
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get All Bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('package');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('package');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Booking Status
exports.updateBookingStatus = async (req, res) => {
  const { status, paymentDetails } = req.body;
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update booking status
    booking.bookingStatus = status;

    // If payment details are provided, update the payment status and other details
    if (paymentDetails) {
      booking.payment.status = paymentDetails.status || booking.payment.status;
      booking.payment.transactionId = paymentDetails.transactionId || booking.payment.transactionId;
      booking.payment.amount = paymentDetails.amount || booking.payment.amount;
      booking.payment.paymentDate = paymentDetails.paymentDate || booking.payment.paymentDate;
    }

    await booking.save();
    res.status(200).json({ message: 'Booking status updated', booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Booking
exports.deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Initiate Payment for Booking
exports.initiatePayment = async (req, res) => {
  const bookingId = req.params.id;
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Assuming a payment service exists to handle payment initiation (e.g., Stripe, PayPal)
    const paymentSession = await paymentService.createPaymentSession(booking);
    
    // Set the payment session URL or session ID to send to the front end
    res.status(200).json({
      message: 'Payment initiated',
      paymentSession,
    });
  } catch (error) {
    console.error('Error initiating payment:', error);
    res.status(500).json({ error: error.message });
  }
};

// Confirm Payment for Booking
exports.confirmPayment = async (req, res) => {
  const bookingId = req.params.id;
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Verify the payment status with the third-party payment service (e.g., Stripe, PayPal)
    const paymentStatus = await paymentService.confirmPayment(booking);
    
    if (paymentStatus.success) {
      // Update booking payment details and status
      booking.bookingStatus = 'Confirmed';
      booking.payment.status = 'Paid';
      booking.payment.transactionId = paymentStatus.transactionId;
      booking.payment.amount = paymentStatus.amount;
      booking.payment.paymentDate = new Date();
      
      await booking.save();
      res.status(200).json({ message: 'Payment confirmed', booking });
    } else {
      res.status(400).json({ message: 'Payment failed' });
    }
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({ error: error.message });
  }
};

// Handle Payment Failure for Booking
exports.handlePaymentFailure = async (req, res) => {
  const bookingId = req.params.id;
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // If payment fails, you can update the status or perform some other action (e.g., cancel booking)
    booking.bookingStatus = 'Cancelled';
    booking.payment.status = 'Failed';
    await booking.save();

    res.status(200).json({ message: 'Payment failed, booking cancelled', booking });
  } catch (error) {
    console.error('Error handling payment failure:', error);
    res.status(500).json({ error: error.message });
  }
};
