const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",   // Change if needed
    password: "root",   // Add your MySQL password
    database: "test_db" // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database");
    }
});

// API to reset test database
app.post("/reset-database", (req, res) => { 
    const sql = "DELETE FROM users"; // Modify for your table
    db.query(sql, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Test database reset successful" });
    });
});

// API to seed test data
app.post("/seed-database", (req, res) => {
    const users = req.body.users; // Get users from request body
    const values = users.map(user => [user.name, user.email]);

    // First, delete existing users
    const deleteSql = "DELETE FROM users";

    db.query(deleteSql, (deleteErr) => {
        if (deleteErr) {
            return res.status(500).json({ error: deleteErr.message });
        }

        // Then, insert new users
        const insertSql = "INSERT INTO users (name, email) VALUES ?";
        db.query(insertSql, [values], (insertErr) => {
            if (insertErr) {
                return res.status(500).json({ error: insertErr.message });
            }
            res.json({ message: "Test data seeded successfully" });
        });
    });
});


// API to fetch users from the database
app.get("/get-users", (req, res) => {
    const sql = "SELECT * FROM users"; // Fetch all users
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results); // Send the fetched data as JSON response
    });
});


// Start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});