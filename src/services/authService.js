import api from './api';
import Cookies from 'js-cookie';

// Cookie options
const cookieOptions = {
  expires: 7, 
  secure: true,
  sameSite: 'strict',
};

// Set token and role in cookie
const setAuthCookies = (token, role) => {
  Cookies.set('token', token, cookieOptions);
  Cookies.set('userRole', role, cookieOptions);
};

// Register Government Admin
export const registerGovtAdmin = async (userData) => {
  try {
    const response = await api.post('/auth/register/govt', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login Government Admin
export const loginGovtAdmin = async (credentials) => {
  try {
    const response = await api.post('/auth/login/govt', credentials);
    if (response.data.token) {
      setAuthCookies(response.data.token, 'govt_admin');
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Register Contractor
export const registerContractor = async (contractorData) => {
  try {
    const response = await api.post('/auth/register/contractor', contractorData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login Contractor
export const loginContractor = async (credentials) => {
  try {
    const response = await api.post('/auth/login/contractor', credentials);
    if (response.data.token) {
      setAuthCookies(response.data.token, 'contractor');
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Logout
export const logout = () => {
  Cookies.remove('token');
  Cookies.remove('userRole');
  sessionStorage.clear();
  // window.location.href = '/login'; 
};

// Get current user role
export const getCurrentUserRole = () => {
  return Cookies.get('userRole');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!Cookies.get('token');
};
