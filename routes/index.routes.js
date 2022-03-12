const router = require("express").Router();
const { ensureAuth, ensureGuest } = require("../config/auth");

/* GET home page */
router.get("/", (req, res, next) => {
  const {id} = req.user
  console.log(id)
  res.render("index" , {id});
});


module.exports = router;
