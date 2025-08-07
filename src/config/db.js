const mysql = require("mysql2");
require("dotenv").config();

console.log("Before creating pool");
try {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });
  console.log("Database connection pool created successfully");
} catch (error) {
  console.error("Error creating database connection pool:", error);
}
console.log("After creating pool");
module.exports = pool.promise();
