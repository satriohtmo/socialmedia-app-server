const { Sequelize } = require("sequelize");
require("dotenv").config();
const url = process.env.DB_URL;
console.log(url);

const sequelize = new Sequelize(url, {
  dialect: "postgres",
});

module.exports = sequelize;
