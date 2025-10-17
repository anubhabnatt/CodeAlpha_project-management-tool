import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import api from '../services/api'; // Import our api service

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate(); // Hook for navigation

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the backend's login endpoint
      const res = await api.post('/users/login', { email, password });

      // If login is successful, log the response
      console.log('Login successful:', res.data);

      // Store user data and token in local storage
      localStorage.setItem('user', JSON.stringify(res.data));

      // Navigate the user to the dashboard
      navigate('/dashboard');

    } catch (err) {
      // Handle login errors (e.g., wrong password)
      console.error('Login error:', err.response.data.message);
      alert('Login failed: ' + err.response.data.message);
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        {/* Form inputs are the same as before */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;