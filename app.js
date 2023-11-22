const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require("./config/config"); // Import your Sequelize configuration
const routes = require("./routes");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
const errHandler = require("./middlewares/errHandler");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.use(errHandler);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to the database has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
