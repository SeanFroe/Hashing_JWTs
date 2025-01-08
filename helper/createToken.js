const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** return signed JWT for payload {username}. */

function createToken(username) {
  const payload = { username };
  return jwt.sign(payload, SECRET_KEY);
}

module.exports = createToken;
