const router = require("express").Router();
const passport = require('passport');

/* GET home page */

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/user-profile", (_, res) => {
  res.render("users/user-profile");
});

module.exports = router;
