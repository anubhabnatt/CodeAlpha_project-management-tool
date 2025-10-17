import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import api from '../services/api'; // Import our api service

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate(); // Hook for navigation

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the backend's register endpoint
      const res = await api.post('/users/register', { name, email, password });
      
      // If registration is successful, the response will contain user data and a token
      console.log('Registration successful:', res.data);

      // Store user data (including the token) in the browser's local storage
      localStorage.setItem('user', JSON.stringify(res.data));

      // Navigate the user to the dashboard (we'll create this page next)
      navigate('/dashboard');

    } catch (err) {
      // Handle errors (e.g., user already exists)
      console.error('Registration error:', err.response.data.message);
      alert('Registration failed: ' + err.response.data.message);
    }
  };

  return (
    <div className="form-container">
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        {/* Form inputs are the same as before */}
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
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
            minLength="6"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
       <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;