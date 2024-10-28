import express from 'express';
import morgan from 'morgan';
import db from './database.js';
import userRoutes from './users.js';
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('common'));

// Use the user routes (all routes in users.js are prefixed with /users)
app.use('/users', userRoutes);

// Example route to check MySQL version
app.get('/', async (req, res, next) => {
	try {
		const result = await db.raw('SELECT VERSION() as version');
		const version = result[0][0].version;
		res.status(200);
		res.json({ message: `Hello from MySQL ${version}` });
	} catch (error) {
		next(error); // Handle any database errors
	}
});

// Error handler middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: 'Something went wrong!' });
});

// Export the app
export default app;
