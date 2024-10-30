import express from 'express';
const router = express.Router();

import dotenv from 'dotenv';
dotenv.config();

// Import user functionalities from separate modules
import loginUser from './user_func/login.js';
import createUser from './user_func/createUser.js';
import getProfile from './user_func/getProfile.js';
import deleteUser from './user_func/deleteUser.js';
import { authenticate } from './middleware/auth.js';

import { catchErrorTyped } from './err/dist/catchError.js';
import { CustomError } from './err/dist/CustomError.js';

// User creation route
router.post('/create', async (req, res) => {
	const userData = req.body;
	// console.log(userData);
	const [err, token] = await catchErrorTyped(createUser(userData), [CustomError]);

	// If there's an error, handle it
	if (err) {
		console.error(err.message);
		return res.status(err.code).json({ message: err.message });
	}

	console.log(token);
	return res.status(201).json({ token });
});

// User login route
router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	
	console.log( email, password );
	const [err, token] = await catchErrorTyped(loginUser(email, password), [CustomError]);

	// Check for errors
	if (err) {
		const statusCode = err.code || 500; // Fallback to 500 if err.code is undefined
		console.log(err.message);
		return res.status(statusCode).json({ message: err.message });
	}
	// If the token is returned successfully
	console.log(token);
	return res.status(200).json({ token });

});

// Protected Profile route
router.get('/profile', async (req, res) => {

	console.log("authentication requested")
	// Use the catchErrorTyped function to handle any errors thrown by the authenticate middleware
	const [authErr] = await catchErrorTyped(authenticate(req), [CustomError]);

	if (authErr) {
		return res.status(authErr.code).json({ message: authErr.message });
	}

	console.log("Authentication passed!");

	const userId = req.user.id; // Assuming user ID is attached to the request object by the authenticate middleware
	const [err, profile] = await catchErrorTyped(getProfile(userId), [CustomError]);

	if (err) {
		return res.status(err.code).json({ message: err.message });
	}

	console.log(profile);
	res.status(200).json(profile);
});

router.delete('/delete', async (req, res) => {
	// Use the catchErrorTyped function to handle any errors thrown by the authenticate middleware
	const [authErr] = await catchErrorTyped(authenticate(req), [CustomError]);

	if (authErr) {
		return res.status(authErr.code).json({ message: authErr.message });
	}

	const userId = req.user.id; // Extract the user ID from the token (set in authenticate)

	// Use catchErrorTyped to handle potential errors without try-catch
	const [err, result] = await catchErrorTyped(deleteUser(userId), [CustomError]);

	if (err) {
		return res.status(err.code).json({ message: err.message });
	}

	res.status(204).json({ message: 'User account deleted successfully' });
})

export default router;
