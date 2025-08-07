const mysql = require("mysql2");
require("dotenv").config();

console.log("📦 Creating MySQL pool...");
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection()
  .then(conn => {
    console.log("✅ DB connected successfully");
    conn.release();
  })
  .catch(err => {
    console.error("❌ DB connection error:", err.message);
  });

module.exports = pool.promise();
