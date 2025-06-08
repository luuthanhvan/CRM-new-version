class ContactService {
  getContactSearchQuery(queryObj) {
    if (queryObj && Object.keys(queryObj).length > 0) {
      return { contactName: { $regex: queryObj["contactName"] } };
    } else {
      return {};
    }
  }
}

module.exports = new ContactService();
