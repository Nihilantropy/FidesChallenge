const express = require('express');
const router = express.Router();

// Import user functionalities from separate modules
const loginUser = require('./user_func/login');
const createUser = require('./user_func/createUser');
const getUserData = require('./user_func/getData');

// User login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

// User creation route
router.post('/create', async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

// Get all user data
router.get('/data', async (req, res) => {
  try {
    const users = await getUserData();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

module.exports = router;
