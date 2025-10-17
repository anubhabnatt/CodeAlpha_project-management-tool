import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001/api',
});

// This is an interceptor. It's a function that runs BEFORE every single request.
API.interceptors.request.use((req) => {
  const user = localStorage.getItem('user');
  if (user) {
    // If a user is logged in, parse the user object and get the token
    const token = JSON.parse(user).token;
    // Set the Authorization header for the request
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;