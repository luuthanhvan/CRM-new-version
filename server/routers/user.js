const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const authController = require("../controllers/AuthController");
const jwtHelper = require("../configs/jwt");

router.get("/", jwtHelper.verifyJwtToken, userController.userProfile);
router.post("/create", userController.createNewUser);
router.get(
  "/list",
  jwtHelper.verifyJwtToken,
  authController.verifyUser,
  userController.getListOfUsers
);
router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);
router.post("/:id", userController.changePassword);

module.exports = router;
