const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

// @desc    Create a new contact
// @route   POST /api/contacts
// @access  Public
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone, enquire } = req.body;

    if (!name || !email || !phone || !enquire) {
        res.status(400);
        throw new Error('All fields are required');
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        enquire,
    });

    res.status(201).json(contact);
});

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Private/Admin
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
});

// @desc    Get a single contact
// @route   GET /api/contacts/:id
// @access  Private/Admin
const getContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }

    res.status(200).json(contact);
});

// @desc    Delete a contact
// @route   DELETE /api/contacts/:id
// @access  Private/Admin
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }

    await contact.remove();
    res.status(200).json({ message: 'Contact deleted' });
});

module.exports = {
    createContact,
    getContacts,
    getContactById,
    deleteContact,
};
