const express = require("express");
const router = express.Router();
const salesOrderController = require("../controllers/SalesOrderController");
const authController = require("../controllers/AuthController");
const jwtHelper = require("../configs/jwt");

router.post(
  "/",
  jwtHelper.verifyJwtToken,
  salesOrderController.storeSalesOrder
);
router.get(
  "/list",
  jwtHelper.verifyJwtToken,
  authController.verifyUser,
  salesOrderController.getListOfSalesOrders
);
router.get(
  "/:id",
  jwtHelper.verifyJwtToken,
  salesOrderController.getSalesOrder
);
router.put(
  "/:id",
  jwtHelper.verifyJwtToken,
  salesOrderController.updateSalesOrder
);
router.delete(
  "/:id",
  jwtHelper.verifyJwtToken,
  salesOrderController.deleteSalesOrder
);
router.post(
  "/delete",
  jwtHelper.verifyJwtToken,
  salesOrderController.deleteMultiSalesOrders
);
router.get(
  "/search/:contactName",
  jwtHelper.verifyJwtToken,
  salesOrderController.findSalesOrderByContactName
);

module.exports = router;
