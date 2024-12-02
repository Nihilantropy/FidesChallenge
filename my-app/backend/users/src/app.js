import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import db from './database.js';
import userRoutes from './users.js';
import { healthCheck, healthCheckEndpoint } from './healthcheck.js';
const app = express();

// CORS options
const corsOptions = {
    origin: ['http://localhost','https://localhost','https://my-self-signed-domain.com','http://my-self-signed-domain.com', 'http://frontend-expo.default.svc.cluster.local:8081', 'http://backend-stories'], // Add Nginx proxy origin
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials (like cookies or authorization headers) if needed
};

// Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(morgan('common'));


// Use the user routes (all routes in users.js are prefixed with /users)
app.use('/users', userRoutes);

// Health check endpoint
app.get('/users/healthz', healthCheckEndpoint);

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

// Health check function to verify DB connection every 60 seconds
const dbCheckInterval = setInterval(healthCheck, 60000); // Checks every 60 seconds

// Error handler middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: 'Something went wrong!' });
});

// Cleanup on exit
process.on('SIGINT', () => {
    clearInterval(dbCheckInterval);
    process.exit();
});

// Export the app
export default app;
