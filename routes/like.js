const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController");
const authentication = require("../middlewares/authentication");

router.get("/all", likeController.getContentWithLike);
router.get("/:id", likeController.getLikePerPost);
router.use(authentication);
router.get("/", likeController.getContentLikedByUser);
router.post("/content/:id", likeController.addLikeToPost);
router.delete("/content/:id", likeController.dislikePost);

module.exports = router;
