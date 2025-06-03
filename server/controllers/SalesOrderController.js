const SalesOrder = require("../models/SalesOrder");
const { mutipleMongooseToObject } = require("../ultils/mongoose");
const apiResponse = require("../ultils/apiResponse");
const logger = require("../configs/winston");
const { RESPONSE_MESSAGE } = require("../ultils/constants");

class SalesOrderController {
  storeSalesOrder(req, res) {
    try {
      logger.info(RESPONSE_MESSAGE.CREATING_NEW_SALES_ORDER);
      const saleOrder = new SalesOrder(req.body);
      saleOrder.save().then(() => {
        logger.info(RESPONSE_MESSAGE.CREATING_NEW_SALES_ORDER_SUCCESS);
        return apiResponse.successResponse(
          res,
          RESPONSE_MESSAGE.CREATING_NEW_SALES_ORDER_SUCCESS
        );
      });
    } catch (err) {
      logger.error(`${RESPONSE_MESSAGE.CREATING_NEW_SALES_ORDER_ERROR} ${err}`);
      return apiResponse.ErrorResponse(res, err);
    }
  }

  getListOfSalesOrders(req, res) {
    try {
      logger.info(RESPONSE_MESSAGE.FETCHING_LIST_OF_SALES_ORDER);
      const query = req.isAdmin ? {} : { _id: req.userId };
      SalesOrder.find(query).then((data) => {
        const resData = data.length > 0 ? mutipleMongooseToObject(data) : [];
        logger.info(RESPONSE_MESSAGE.FETCHING_LIST_OF_SALES_ORDER_SUCCESS);
        return apiResponse.successResponseWithData(
          res,
          RESPONSE_MESSAGE.FETCHING_LIST_OF_SALES_ORDER_SUCCESS,
          resData
        );
      });
    } catch (err) {
      logger.error(
        `${RESPONSE_MESSAGE.FETCHING_LIST_OF_SALES_ORDER_ERROR} ${err}`
      );
      return apiResponse.ErrorResponse(res, err);
    }
  }

  getSalesOrder(req, res) {
    try {
      logger.info(RESPONSE_MESSAGE.FETCHING_SALES_ORDER);
      const saleOrderId = req.params.id;
      SalesOrder.findOne({ _id: saleOrderId }).then((data) => {
        logger.info(RESPONSE_MESSAGE.FETCHING_SALES_ORDER_SUCCESS);
        return apiResponse.successResponseWithData(
          res,
          RESPONSE_MESSAGE.FETCHING_SALES_ORDER_SUCCESS,
          data
        );
      });
    } catch (err) {
      logger.error(`${RESPONSE_MESSAGE.FETCHING_SALES_ORDER_ERROR} ${err}`);
      return apiResponse.ErrorResponse(res, err);
    }
  }

  updateSalesOrder(req, res) {
    try {
      logger.info(RESPONSE_MESSAGE.UPDATING_SALES_ORDER);
      const saleOrderId = req.params.id;
      const saleOrderInfo = req.body;
      SalesOrder.updateOne({ _id: saleOrderId }, saleOrderInfo).then(() => {
        logger.info(RESPONSE_MESSAGE.UPDATING_SALES_ORDER_SUCCESS);
        return apiResponse.successResponse(
          res,
          RESPONSE_MESSAGE.UPDATING_SALES_ORDER_SUCCESS
        );
      });
    } catch (err) {
      logger.error(`${RESPONSE_MESSAGE.UPDATING_SALES_ORDER_ERROR} ${err}`);
      return apiResponse.ErrorResponse(res, err);
    }
  }

  deleteSalesOrder(req, res) {
    try {
      logger.info(RESPONSE_MESSAGE.DELETING_SALES_ORDER);
      const saleOrderId = req.params.id;
      SalesOrder.deleteOne({ _id: saleOrderId }).then(() => {
        logger.info(RESPONSE_MESSAGE.DELETING_SALES_ORDER_SUCCESS);
        return apiResponse.successResponse(
          res,
          RESPONSE_MESSAGE.DELETING_SALES_ORDER_SUCCESS
        );
      });
    } catch (err) {
      logger.error(`${RESPONSE_MESSAGE.DELETING_SALES_ORDER_ERROR} ${err}`);
      return apiResponse.ErrorResponse(res, err);
    }
  }

  deleteMultiSalesOrders(req, res) {
    try {
      logger.info(RESPONSE_MESSAGE.DELETING_LIST_OF_SALES_ORDER);
      const salesOrderIds = req.body;
      SalesOrder.deleteMany({ _id: { $in: salesOrderIds } }).then(() => {
        logger.info(RESPONSE_MESSAGE.DELETING_LIST_OF_SALES_ORDER_SUCCESS);
        return apiResponse.successResponse(
          res,
          RESPONSE_MESSAGE.DELETING_LIST_OF_SALES_ORDER_SUCCESS
        );
      });
    } catch (err) {
      logger.error(
        `${RESPONSE_MESSAGE.DELETING_LIST_OF_SALES_ORDER_ERROR} ${err}`
      );
      return apiResponse.ErrorResponse(res, err);
    }
  }

  findSalesOrder(req, res) {
    try {
      logger.info(RESPONSE_MESSAGE.FINDING_SALES_ORDER_BY_ID);
      const contactName = req.params.contactName;
      SalesOrder.find({ contactName: contactName }).then((data) => {
        logger.info(RESPONSE_MESSAGE.FINDING_SALES_ORDER_BY_ID_SUCCESS);
        return apiResponse.successResponseWithData(
          res,
          RESPONSE_MESSAGE.FINDING_SALES_ORDER_BY_ID_SUCCESS,
          data
        );
      });
    } catch (err) {
      logger.error(
        `${RESPONSE_MESSAGE.FINDING_SALES_ORDER_BY_ID_ERROR} ${err}`
      );
      return apiResponse.ErrorResponse(res, err);
    }
  }
}

module.exports = new SalesOrderController();
