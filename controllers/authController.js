const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { User } = require("../models");

class Controller {
  static async register(req, res, next) {
    try {
      const { username, name, email, password, dateofbirth, profilepicture } = req.body;

      const newUser = await User.create({
        username,
        name,
        email,
        password,
        dateofbirth,
        profilepicture,
      });
      res.status(201).json({ message: `New user with id ${newUser.id} created.` });
    } catch (err) {
      next(err);
    }
  }

  static async userLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "Unauthorized" };
      }
      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) {
        throw { name: "Unauthorized" };
      }
      const payload = { id: user.id };
      const token = generateToken(payload);
      res.status(200).json({
        statusCode: 200,
        id: user.id,
        access_token: token,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
