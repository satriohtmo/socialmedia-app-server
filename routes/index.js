const express = require("express");
const router = express.Router();
const auth_controller = require("../controllers/authController");
const upload = require("../middlewares/multer");
const user = require("./user");

router.post("/api/register", upload.single("profilepicture"), auth_controller.register);
router.post("/api/login", auth_controller.userLogin);

router.use("/api/user", user);

module.exports = router;
