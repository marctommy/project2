const router = require("express").Router();
const { ensureAuth, ensureGuest } = require("../config/auth");

/* GET home page */
router.get("/", (req, res, next) => {
  if (req.user) {
    const {id} = req.user
    res.render("index", {id}); }
   else {
     res.render("auth/login", { errorMessage: "please log in" });
     return;
    }
});


module.exports = router;
