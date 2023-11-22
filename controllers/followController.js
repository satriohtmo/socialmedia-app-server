const { Follow, User } = require("../models");

class Controller {
  static async getFollowing(req, res, next) {
    try {
      const { id } = req.params;
      const follow = await Follow.findAll({
        where: { FollowerUserId: id },
        include: [
          {
            model: User,
            as: "Following",
          },
        ],
      });
      res.status(200).json({ data: follow });
    } catch (err) {
      next(err);
    }
  }

  static async getFollowers(req, res, next) {
    try {
      const { id } = req.params;
      const follow = await Follow.findAll({
        where: { FollowingUserId: id },
        include: [
          {
            model: User,
            as: "Follower",
          },
        ],
      });
      res.status(200).json({ data: follow });
    } catch (err) {
      next(err);
    }
  }

  static async userFollowing(req, res, next) {
    try {
      const user = await Follow.findAll({
        where: { FollowerUserId: req.user.id },
        include: [{ model: User, as: "Following" }],
      });
      if (!user) {
        res.status(200).json({ data: 0 });
      }
      res.status(200).json({ data: user });
    } catch (err) {
      next(err);
    }
  }

  static async userFollower(req, res, next) {
    try {
      const user = await Follow.findAll({
        where: { FollowingUserId: req.user.id },
        include: [{ model: User, as: "Follower" }],
      });
      // if (!user) {
      //   res.status(200).json({ data: 0 });
      // }
      res.status(200).json({ data: user });
    } catch (err) {
      next(err);
    }
  }

  // step 1: ketika kita (yang login) pencet follow user1 maka kita akan tambah 1 following yaitu user1
  // step 2: jika kita click user 1 maka text follow berubah menjadi unfollow
  // step 3: jika user 1 follow kita maka follower user 1 tambah 1 yaitu kita
  // step 4: jika user click kita maka text berubah menjadi unfollow
  static async followingUser(req, res, next) {
    try {
      const userId = req.user.id; // kita
      const { FollowingUserId } = req.body; // user 1
      //
      const follow = await Follow.create({
        FollowerUserId: userId, // user yang mengikuti
        FollowingUserId, // user yang punya account
      });
      res.status(201).json({ message: `User with id ${userId} following user with id ${FollowingUserId}` });
    } catch (err) {
      next(err);
    }
  }

  //step 1: ketika user login click unfollow
  // step 2: maka user 1 hilang 1 followers
  // step 3: text berubah menjadi follow
  static async unFollowUser(req, res, next) {
    try {
      const userId = req.user.id; // (user login)
      const { FollowingUserId } = req.body; // (user 1 )
      const unFollowUser = await Follow.destroy({
        where: {
          FollowerUserId: userId,
          FollowingUserId,
        },
      });
      if (unFollowUser === 0) {
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

// break down
// ketika kita pencet follow user1 maka kita akan tambah 1 followers yaitu user1
// ketika kita di unfollow maka followers kita kurang -1 yaitu user1
// ketika user 1 follow kita maka following user +1 yaitu kita
