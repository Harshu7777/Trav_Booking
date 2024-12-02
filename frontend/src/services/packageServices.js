import axios from 'axios';
import { getToken } from '../utils/getToken';

const API_URL = 'http://localhost:4000/api/packages'; // Ensure this base URL is correct

// Function to create a package
export const createPackage = async (packageData) => {
  const token = getToken();
  if (!token) throw new Error('User is not authenticated.');

  try {
    const response = await axios.post(
      `${API_URL}/create`,
      packageData,
      {
        headers: { Authorization: `Bearer ${token}` }, // Include token in the header
      }
    );
    return response.data; // Return created package data
  } catch (error) {
    console.error('Error creating package:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to create package.');
  }
};

// Function to get all packages
export const getPackages = async () => {
  const token = getToken();
  if (!token) throw new Error('User is not authenticated.');

  try {
    const response = await axios.get(
      `${API_URL}/getPack`,
      {
        headers: { Authorization: `Bearer ${token}` }, // Include token in the header
      }
    );
    return response.data; // Return the list of packages
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
      throw new Error(error.response.data.message || 'Failed to fetch packages');
    } else if (error.request) {
      console.error('No response from server:', error.request);
      throw new Error('No response from server. Please try again later.');
    } else {
      console.error('Error fetching packages:', error.message);
      throw new Error(error.message || 'An unexpected error occurred.');
    }
  }
};

// Function to get a package by ID
export const getPackageById = async (packageId) => {
  const token = getToken();
  if (!token) throw new Error('User is not authenticated.');

  try {
    const response = await axios.get(
      `${API_URL}/${packageId}`,
      {
        headers: { Authorization: `Bearer ${token}` }, // Include token in the header
      }
    );
    return response.data; // Return package details
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
      throw new Error(error.response.data.message || 'Failed to fetch package details');
    } else if (error.request) {
      console.error('No response from server:', error.request);
      throw new Error('No response from server. Please try again later.');
    } else {
      console.error('Error fetching package details:', error.message);
      throw new Error(error.message || 'An unexpected error occurred.');
    }
  }
};

// Function to update a package (only accessible to admins)
export const updatePackage = async (packageId, updatedData) => {
  const token = getToken();
  if (!token) throw new Error('User is not authenticated.');

  try {
    const response = await axios.put(
      `${API_URL}/${packageId}`,
      updatedData,
      {
        headers: { Authorization: `Bearer ${token}` }, // Include token in the header
      }
    );
    return response.data; // Return the updated package details
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
      throw new Error(error.response.data.message || 'Failed to update package');
    } else if (error.request) {
      console.error('No response from server:', error.request);
      throw new Error('No response from server. Please try again later.');
    } else {
      console.error('Error updating package:', error.message);
      throw new Error(error.message || 'An unexpected error occurred.');
    }
  }
};

// Function to delete a package (only accessible to admins)
export const deletePackage = async (packageId) => {
  const token = getToken();
  if (!token) throw new Error('User is not authenticated.');

  try {
    const response = await axios.delete(
      `${API_URL}/${packageId}`,
      {
        headers: { Authorization: `Bearer ${token}` }, // Include token in the header
      }
    );
    return response.data; // Return a success message or the deleted package
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
      throw new Error(error.response.data.message || 'Failed to delete package');
    } else if (error.request) {
      console.error('No response from server:', error.request);
      throw new Error('No response from server. Please try again later.');
    } else {
      console.error('Error deleting package:', error.message);
      throw new Error(error.message || 'An unexpected error occurred.');
    }
  }
};
