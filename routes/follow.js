const express = require("express");
const router = express.Router();
const followController = require("../controllers/followController");
const authentication = require("../middlewares/authentication");

router.get("/following", followController.follow);
router.get("/follower", followController.getFollowers);
router.use(authentication);
router.get("/user/following", followController.userFollowing);
router.get("/user/follower", followController.userFollower);
router.get("/sum", followController.sumFollowingAndFollowers);
router.post("/following", followController.followingUser);
router.delete("/", followController.unFollowUser);

module.exports = router;
