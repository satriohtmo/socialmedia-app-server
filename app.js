const express = require("express");
const app = express();
const cors = require("cors");
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
