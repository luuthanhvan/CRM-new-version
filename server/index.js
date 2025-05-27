// require("./config/passport");
const express = require("express");
const cors = require("cors");
const logger = require("./configs/winston");
const { CONFIG } = require("./ultils/constants");
// const passport = require("passport");
// const route = require("./routers");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const db = require("./configs/mongo");
const app = express();

// Database connection
db.mongo();

// Parsing body request
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());

// app.use(passport.initialize());

/* Routing */
// route(app);

// error handler
// app.use((err, req, res, next) => {
//   if (err.name === "ValidationError") {
//     var valErrors = [];
//     Object.keys(err.errors).forEach((key) =>
//       valErrors.push(err.errors[key].message),
//     );
//     res.status(422).send(valErrors);
//   } else {
//     console.log(err);
//   }
// });

if (process.env.SERVER_PORT && process.env.HOSTNAME) {
  app.listen(process.env.SERVER_PORT, process.env.HOSTNAME, () => {
    logger.info(
      `${CONFIG.SERVER_IS_RUNNING_AT} http://${process.env.HOSTNAME}:${process.env.SERVER_PORT}`
    );
  });
} else {
  logger.error(CONFIG.CONFIG.SERVER_RUNNING_ERROR);
}
