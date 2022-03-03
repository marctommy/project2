const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/welcome", (req, res) => {
  const { currentUser } = req.session;
  if (!currentUser) {
    res.redirect("/auth/login");
  }

  res.render("user/welcome", currentUser);
});

module.exports = router;
