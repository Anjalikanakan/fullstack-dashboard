// backend/config/db.js
// MySQL database connection using mysql2

const mysql = require("mysql2");

// Create a connection pool (better than single connection)
// Pool reuses connections instead of creating a new one every time
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "react_redux_db",
  waitForConnections: true,
  connectionLimit: 10, // max 10 connections at once
  queueLimit: 0,
});

// Convert pool to use Promises (so we can use async/await)
const db = pool.promise();

module.exports = db;
