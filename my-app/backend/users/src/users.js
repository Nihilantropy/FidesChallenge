import express from 'express';
const router = express.Router();

import dotenv from 'dotenv';
dotenv.config();


// Import user functionalities from separate modules
import loginUser from './user_func/login.js';
import createUser from './user_func/createUser.js';
import getProfile from './user_func/getProfile.js';
import { authenticate } from './middleware/auth.js';

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

	console.log(token);
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

	// Use catchErrorTyped to handle potential errors without try-catch
	const [err, result] = await catchErrorTyped(deleteUser(userId), [CustomError]);

	if (err) {
		return res.status(err.code).json({ message: err.message });
	}

	res.status(200).json({ message: 'User account deleted successfully' });

})

export default router;
