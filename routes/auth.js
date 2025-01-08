const User = require("../models/user");
const express = require("express");
const router = express.Router();

const createTokenForUser = require("../helper/createToken");

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

router.post("/login", async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
});

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */
router.post("/register", async (req, res, next) => {
  try {
    const { username, password, first_name, last_name, phone } = req.body;

    //Register the user
    const user = await User.register({
      username,
      password,
      first_name,
      last_name,
      phone,
    });
    //Update the login timestamp
    await User.updateLoginTimestamp(user.username);

    //Generate a token for the user
    const token = createTokenForUser(user.username);

    //Return the token with a 201 status code
    return res.status(201).json({ token });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
