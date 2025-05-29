const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const logger = require("./winston");
const { CONFIG } = require("../ultils/constants");

const saltRounds = Number(process.env.SALT_ROUNDS);

const hashingPwd = async (userInputPwd) => {
  logger.info(CONFIG.BCRYPT.HASHING);
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPwd = await bcrypt.hash(userInputPwd, salt);
    logger.info(CONFIG.BCRYPT.SUCCESS);
    return hashedPwd;
  } catch(err) {
    logger.info(`${DATABASE.ERROR}${err}`);
    return;
  }
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
