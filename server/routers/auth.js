const express = require("express");
const router = express.Router();

const authController = require("../controllers/AuthController");
const jwtHelper = require("../configs/jwt");

router.post("/signin", authController.authenticate);
router.get("/", jwtHelper.verifyJwtToken, authController.userProfile);

module.exports = router;
