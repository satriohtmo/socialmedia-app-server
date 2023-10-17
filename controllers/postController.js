const { Post, sequelize, User, Comment } = require("../models");

class Controller {
  static async getAllPost(req, res, next) {
    try {
      const content = await Post.findAll({
        include: [{ model: Comment }, { model: User }],
      });
      res.status(200).json({ data: content });
    } catch (err) {
      next(err);
    }
  }

  static async postContent(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const id = req.user.id;
      const { description } = req.body;
      const newContent = await Post.create(
        {
          photo: req.file.path,
          description,
          UserId: +id,
        },
        {
          transaction: t,
        }
      );
      res.status(201).json({ message: `content posted with id ${newContent.id} with user id ${id}` });
      await t.commit();
    } catch (err) {
      next(err);
      await t.rollback();
    }
  }

  static async updateContent(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const { description } = req.body;
      const updateContent = await Post.update(
        {
          photo: req.file.path,
          description,
        },
        {
          where: { id },
        },
        {
          transaction: t,
        }
      );
      res.status(201).json({ message: `post with ${id} has been updated` });
      t.commit();
    } catch (err) {
      next(err);
      t.rollback();
    }
  }

  static async deleteContent(req, res, next) {
    try {
      const { id } = req.params;
      const deletePost = await Post.destroy({ where: { id } });
      if (!deletePost) {
        throw { name: "NotFound" };
      }
      res.status(200).json({ message: `post with ${id} has been deleted` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
