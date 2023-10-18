const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController");
const authentication = require("../middlewares/authentication");

router.get("/", likeController.getContentWithLike);
router.get("/:id", likeController.getLikePerPost);
router.use(authentication);
router.post("/content/:id", likeController.addLikeToPost);
router.delete("/:id", likeController.dislikePost);

module.exports = router;
