const contactRouter = require("./contact");
const salesOrderRouter = require("./sales_order");
const userRouter = require("./user");
const authRouter = require("./auth");

function route(app) {
  app.use("/contact", contactRouter);
  app.use("/sales_order", salesOrderRouter);
  app.use("/user", userRouter);
  app.use("/auth", authRouter);
}

module.exports = route;
