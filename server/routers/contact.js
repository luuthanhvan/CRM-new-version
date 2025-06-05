const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/ContactsController");
const authController = require("../controllers/AuthController");
const jwtHelper = require("../configs/jwt");

router.post("/", jwtHelper.verifyJwtToken, contactsController.storeContact);
router.get(
  "/list",
  jwtHelper.verifyJwtToken,
  authController.verifyUser,
  contactsController.getListOfContacts
);
router.get("/:id", jwtHelper.verifyJwtToken, contactsController.getContact);
router.put("/:id", jwtHelper.verifyJwtToken, contactsController.updateContact);
router.delete(
  "/:id",
  jwtHelper.verifyJwtToken,
  contactsController.deleteContact
);
router.post(
  "/delete",
  jwtHelper.verifyJwtToken,
  contactsController.multiDeleteContact
);
router.get(
  "/search/:contactName",
  jwtHelper.verifyJwtToken,
  contactsController.findContact
);
router.get(
  "/list/contact-name",
  jwtHelper.verifyJwtToken,
  contactsController.getListOfContactNames
);

module.exports = router;
