require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production"
      ? process.env.PG_URL + "?sslmode=require"
      : {
          user: process.env.DB_USER || "postgres",
          password: process.env.DB_PASSWORD || "Bulldogz",
          database: process.env.DB_NAME || "sosmed",
          host: process.env.DB_HOST || "127.0.0.1",
          port: process.env.DB_PORT || 5432, // Your PostgreSQL port
          ssl: process.env.NODE_ENV !== "development", // Enable SSL for non-development environments
        },
});

pool.connect((err) => {
  if (err) throw err;
  console.log("connect to pgb database");
});

module.exports = pool;
