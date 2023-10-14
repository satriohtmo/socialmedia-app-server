const { readToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, nect) => {
  try {
    const { access_token } = req.headers;
    const token = readToken(access_token);
    const user = await User.findOne({ where: { id: token.id } });
    if (!user) {
      throw { name: "Unauthorized" };
    }
    req.user = { id: user.id };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
