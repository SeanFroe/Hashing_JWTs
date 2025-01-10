const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** return signed JWT for payload {username}. */

createToken = (user) => {
  return jwt.sign({ username: user.username }, SECRET_KEY);
};

module.exports = { createToken };
