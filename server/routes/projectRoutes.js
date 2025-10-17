const express = require('express');
const router = express.Router();
const { createProject, getProjects } = require('../controllers/projectController');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// --- Authentication Middleware ---
// This function will protect our routes
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (e.g., "Bearer eyJhbGci...")
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token's ID and attach it to the request object
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Move on to the next function (the controller)
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// --- Project Routes ---
// Any request to '/' in this file is actually '/api/projects/'
router.route('/').post(protect, createProject).get(protect, getProjects);

module.exports = router;