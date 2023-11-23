const { Op } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
const { User, Comment, Follow, Post, Like } = require("../models");

class Controller {
  static async getUser(req, res, next) {
    try {
      const { search } = req.query;

      const options = {
        order: [["id", "ASC"]],
      };

      if (search) {
        options.where = {
          username: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }

      const user = await User.findAll(options);
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

  static async getUserByUsername(req, res, next) {
    try {
      const username = req.user.username;
      const user = await User.findOne({
        where: { username },
        include: [{ model: Post }],
      });
      if (!user) {
        throw { name: "NotFound" };
      }
      res.status(200).json({ data: user });
    } catch (err) {
      next(err);
    }
  }

  static async getUserLikes(req, res, next) {
    try {
      const { username } = req.user;
      const user = await User.findOne({
        where: { username },
      });
      const content = await Like.findAll({
        where: { UserId: user.id },
        include: [{ model: Post }],
      });
      res.status(200).json({ data: content });
    } catch (err) {
      next(err);
      console.log(err);
    }
  }

  static async userLikes(req, res, next) {
    try {
      console.log(req);
      const id = req.user.id;
      console.log(id);
      const content = await Like.findAll({
        where: { UserId: id },
        include: [{ model: Post }],
      });
      res.status(200).json({ data: content });
    } catch (err) {
      next(err);
    }
  }

  static async getUserByName(req, res, next) {
    try {
      const { username } = req.params;
      const user = await User.findOne({
        where: { username },
        include: [{ model: Post }, { model: Like }],
        order: [[Post, "id", "DESC"]],
      });
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
      const userName = req.user.username;
      const { username, name, email, bio, profilepicture } = req.body;
      const updateUser = await User.update(
        {
          username,
          name,
          email,
          bio,
          profilepicture,
        },
        { where: { username: userName } }
      );
      res.status(201).json({ message: `user with ${userName} has been updated` });
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
