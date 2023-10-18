const express = require("express");
const router = express.Router();
const auth_controller = require("../controllers/authController");
const upload = require("../middlewares/multer");
const user = require("./user");
const post = require("./post");
const comment = require("./comment");
const like = require("./like");

router.post("/api/register", upload.single("profilepicture"), auth_controller.register);
router.post("/api/login", auth_controller.userLogin);

router.use("/api/user", user);
router.use("/api/content", post);
router.use("/api/comment", comment);
router.use("/api/like", like);

module.exports = router;
