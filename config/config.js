require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.PG_URL + "?sslmode=require",
});

pool.connect((err) => {
  if (err) throw err;
  console.log("connect to pgb database");
});

module.exports = pool;
