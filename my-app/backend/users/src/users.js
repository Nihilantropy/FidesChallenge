const express = require('express');
const router = express.Router();
const login = require('./user_funct/login');
const createUser = require('./user_func/createUser');

// Define the routes
router.post('/login', login); // Handle login
router.post('/create', createUser); // Handle user creation

module.exports = router;








const express = require("express");
const axios = require('axios');
const bodyParser = require('body-parser');
const morgan = require("morgan");
// morgan provides easy logging for express, and by default it logs to stdout
// which is a best practice in Docker. Friends don't let friends code their apps to
// do app logging to files in containers.

const db = require('./database');

// Appi
const app = express();
app.use(express.json());

app.use(morgan("common"));

// Example route to get all users
app.get("/users", async (req, res, next) => {
	try {
	  const users = await db("users").select(); // Fetch all users from the 'users' table
	  res.json(users); // Send the users data as JSON
	} catch (error) {
	  next(error); // Handle errors
	}
});

// Example route to create a new user
app.post("/createUser", async (req, res, next) => {
	try {
	  const { first_name, last_name, username, email, password } = req.body;
	  await db("users").insert({
		first_name,
		last_name,
		username,
		email,
		password,
	  });
	  res.status(200).json({ message: "User created successfully!" });
	} catch (error) {
	  next(error); // Handle errors
	}
});

// Error handler middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: "Something went wrong!" });
});

// Route to check MySQL version using Knex
app.get("/", async (req, res, next) => {
	try {
	  // Knex query to get MySQL version
	  const result = await db.raw("SELECT VERSION() as version");
	  const version = result[0][0].version;
	  res.json({ message: `Hello from MySQL ${version}` });
	} catch (error) {
	  next(error); // Handle any database errors
	}
});

// Health check route
app.get("/healthz", (req, res) => {
	// Perform app logic here to determine if the app is truly healthy
	// Return 200 if healthy
	res.status(200).send("I am happy and healthy\n");
});

module.exports = app;