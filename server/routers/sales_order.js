const express = require("express");
const router = express.Router();
const salesOrderController = require("../controllers/SalesOrderController");
const authController = require("../controllers/AuthController");
const jwtHelper = require("../configs/jwt");

router.post("/", salesOrderController.storeSalesOrder);
router.post(
  "/list",
  jwtHelper.verifyJwtToken,
  authController.verifyUser,
  salesOrderController.getListOfSalesOrders
);
router.get("/:id", salesOrderController.getSalesOrder);
router.put("/:id", salesOrderController.updateSalesOrder);
router.delete("/:id", salesOrderController.deleteSalesOrder);
router.post("/delete", salesOrderController.deleteMultiSalesOrders);
router.get("/search/:contactName", salesOrderController.findSalesOrder);

module.exports = router;
