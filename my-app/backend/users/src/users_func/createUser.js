const express = require('express');
const db = require('../database'); // Assuming knex is configured here

const router = express.Router();

// POST /users/createUser route
router.post('/create', async (req, res) => {
  const { first_name, last_name, username, email, password } = req.body;

  // Basic edge case handling
  if (!first_name || !last_name || !username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Email format validation using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    // Check if the username already exists
    const existingUsername = await db('users').where({ username }).first();
    if (existingUsername) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Check if the email already exists
    const existingEmail = await db('users').where({ email }).first();
    if (existingEmail) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Insert new user into the database
    const newUser = {
      first_name,
      last_name,
      username,
      email,
      password // Assuming this is already hashed
    };

    const [userId] = await db('users').insert(newUser);

    // Return success with the newly created user’s ID
    // TODO do not return user but return paseto token
    return res.status(200).json({
      message: 'User created successfully',
      user: {
        id: userId,
        first_name,
        last_name,
        username,
        email
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
