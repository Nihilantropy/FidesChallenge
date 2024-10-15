// simple node web server that displays hello world
// optimized for Docker image

const express = require("express");
// this example uses express web framework so we know what longer build times
// do and how Dockerfile layer ordering matters. If you mess up Dockerfile ordering
// you'll see long build times on every code change + build. If done correctly,
// code changes should be only a few seconds to build locally due to build cache.

const morgan = require("morgan");
// morgan provides easy logging for express, and by default it logs to stdout
// which is a best practice in Docker. Friends don't let friends code their apps to
// do app logging to files in containers.

const db = require('./database');

// Appi
const app = express();
app.use(express.json());

app.use(morgan("common"));

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
app.post("/users", async (req, res, next) => {
	try {
	  const { first_name, last_name, username, email, password } = req.body;
	  await db("users").insert({
		first_name,
		last_name,
		username,
		email,
		password,
	  });
	  res.status(201).json({ message: "User created successfully!" });
	} catch (error) {
	  next(error); // Handle errors
	}
});

// Error handler middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: "Something went wrong!" });
});

module.exports = app;