import api from './axios';

export const hotelService = {
  getAll: () => api.get('/hotels'),
  create: (hotelData) => api.post('/hotels', hotelData),
  reserve: (hotelId, reservationData) => api.post(`/hotels/${hotelId}/reserve`, reservationData),
  addReview: (hotelId, reviewData) => api.post(`/hotels/${hotelId}/reviews`, reviewData),
};

export const countryService = {
  getAll: (name = '') => api.get('/countries', { params: { name } }),
};

export const cityService = {
  getAll: () => api.get('/cities'),
  getById: (id) => api.get(`/cities/${id}`),
  create: (cityData) => api.post('/cities', cityData),
};

export const authService = {
  register: (userData) => api.post('/register', userData),
  login: (credentials) => api.post('/login', credentials),
  getCurrentUser: () => api.get('/me'),
};

export const userService = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  delete: (id) => api.delete(`/users/${id}`),
};

export const flightService = {
  getAll: (origin = '', destination = '') => api.get('/flights', { params: { origin, destination } }),
  getById: (id) => api.get(`/flights/${id}`),
  create: (flightData) => api.post('/flights', flightData),
};

export default api;
