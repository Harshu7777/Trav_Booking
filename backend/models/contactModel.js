const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
    },
    enquire:{
        type: String,
        required: [true, 'Enquire is required'],
    }
},{
    timestamps: true
})

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact