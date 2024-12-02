const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    destination: {
        type: String,
        required: [true, 'Destination name is required'],
      },
      title: {
        type: String,
        required: [true, 'Package title is required'],
      },
      description: {
        type: String,
        required: [true, 'Package description is required'],
      },
      price: {
        type: Number,
        required: [true, 'Price is required'],
      },
      availableDates: {
        type: [Date],
        required: [true, 'At least one available date is required'],
      },
      maxTravelers: {
        type: Number,
        required: [true, 'Maximum number of travelers is required'],
      },
}, {
    timestamps: true
})

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;