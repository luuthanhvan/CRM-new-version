const CONFIG = Object.freeze({
  MONGO: {
    INFO: 'Connecting to',
    ERROR: "Database failure connected!",
    SUCCESS: "Database sucessfully connected!",
  },
  JWT: {
    VERIFYING_TOKEN: 'Verifying token...',
    NO_TOKEN_PROVIDED: 'No token provided!',
    AUTHENTICATION_FAILED: 'Token authentication failed!',
    DECODING_TOKEN: 'Decoding token...',
  },
  SERVER_IS_RUNNING_AT: "Server is running at",
  SERVER_RUNNING_ERROR: 'No server port or hostname provided!',
});

module.exports = {
  CONFIG,
};
