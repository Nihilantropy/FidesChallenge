const express = require('express');
const { V4 } = require('paseto'); // Using V4 version of Paseto for token creation
const db = require('../database'); // Assuming you have a configured knex instance
const bcrypt = require('bcrypt'); // Assuming you're storing hashed passwords in the DB
const crypto = require('crypto'); // To generate a key for Paseto

const router = express.Router();

// Generate a secret key for Paseto (usually you store this securely in your environment)
const PASSPHRASE_SECRET = crypto.randomBytes(32);

// POST /users/login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await db('users').where({ email }).first();

        // If the user is not found
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if the provided password matches the hashed password in the DB
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // If password matches, generate a Paseto token
        const token = await V4.sign(
            { id: user.id, email: user.email }, // Payload
            PASSPHRASE_SECRET, // Secret key
            { expiresIn: '1h' } // Token expiration time (1 hour)
        );

        // Return the token to the client
        return res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
