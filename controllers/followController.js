const { Follow, User } = require("../models");

class Controller {
  static async follow(req, res, next) {
    try {
      const follow = await Follow.findAll({
        include: [
          {
            model: User,
            as: "Following",
          },
        ],
      });
      if (!follow) {
        throw { name: "NotFoud" };
      }
      res.status(200).json({ data: follow });
    } catch (err) {
      next(err);
    }
  }

  static async getFollowers(req, res, next) {
    try {
      const follow = await Follow.findAll({
        include: [
          {
            model: User,
            as: "Followers",
          },
        ],
      });
      if (!follow) {
        throw { name: "NotFoud" };
      }
      res.status(200).json({ data: follow });
    } catch (err) {
      next(err);
    }
  }

  static async userFollowing(req, res, next) {
    try {
      const user = await Follow.findAll({
        where: { FollowingUserId: req.user.id },
        include: [{ model: User, as: "Following" }],
      });
      if (!user) {
        throw { name: "NotFound" };
      }
      res.status(200).json({ data: user });
    } catch (err) {
      next(err);
    }
  }

  static async userFollower(req, res, next) {
    try {
      const user = await Follow.findAll({
        where: { FollowerUserId: req.user.id },
        include: [{ model: User, as: "Follower" }],
      });
      if (!user) {
        throw { name: "NotFound" };
      }
      res.status(200).json({ data: user });
    } catch (err) {
      next(err);
    }
  }

  static async followingUser(req, res, next) {
    try {
      const userId = req.user.id; //1
      const { FollowingUserId } = req.body; //2
      //
      const follow = await Follow.create({
        FollowingUserId,
        FollowerUserId: userId,
      });
      if (!follow) {
        throw { name: "NotFound" };
      }
      res.status(201).json({ message: `User with id ${userId} following user with id ${FollowingUserId}` });
    } catch (err) {
      next(err);
    }
  }

  static async unFollowUser(req, res, next) {
    try {
      const userId = req.user.id;
      const { FollowingUserId } = req.body;
      const rowsDeleted = await Follow.destroy({
        where: {
          FollowerUserId: userId,
          FollowingUserId,
        },
      });
      if (rowsDeleted === 0) {
        throw { name: "NotFollowing" };
      }
      res.status(200).json({ message: "Unfollowed the user." });
    } catch (err) {
      next(err);
    }
  }

  static async sumFollowingAndFollowers(req, res, next) {
    try {
      const userId = req.user.id;
      const followingCount = await Follow.count({
        where: { FollowerUserId: userId },
      });
      const followersCount = await Follow.count({
        where: { FollowingUserId: userId },
      });
      res.status(200).json({
        followingCount: followingCount,
        followersCount: followersCount,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
