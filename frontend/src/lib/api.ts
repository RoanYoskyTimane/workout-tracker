import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  // Only add token if it exists and it's not an auth request
  if (token && config.url && !config.url.includes('/auth/')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (data: any) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
  register: async (data: any) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
};

export const exerciseApi = {
  getAll: async () => {
    const response = await api.get('/exercises');
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/exercises', data);
    return response.data;
  },
};

export const workoutApi = {
  getAll: async () => {
    const response = await api.get('/workouts');
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/workouts', data);
    return response.data;
  },
  addExercise: async (data: any) => {
    const response = await api.post('/workouts-exercises', data);
    return response.data;
  },
};

export default api;
