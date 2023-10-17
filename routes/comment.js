const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const authentication = require("../middlewares/authentication");

router.get("/", commentController.getComment);
router.use(authentication);
router.post("/content/:id", commentController.createComment);
router.put("/:id", commentController.editComment);
router.delete("/:id", commentController.deleteComment);

module.exports = router;
