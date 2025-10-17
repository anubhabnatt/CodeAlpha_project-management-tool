const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

// We need the same 'protect' middleware. Let's create it in its own file for reusability.
// For now, we can quickly define it here again.
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};


// Route to create a task
router.route('/').post(protect, createTask);

// Route to get tasks for a specific project
router.route('/:projectId').get(protect, getTasksByProject);

// Routes to update or delete a specific task by its own ID
router.route('/:id').put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;