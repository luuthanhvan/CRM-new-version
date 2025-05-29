exports.successResponse = function (res, msg) {
  return res.status(200).json({
    status: 1, // OK
    message: msg,
  });
};

exports.successResponseWithData = function (res, msg, data) {
  return res.status(200).json({
    status: 1,
    message: msg,
    data,
  });
};

exports.ErrorResponse = function (res, msg) {
  return res.status(500).json({
    status: 0,
    message: msg,
  });
};

exports.notFoundResponse = function (res, msg) {
  return res.status(404).json({
    status: 0, // ERROR
    message: msg,
  });
};

exports.validationError = function (res, msg) {
  return res.status(400).json({
    status: 0,
    message: msg,
  });
};

exports.validationErrorWithData = function (res, msg, data) {
  return res.status(400).json({
    status: 0,
    message: msg,
    data,
  });
};

exports.unauthorizedResponse = function (res, msg) {
  return res.status(401).json({
    status: 0,
    message: msg,
  });
};
