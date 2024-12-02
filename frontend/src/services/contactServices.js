import axios from 'axios';

// Set the base URL for your API, you can change this if needed
const API_URL = 'https://trav-booking.onrender.com'; // Change to your actual backend URL

// Create a new contact
const createContact = async (contactData) => {
    try {
        const response = await axios.post(`${API_URL}/create`, contactData);
        return response.data; // returns the created contact object
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

// Get all contacts (admin use)
const getContacts = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Use your auth token from localStorage or context
            },
        });
        return response.data; // returns the list of contacts
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

// Get a contact by ID (admin use)
const getContactById = async (contactId) => {
    try {
        const response = await axios.get(`${API_URL}/${contactId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Use your auth token
            },
        });
        return response.data; // returns the specific contact
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

// Delete a contact (admin use)
const deleteContact = async (contactId) => {
    try {
        const response = await axios.delete(`${API_URL}/${contactId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Use your auth token
            },
        });
        return response.data; // returns success message
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export default {
    createContact,
    getContacts,
    getContactById,
    deleteContact,
};
