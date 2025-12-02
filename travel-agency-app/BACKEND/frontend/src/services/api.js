import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Countries API
export const getCountries = async (name) => {
  try {
    const params = name ? { name } : {};
    const response = await api.get('/countries', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

// Cities API
export const getCities = async (filters = {}) => {
  try {
    const response = await api.get('/cities', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};

export const getCityById = async (cityId) => {
  try {
    const response = await api.get(`/cities/${cityId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching city:', error);
    throw error;
  }
};

export const createCity = async (cityData) => {
  try {
    const response = await api.post('/cities', cityData);
    return response.data;
  } catch (error) {
    console.error('Error creating city:', error);
    throw error;
  }
};

// Hotels API
export const getHotels = async (filters = {}) => {
  try {
    const response = await api.get('/hotels', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};

// Hotels API - Create
export const createHotel = async (hotelData) => {
  try {
    const response = await api.post('/hotels', hotelData);
    return response.data;
  } catch (error) {
    console.error('Error creating hotel:', error);
    throw error;
  }
};

// Hotels API - Reserve
export const reserveHotel = async (hotelId, reservationData) => {
  try {
    const response = await api.post(`/hotels/${hotelId}/reserve`, reservationData);
    return response.data;
  } catch (error) {
    console.error('Error reserving hotel:', error);
    throw error;
  }
};

// Hotels API - Add Review
export const addReview = async (hotelId, reviewData) => {
  try {
    const response = await api.post(`/hotels/${hotelId}/reviews`, reviewData);
    return response.data;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

// Users API
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export default api;

