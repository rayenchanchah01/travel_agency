import api from './axios';

// ==================== HOTELS ====================
export const hotelService = {
  // Get all hotels
  getAll: () => api.get('/hotels'),
  
  // Create a new hotel
  create: (hotelData) => api.post('/hotels', hotelData),
  
  // Reserve a hotel
  reserve: (hotelId, reservationData) => 
    api.post(`/hotels/${hotelId}/reserve`, reservationData),
  
  // Add a review to a hotel
  addReview: (hotelId, reviewData) => 
    api.post(`/hotels/${hotelId}/reviews`, reviewData),
};

// ==================== COUNTRIES ====================
export const countryService = {
  // Get all countries (with optional name filter)
  getAll: (name = '') => api.get('/countries', { params: { name } }),
};

// ==================== CITIES ====================
export const cityService = {
  // Get all cities
  getAll: () => api.get('/cities'),

  // Get city by ID
  getById: (id) => api.get(`/cities/${id}`),

  // Create a new city
  create: (cityData) => api.post('/cities', cityData),
};

// ==================== USERS ====================
export const userService = {
  // Get all users
  getAll: () => api.get('/users'),

  // Get user by ID
  getById: (id) => api.get(`/users/${id}`),

  // Register a new user
  register: (userData) => api.post('/register', userData),

  // Login user
  login: (credentials) => api.post('/login', credentials),
};

// ==================== FLIGHTS ====================
export const flightService = {
  // Get all flights (with optional origin/destination filter)
  getAll: (origin = '', destination = '') =>
    api.get('/flights', { params: { origin, destination } }),

  // Get flight by ID
  getById: (id) => api.get(`/flights/${id}`),

  // Create a new flight
  create: (flightData) => api.post('/flights', flightData),
};

export default api;

