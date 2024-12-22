const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const PORT = 5000;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ass1",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Create the new table if it doesn't exist
const createTable = `
  CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    employeeId VARCHAR(10) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL,
    department VARCHAR(50) NOT NULL,
    dateOfJoining DATE NOT NULL,
    role VARCHAR(100) NOT NULL
  );
`;

db.query(createTable, (err, result) => {
  if (err) {
    console.log("Error creating the table:", err);
  } else {
    console.log("Employees table created or already exists.");
  }
});

// Endpoint to submit employee data
app.post('/submit', (req, res) => {
  const { name, employeeId, email, phone, department, dateOfJoining, role } = req.body;

  // Query to check for duplicate Employee ID or Email
  const checkQuery = `SELECT * FROM employees WHERE employeeId = ? OR email = ?`;

  // Query to insert a new record into the employees table
  const insertQuery = `
    INSERT INTO employees (name, employeeId, email, phone, department, dateOfJoining, role)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(checkQuery, [employeeId, email], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'Employee ID or Email already exists' });
    }

    db.query(
      insertQuery,
      [name, employeeId, email, phone, department, dateOfJoining, role],
      (err) => {
        if (err) {
          console.error('Error inserting employee:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'Employee added successfully' });
      }
    );
  });
});

app.listen(PORT , () =>{
  console.log("Port is running");
})
