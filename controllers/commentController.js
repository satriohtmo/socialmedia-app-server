const { Comment, User, Post } = require("../models");

class Controller {
  static async createComment(req, res, next) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const { comment } = req.body;
      const createComment = await Comment.create({
        comment,
        UserId: userId,
        PostId: id,
      });
      res.status(201).json({ message: `user with ${userId} has comment ${createComment.comment} on content ${id}` });
    } catch (err) {
      next(err);
    }
  }

  static async getComment(req, res, next) {
    try {
      const comment = await Comment.findAll({
        include: [{ model: Post }, { model: User }],
      });
      res.status(200).json({ data: comment });
    } catch (err) {
      next(err);
    }
  }

  static async editComment(req, res, next) {
    try {
      const { id } = req.params;
      const { comment } = req.body;
      const editedComment = await Comment.update(
        {
          comment,
        },
        {
          where: { id },
        }
      );
      res.status(201).json({ message: `comment with id ${id} has been edited` });
    } catch (err) {
      next(err);
    }
  }

  static async deleteComment(req, res, next) {
    try {
      const { id } = req.params;
      const deletedComment = await Comment.destroy({ where: { id } });
      res.status(200).json({ message: `comment with ${id} has been deleted` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
