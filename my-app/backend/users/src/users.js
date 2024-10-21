import express from 'express';
const router = express.Router();

// Import user functionalities from separate modules
import loginUser from './user_func/login.js';
import authenticate from './user_func/authenticate.js';
import createUser from './user_func/createUser.js';
import getUserData from './user_func/getData.js';

import { catchErrorTyped } from './err/dist/catchError.js';
import { CustomError } from './err/dist/CustomError.js';

// User creation route
router.post('/create', async (req, res) => {
	const userData = req.body;
	const [err, newUser] = await catchErrorTyped(createUser(userData), [CustomError]);

	// If there's an error, handle it
	if (err) {
		console.error(err.message);
		return res.status(err.code).json({ message: err.message });
	}

	// Successfully created the user
	console.log('User created:', newUser);
	return res.status(201).json(newUser);
});

// User login route
router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	const [err, token] = await catchErrorTyped(loginUser(email, password), [CustomError]);

	// Check for errors
	if (err) {
		const statusCode = err.code || 500; // Fallback to 500 if err.code is undefined
		return res.status(statusCode).json({ message: err.message });
	}

	// If the token is returned successfully
	if (token) {
		return res.status(200).json({ token });
	}

});

// Get user data route
router.get('/data', async (req, res) => {
	try {
	const [err, user] = await catchErrorTyped(getUserData(req, res), [CustomError]);

	if (err) {
		return res.status(err.code).json({ message: err.message });
	}

	res.status(200).json(user);
	} catch (error) {
	res.status(500).json({ message: 'An error occurred', error: error.message });
	}
});

router.get('/protected', authenticate, (req, res) => {
	res.status(200).json({ message: 'You have accessed a protected route!', user: req.user });
});

export default router;
