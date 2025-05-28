const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/ContactsController");
const authController = require("../controllers/AuthController");
const jwtHelper = require("../configs/jwt");

router.post("/", contactsController.storeContact);
router.post(
  "/list",
  jwtHelper.verifyJwtToken,
  authController.verifyUser,
  contactsController.getListOfContacts
);
router.get("/:id", contactsController.getContact);
router.put("/:id", contactsController.updateContact);
router.delete("/:id", contactsController.deleteContact);
router.post("/delete", contactsController.multiDeleteContact);
router.get("/search/:contactName", contactsController.findContact);

module.exports = router;
