const jwt = require("jsonwebtoken");
const SECRET_KEY = "apaya";

function generateToken(payload) {
  jwt.sign(payload, SECRET_KEY);
}

function readToken(token) {
  jwt.verify(token, SECRET_KEY);
}

module.exports = {
  generateToken,
  readToken,
};
