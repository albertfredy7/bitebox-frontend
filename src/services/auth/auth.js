import toast from 'react-hot-toast';
import api from '../api';

const redirectToLoginPage = () => {
  window.location.href = '/login';
};

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    localStorage.setItem('token', response.data.token);
    
    toast.success("User registered successfully! Redirecting to login...");
    // Redirect to login page after a brief delay
    setTimeout(redirectToLoginPage, 2000); // 2 seconds delay
    return response.data;

  } catch (error) {
    console.error('Error during registration:', error);
    toast.error("Registration failed. Please try again.");
    throw error;
  }
};

// Login User
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    
    toast.success("User logged in successfully!");
    // Redirect to home page after a brief delay
    setTimeout(() => window.location.href = '/', 2000); // 2 seconds delay
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    toast.error("Login failed. Please check your credentials.");
    throw error;
  }
};

// Logout User
export const logoutUser = () => {
  // Remove the token from localStorage
  localStorage.removeItem('token');
  
  // Redirect to the login page
  toast.success("You have been logged out.");
  setTimeout(() => window.location.href = '/login', 2000); // 2 seconds delay
};
