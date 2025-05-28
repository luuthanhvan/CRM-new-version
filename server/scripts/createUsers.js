const mg = require("mongoose");
const db = require("../configs/mongo");
const sampleUsers = require("../mock-json/sample-users.json");
const User = require("../models/User");
const bcrypt = require("../configs/bcrypt");
const logger = require("../configs/winston");
const { DATABASE } = require("../ultils/constants");

const mappedUsers = sampleUsers.map((user) => ({
  password: bcrypt.hashingPwd(user.password),
  ...user,
}));
db.mongo();

User.insertMany(mappedUsers)
  .then(function (docs) {
    logger.info(`${DATABASE.INSERT_USERS} Docs: ${docs}`);
    mg.connection.close();
  })
  .catch(function (err) {
    logger.info(`${DATABASE.ERROR}${err.message}`);
  });
