class SalesOrderService {
  getSalesOrderSearchQuery(queryObj) {
    if (queryObj && Object.keys(queryObj).length > 0) {
      return { subject: { $regex: queryObj["subject"] } };
    } else {
      return {};
    }
  }
}

module.exports = new SalesOrderService();
