const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../middlewares/multer");
const authentication = require("../middlewares/authentication");

router.get("/all", userController.getUser);
router.get("/:username", userController.getUserByName);
router.use(authentication);
// router.get("/", userController.getUserLikes);
router.get("/", userController.getUserByUsername);
router.put("/", userController.updateUser);
router.delete("/", userController.deleteUser);

module.exports = router;
