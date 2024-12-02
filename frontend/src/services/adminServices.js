import axios from 'axios';
const API_URL = 'https://trav-booking.onrender.com';

export const registerAdmin = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, formData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};


// Existing loginAdmin function
export const loginAdmin = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials , {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

