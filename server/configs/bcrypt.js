const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const logger = require("./winston");
const { CONFIG } = require("../ultils/constants");

const saltRounds = process.env.SALT_ROUNDS;

const hashingPwd = (userInputPwd) => {
  logger.info(CONFIG.BCRYPT.HASHING);
  return bcrypt.hash(userInputPwd, saltRounds, (err, hashedPwd) => {
    if (err) {
      logger.error(`${CONFIG.BCRYPT.ERROR} Error: ${err}`);
      return;
    } else {
      logger.info(CONFIG.BCRYPT.SUCCESS);
      return hashedPwd;
    }
  });
};

const comparePwds = (userInputPwd, storedHashedPwd) => {
  return bcrypt.compare(userInputPwd, storedHashedPwd, (err, result) => {
    logger.info(CONFIG.BCRYPT.COMPARING);
    if (err) {
      logger.error(`${CONFIG.BCRYPT.ERROR_COMPARE}${err}`);
      return;
    }
    if (result) {
      logger.info(CONFIG.BCRYPT.SUCCESS_COMPARE);
      return true;
    } else {
      logger.info(CONFIG.BCRYPT.FAILED_COMPARE);
      return false;
    }
  });
};

module.exports = { hashingPwd, comparePwds };
