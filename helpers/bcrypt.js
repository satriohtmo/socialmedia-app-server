const bcrypt = require("bcrypt");

function hashPassword(password, option) {
  return bcrypt.hashSync(password, option);
}

function comparePassword(password, dbPassword) {
  return bcrypt.compareSync(password, dbPassword);
}

module.exports = {
  hashPassword,
  comparePassword,
};
