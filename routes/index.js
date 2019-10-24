var express = require("express");
var router = express.Router();
var { generateToken, sendToken } = require("../utils/token.util");
var passport = require("passport");

router.route("/google").post(
  passport.authenticate("google-token", { session: false }),
  (req, res, next) => {
    if (!req.user) {
      return res.status(401).send("User Not Authenticated");
    }
    req.auth = {
      email: req.user.email
    };
    console.log(req.email);
    next();
  },
  generateToken,
  sendToken
);

module.exports = router;
