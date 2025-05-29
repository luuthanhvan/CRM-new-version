const Contacts = require("../models/Contact");
const { mutipleMongooseToObject } = require("../ultils/mongoose");
const apiResponse = require("../ultils/apiResponse");
const logger = require("../configs/winston");
const { RESPONSE_MESSAGE } = require("../ultils/constants");

class ContactsController {
  storeContact(req, res) {
    try {
      logger.info(RESPONSE_MESSAGE.CREATING_NEW_CONTACT);
      const contacts = new Contacts(req.body);
      contacts.save().then(() => {
        logger.info(RESPONSE_MESSAGE.CREATING_NEW_CONTACT_SUCCESS);
        return apiResponse.successResponse(
          res,
          RESPONSE_MESSAGE.CREATING_NEW_CONTACT_SUCCESS
        );
      });
    } catch (err) {
      logger.error(`${RESPONSE_MESSAGE.CREATING_NEW_CONTACT_ERROR} ${err}`);
      return apiResponse.ErrorResponse(res, err);
    }
  }

  getListOfContacts(req, res) {
    try {
      logger.info(RESPONSE_MESSAGE.FETCHING_LIST_OF_CONTACTS);
      const isAdmin = req.isAdmin,
        name = req.name;
      const query = isAdmin ? {} : { assignedTo: name };
      Contacts.find(query).then((data) => {
        logger.info(RESPONSE_MESSAGE.FETCHING_LIST_OF_CONTACTS_SUCCESS);
        const resData = data.length > 0 ? mutipleMongooseToObject(data) : [];
        return apiResponse.successResponseWithData(
          res,
          RESPONSE_MESSAGE.FETCHING_LIST_OF_CONTACTS_SUCCESS,
          resData
        );
      });
    } catch (err) {
      logger.error(
        `${RESPONSE_MESSAGE.FETCHING_LIST_OF_CONTACTS_ERROR} ${err}`
      );
      return apiResponse.ErrorResponse(res, err);
    }
  }

  getContact(req, res) {
    try {
      logger.info(RESPONSE_MESSAGE.FETCHING_CONTACT);
      let contactId = req.params.id;
      Contacts.findOne({ _id: contactId }).then((contact) => {
        logger.info(RESPONSE_MESSAGE.FETCHING_CONTACT_SUCCESS);
        return apiResponse.successResponseWithData(
          res,
          RESPONSE_MESSAGE.FETCHING_CONTACT_SUCCESS,
          contact
        );
      });
    } catch (err) {
      logger.error(`${RESPONSE_MESSAGE.FETCHING_CONTACT_ERROR} ${err}`);
      return apiResponse.ErrorResponse(res, err);
    }
  }

  updateContact(req, res) {
    try {
      logger.info(RESPONSE_MESSAGE.UPDATING_CONTACT);
      let contactId = req.params.id;
      let contactInfo = req.body;
      Contacts.updateOne({ _id: contactId }, contactInfo).then(() => {
        logger.info(RESPONSE_MESSAGE.UPDATING_CONTACT_SUCCESS);
        return apiResponse.successResponse(
          res,
          RESPONSE_MESSAGE.UPDATING_CONTACT_SUCCESS
        );
      });
    } catch (err) {
      logger.error(`${RESPONSE_MESSAGE.UPDATING_CONTACT_ERROR} ${err}`);
      return apiResponse.ErrorResponse(res, err);
    }
  }

  deleteContact(req, res) {
    try {
      logger.info(RESPONSE_MESSAGE.DELETING_CONTACT);
      let contactId = req.params.id;
      Contacts.remove({ _id: contactId }).then(() => {
        logger.info(RESPONSE_MESSAGE.DELETING_CONTACT_SUCCESS);
        return apiResponse.successResponse(
          res,
          RESPONSE_MESSAGE.DELETING_CONTACT_SUCCESS
        );
      });
    } catch (err) {
      logger.error(`${RESPONSE_MESSAGE.DELETING_CONTACT_ERROR} ${err}`);
      return apiResponse.ErrorResponse(res, err);
    }
  }

  multiDeleteContact(req, res) {
    try {
      logger.info(RESPONSE_MESSAGE.DELETING_LIST_OF_CONTACTS);
      let contactIds = req.body;
      Contacts.remove({ _id: { $in: contactIds } }).then(() => {
        logger.info(RESPONSE_MESSAGE.DELETING_LIST_OF_CONTACTS_SUCCESS);
        return apiResponse.successResponse(
          res,
          RESPONSE_MESSAGE.DELETING_LIST_OF_CONTACTS_SUCCESS
        );
      });
    } catch (err) {
      logger.error(
        `${RESPONSE_MESSAGE.DELETING_LIST_OF_CONTACTS_ERROR} ${err}`
      );
      return apiResponse.ErrorResponse(res, err);
    }
  }

  findContact(req, res) {
    try {
      logger.info(RESPONSE_MESSAGE.FINDING_CONTACT_BY_NAME);
      let contactName = req.params.contactName;
      Contacts.find({ contactName: contactName }).then((contacts) => {
        logger.info(RESPONSE_MESSAGE.FINDING_CONTACT_BY_NAME_SUCCESS);
        return apiResponse.successResponseWithData(
          res,
          RESPONSE_MESSAGE.FINDING_CONTACT_BY_NAME_SUCCESS,
          contacts
        );
      });
    } catch (err) {
      logger.error(`${RESPONSE_MESSAGE.FINDING_CONTACT_BY_NAME_ERROR} ${err}`);
      return apiResponse.ErrorResponse(res, err);
    }
  }
}

module.exports = new ContactsController();
