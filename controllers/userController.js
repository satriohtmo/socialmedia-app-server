const { hashPassword } = require("../helpers/bcrypt");
const { User, Comment } = require("../models");

class Controller {
  static async getUser(req, res, next) {
    try {
      const user = await User.findAll();
      if (!user) {
        throw { name: "NotFound" };
      }
      res.status(200).json({ data: user });
    } catch (err) {
      next(err);
    }
  }

  static async userById(req, res, next) {
    try {
      const id = req.user.id;
      const user = await User.findOne({
        where: { id },
        include: [{ model: Comment }],
      });
      if (!user) {
        throw { name: "NotFound" };
      }
      res.status(200).json({ data: user });
    } catch (err) {
      next(err);
    }
  }

  static async getUserByName(req, res, next) {
    try {
      const { name } = req.params;
      const user = await User.findOne({ where: { name } });
      if (!user) {
        throw { name: "NotFound" };
      }
      res.status(200).json({ data: user });
    } catch (err) {
      next(err);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.user;
      const user = await User.findByPk(id);
      if (!user) {
        throw { name: "NotFound" };
      }
      const { username, name, email, password, dateofbirth } = req.body;
      const updateUser = await User.update(
        {
          username,
          name,
          email,
          password,
          dateofbirth,
          profilepicture: req.file.path,
        },
        { where: { id }, individualHooks: true }
      );
      res.status(201).json({ message: `user with ${id} has been updated` });
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.user;
      const deleteUser = await User.destroy({ where: { id } });
      if (!deleteUser) {
        throw { name: "NotFound" };
      }
      res.status(200).json({ message: `user with ${id} deleted` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
