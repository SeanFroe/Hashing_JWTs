const User = require("../models/user");
const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/auth");
const createTokenForUser = require("../helper/createToken");

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */
router.post("/register", async (req, res, next) => {
  try {
    const { username, password, first_name, last_name, phone } = req.body;
    const user = await User.register({
      username,
      password,
      first_name,
      last_name,
      phone,
    });
    const token = createTokenForUser(user.username);
    return res.status(201).json({ token });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
