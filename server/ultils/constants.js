const CONFIG = Object.freeze({
  MONGO: {
    INFO: "Connecting to",
    ERROR: "Database failure connected!",
    SUCCESS: "Database sucessfully connected!",
  },
  JWT: {
    VERIFYING_TOKEN: "Verifying token...",
    NO_TOKEN_PROVIDED: "No token provided!",
    AUTHENTICATION_FAILED: "Token authentication failed!",
    DECODING_TOKEN: "Decoding token...",
    GENERATING_TOKEN: "Generating JWT token...",
  },
  BCRYPT: {
    HASHING: "Hashing password...",
    COMPARING: "Comparing passwords...",
    ERROR: "Password hashing failed!",
    SUCCESS: "Password hashed done!",
    ERROR_COMPARE: "Error comparing passwords: ",
    SUCCESS_COMPARE: "Passwords match! User authenticated.",
    FAILED_COMPARE: "Passwords do not match! Authentication failed.",
  },
  PASSPORT: {
    VERIFYING_USER: "Verifying user...",
    VERIFYING_USER_DONE: "Verifying user done!",
    USER_NOT_FOUND: "User not found!",
    PASSWORD_INCORRECT: "Password incorrect!",
    DISABLED_ACCOUNT: "Account has been disabled!",
  },
  SERVER_IS_RUNNING_AT: "Server is running at",
  SERVER_RUNNING_ERROR: "No server port or hostname provided!",
});

const DATABASE = Object.freeze({
  ERROR: "Error occurred: ",
  INSERT_USER: "User is saved to the database!",
});

const RESPONSE_MESSAGE = Object.freeze({
  STARTING_PASSPORT_AUTHEN: "Starting passport authentication...",
  PASSPORT_MIDDLEWARE_ERROR: "Error from passport middleware.",
  REGISTER_USER_SUCCESS: "User is registered succesfully!",
  AUTHENTICATION_FAILED: "Unknown user or wrong password!",
  FETCHING_USER_INFO: "Fetching user information...",
  FETCHING_USER_INFO_SUCCESS: "Fetching user information sucessfully!",
  FETCHING_USER_INFO_ERROR: "Error while fetching user information:",
  CREATING_NEW_USER: "Creating new user...",
  CREATING_NEW_USER_SUCCESS: "Create new user successfully!",
  CREATING_NEW_USER_ERROR: "Error while creating user:",
  FETCHING_LIST_OF_USERS: "Fetching list of users...",
  FETCHING_LIST_OF_USERS_SUCCESS: "Fetching list of users successfully!",
  FETCHING_LIST_OF_USERS_ERROR: "Error while fetching list of users:",
  FETCHING_USER_BY_ID: "Fetching user by ID...",
  FETCHING_USER_BY_ID_SUCCESS: "Fetching user by ID successfully!",
  FETCHING_USER_BY_ID_ERROR: "Error while fetching user by ID:",
  UPDATING_USER: "Updating user information...",
  UPDATING_USER_SUCCESS: "Updating user information successfully!",
  UPDATING_USER_ERROR: "Error while updating user information:",
  CHANGING_USER_PASSWORD: "Changing user password...",
  CHANGING_USER_PASSWORD_SUCCESS: "Changing user password successfully!",
  CHANGING_USER_PASSWORD_ERROR: "Error while changing user password:",
});

module.exports = {
  CONFIG,
  DATABASE,
  RESPONSE_MESSAGE,
};
