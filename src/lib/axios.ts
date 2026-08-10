import axios from 'axios';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000').replace(/\/$/, '');

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Sends httpOnly cookies
});

// Add an interceptor to unwrap data, making it easier to use with React Query
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // You can handle global errors here
    const message = error.response?.data?.error || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);
