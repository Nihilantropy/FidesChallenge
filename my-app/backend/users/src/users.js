import express from 'express';
import cors from 'cors';
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

// CORS options
const routeCorsOptions = {
    origin: ['http://expo-service:8081', 'http://localhost:8000', 'http://backend-stories:8080'], // Add Nginx proxy origin
    methods: ['GET', 'POST', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials (like cookies or authorization headers) if needed
};


// User creation route
router.post('/create', cors(routeCorsOptions), async (req, res) => {
	const userData = req.body;
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
router.post('/login', cors(routeCorsOptions), async (req, res) => {
	const { email, password } = req.body;

	console.log(email, password);
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
router.get('/profile', cors(routeCorsOptions), async (req, res) => {
	console.log("authentication requested");
	// Use the catchErrorTyped function to handle any errors thrown by the authenticate middleware
	const [authErr, payload] = await catchErrorTyped(authenticate(req), [CustomError]);

	if (authErr) {
		return res.status(authErr.code).json({ message: authErr.message });
	}

	console.log("Authentication passed!");

	const userId = payload.id[0]
	const [err, profile] = await catchErrorTyped(getProfile(userId), [CustomError]);

	if (err) {
		return res.status(err.code).json({ message: err.message });
	}

	console.log(profile);
	res.status(200).json(profile);
});

// User deletion route
router.delete('/delete', cors(routeCorsOptions), async (req, res) => {

	console.log("authentication requested");
	
	// Use the catchErrorTyped function to handle any errors thrown by the authenticate middleware
	const [authErr, payload] = await catchErrorTyped(authenticate(req), [CustomError]);

	if (authErr) {
		return res.status(authErr.code).json({ message: authErr.message });
	}

	console.log("Authentication passed!");

	const userId = payload.id[0]
	// Use catchErrorTyped to handle potential errors without try-catch
	const [err] = await catchErrorTyped(deleteUser(userId), [CustomError]);

	if (err) {
		return res.status(err.code).json({ message: err.message });
	}

	res.status(204).json({ message: 'User account deleted successfully' });
});

export default router;
