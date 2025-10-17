const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// http://localhost:5001/api/users/register
router.post('/register', registerUser);

// http://localhost:5001/api/users/login
router.post('/login', loginUser);

module.exports = router;