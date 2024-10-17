const express = require('express');
const morgan = require('morgan');
const db = require('./database');
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('common'));

// Importing user routes from users.js
const userRoutes = require('./users');

// Use the user routes (all routes in users.js are prefixed with /users)
app.use('/users', userRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Example route to check MySQL version
app.get('/', async (req, res, next) => {
  try {
    const result = await db.raw('SELECT VERSION() as version');
    const version = result[0][0].version;
    res.json({ message: `Hello from MySQL ${version}` });
  } catch (error) {
    next(error); // Handle any database errors
  }
});

// Health check route
app.get('/healthz', (req, res) => {
  res.status(200).send('I am happy and healthy\n');
});

module.exports = app;
