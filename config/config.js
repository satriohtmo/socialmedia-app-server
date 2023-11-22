const { Sequelize } = require("sequelize");
require("dotenv").config();
const url = process.env.DB_URL;

const sequelize = new Sequelize(url, {
  define: {
    timestamps: false,
  },
});

module.exports = sequelize;
