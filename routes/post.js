const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authentication = require("../middlewares/authentication");
const upload = require("../middlewares/multer");

router.get("/", postController.getAllPost);
router.use(authentication);
router.post("/", upload.single("photo"), postController.postContent);
router.put("/:id", upload.single("photo"), postController.updateContent);
router.delete("/:id", postController.deleteContent);

module.exports = router;
