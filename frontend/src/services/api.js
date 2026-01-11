import axios from 'axios';

const API_URL = 'http://localhost:3000';

const TOKEN_STORAGE_KEY = 'hive_access_token';

export const tokenStorage = {
  get: () => localStorage.getItem(TOKEN_STORAGE_KEY) || '',
  set: (token) => localStorage.setItem(TOKEN_STORAGE_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_STORAGE_KEY),
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  me: () => api.get('/auth/me'),
};

export const roomsAPI = {
  getAll: () => api.get('/rooms'),
  getOne: (id) => api.get(`/rooms/${id}`),
  create: (data) => api.post('/rooms', data),
  delete: (id) => api.delete(`/rooms/${id}`),
};

export const messagesAPI = {
  getAll: () => api.get('/messages'),
  getByRoom: (roomId) => api.get(`/messages/room/${roomId}`),
  create: (data) => api.post('/messages', data),
};

export default api;
