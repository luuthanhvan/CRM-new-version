const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const authController = require("../controllers/AuthController");
const jwtHelper = require("../configs/jwt");

router.post("/", userController.storeUser);
router.post("/create", userController.createNewUser);
router.post(
  "/list",
  jwtHelper.verifyJwtToken,
  authController.verifyUser,
  userController.getListOfUsers
); // get list of users
router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);
router.post("/:id", userController.changePassword);

module.exports = router;
