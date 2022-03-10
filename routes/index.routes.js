const router = require("express").Router();
const { ensureAuth, ensureGuest } = require('../config/auth')


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/user-profile", (_, res) => {
  res.render("users/user-profile");
});

module.exports = router;
