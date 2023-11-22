const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authentication = require("../middlewares/authentication");
const upload = require("../middlewares/multer");

router.get("/", postController.getAllPost);
router.get("/:id", postController.contentById);
router.use(authentication);
router.post("/", postController.postContent);
router.put("/:id", postController.updateContent);
router.delete("/:id", postController.deleteContent);

module.exports = router;
