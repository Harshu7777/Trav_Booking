const express = require('express');
const router = express.Router();
const {
    createContact,
    getContacts,
    getContactById,
    deleteContact,
} = require('../controllers/contactController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

// Public route to create a contact
router.post('/create', createContact);

// Private/Admin routes to manage contacts
router.get('/', protect, getContacts);
router.get('/:id', protect, adminOnly, getContactById);
router.delete('/:id', protect, adminOnly , deleteContact);

module.exports = router;
