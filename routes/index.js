const express = require("express");
const router = express.Router();
const auth_controller = require("../controllers/authController");
const upload = require("../middlewares/multer");

router.post("/register", upload.single("profilepicture"), auth_controller.register);
router.post("/login", auth_controller.userLogin);

module.exports = router;
