const express = require("express");
const mysql = require("mysql2");
const app = express();
const PORT = 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: "db", // Host name as specified in docker-compose (container name of the db service)
  user: "myuser",
  password: "mypassword",
  database: "mysql_user"
});

// Establish MySQL connection
db.connect((err) => {
  if (err) {
    console.error("Database connection failed: ", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Define a test route
app.get("/", (req, res) => {
  res.send("Welcome to the Express & MySQL API!");
});

// Endpoint to get all users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Endpoint to add a new user
app.post("/users", (req, res) => {
  const { first_name, last_name, nickname, email, password } = req.body;
  const sql = `INSERT INTO users (first_name, last_name, nickname, email, password) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [first_name, last_name, nickname, email, password], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ id: result.insertId, ...req.body });
    }
  });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
