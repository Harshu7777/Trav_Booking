const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
  },
  contactInfo: {
    type: String,
    required: [true, 'Contact information is required'],
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
    required: [true, 'Package reference is required'],
  },
  numberOfTravelers: {
    type: Number,
    required: [true, 'Number of travelers is required'],
  },
  bookingStatus: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending',
  },
  payment: {
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed'],
      default: 'Pending',
    },
    transactionId: {
      type: String,
      required: false, // Optional, will be populated after payment
    },
    amount: {
      type: Number,
      required: false, // Optional, will be populated with payment details
    },
    paymentDate: {
      type: Date,
      required: false, // Optional, will be populated after payment
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
