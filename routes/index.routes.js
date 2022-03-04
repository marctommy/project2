const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/user-profile", (_, res) => {
  res.render("auth/user-profile");
});

module.exports = router;
