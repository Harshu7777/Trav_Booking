import axios from 'axios';
const API_URL = 'https://trav-booking-6.onrender.com/api/admin';

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

export const logoutAdmin = async (credentials) => {
  try {
    const response = await axios.post(`http://localhost:4000/api/admin/logout`, credentials , {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

