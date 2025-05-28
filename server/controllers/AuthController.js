const User = require("../models/User");
const apiResponse = require("../ultils/apiResponse");
const passport = require("passport");
const _ = require("lodash");
const logger = require("../configs/winston");
const { RESPONSE_MESSAGE, CONFIG } = require("../ultils/constants");

const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

class AuthController {
  authenticate(req, res) {
    logger.info(RESPONSE_MESSAGE.STARTING_PASSPORT_AUTHEN);
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        logger.error(`${RESPONSE_MESSAGE.PASSPORT_MIDDLEWARE_ERROR} ${err}`);
        return apiResponse.validationError(
          res,
          RESPONSE_MESSAGE.PASSPORT_MIDDLEWARE_ERROR
        );
      } else if (user) {
        logger.info(RESPONSE_MESSAGE.REGISTER_USER_SUCCESS);
        return apiResponse.successResponseWithData(
          res,
          RESPONSE_MESSAGE.REGISTER_USER_SUCCESS,
          {
            token: user.generateUserToken(),
          }
        );
      }
      // unknown user or wrong password
      else {
        logger.info(`${RESPONSE_MESSAGE.AUTHENTICATION_FAILED} Info: ${info}`);
        return apiResponse.notFoundResponse(
          res,
          RESPONSE_MESSAGE.AUTHENTICATION_FAILED
        );
      }
    })(req, res);
  }

  userProfile(req, res) {
    logger.info(RESPONSE_MESSAGE.FETCHING_USER_INFO);
    const userId = req._id;
    try {
      User.findOne({ _id: userId }).then((data) => {
        // remove username and password before sent user info to client
        let userInfo = _.pick(data, [
          "_id",
          "name",
          "email",
          "phone",
          "isAdmin",
          "isActive",
          "createdTime",
        ]);
        logger.info(RESPONSE_MESSAGE.FETCHING_USER_INFO_SUCCESS);
        return apiResponse.successResponseWithData(res, "Success", {
          user: userInfo,
        });
      });
    } catch (err) {
      logger.info(`${RESPONSE_MESSAGE.FETCHING_USER_INFO_ERROR} ${err}`);
      return apiResponse.ErrorResponse(res, err);
    }
  }

  verifyUser(req, res, next) {
    const userId = req._id;
    try {
      User.findOne({ _id: userId }).then((user) => {
        if (user) {
          req.isAdmin = user.isAdmin;
          req.name = user.name;
          next();
        } else {
          return apiResponse.notFoundResponse(res, CONFIG.PASSPORT.USER_NOT_FOUND);
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }
}

module.exports = new AuthController();
