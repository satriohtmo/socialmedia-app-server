const express = require("express");
const router = express.Router();
const followController = require("../controllers/followController");
const authentication = require("../middlewares/authentication");

router.get("/following/:id", followController.getFollowing);
router.get("/followers/:id", followController.getFollowers);
router.use(authentication);
router.get("/following", followController.userFollowing);
router.get("/followers", followController.userFollower);
router.get("/sum", followController.sumFollowingAndFollowers);
router.post("/follow", followController.followingUser);
router.delete("/unfollow", followController.unFollowUser);

module.exports = router;
