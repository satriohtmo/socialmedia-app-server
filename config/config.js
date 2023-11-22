const { Sequelize } = require("sequelize");
require("dotenv").config();
const url = process.env.DB_URL;

const sequelize = new Sequelize(url, {
  dialect: "postgres",
});

module.exports = sequelize;
