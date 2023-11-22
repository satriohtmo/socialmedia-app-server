const { Post, Like, User, sequelize } = require("../models");

class Controller {
  static async getLikePerPost(req, res, next) {
    try {
      const { id } = req.params;
      //   const like = await Like.findAll({
      //     include: [{ model: Post }, { model: User }],
      //   });
      const post = await Post.findByPk(id, {
        include: [{ model: Like }, { model: User }],
      });
      if (!post) {
        throw { name: "NotFound" };
      }
      const like = await Like.sum("like", {
        where: { PostId: post.id },
      });
      // if (!like) {
      //   throw { name: "NotFound" };
      // }
      //   const like = await Like.sum("like", {
      //     include: [{ model: Post }, { model: User }],
      //     group: ["Post.id", "User.id", "Like.id"],
      //   });

      res.status(200).json({ totalLike: like });
    } catch (err) {
      next(err);
    }
  }

  static async getContentWithLike(req, res, next) {
    try {
      const content = await Like.findAll({
        include: [{ model: User }, { model: Post }],
      });
      if (!content) {
        throw { name: "NotFound" };
      }
      res.status(200).json({ data: content });
    } catch (err) {
      next(err);
    }
  }

  static async getContentLikedByUser(req, res, next) {
    try {
      const { id } = req.user;
      const content = await Like.findAll({
        where: { UserId: id },
        include: [{ model: Post }],
      });
      res.status(200).json({ data: content });
    } catch (err) {
      next(err);
    }
  }

  static async addLikeToPost(req, res, next) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      //   const { like } = req.body;
      const likePost = await Like.create({
        like: +1,
        UserId: +userId,
        PostId: +id,
      });
      res.status(201).json({ message: `Post with ${id} get ${likePost.like} like from user with ${userId}` });
    } catch (err) {
      next(err);
    }
  }

  static async dislikePost(req, res, next) {
    try {
      const { id } = req.params;

      // Assuming Like and Post models are associated somehow
      // Fetch the post by its ID
      const post = await Post.findByPk(id);

      // Find and delete the associated like for the specific user
      const deletedLike = await Like.destroy({ where: { PostId: post.id, UserId: req.user.id } });

      if (deletedLike) {
        // Decrement the likes count in the post by 1 if a like was deleted
        post.likes -= 1; // Assuming you have a 'likes' field in your Post model
        await post.save();

        res.status(200).json({ message: "Dislike completed", deletedLike });
      } else {
        res.status(404).json({ message: "Like not found for this user and post" });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
