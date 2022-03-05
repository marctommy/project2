const router = require("express").Router();
const User = require("../models/User.model");

router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  User.findById(id)
    .then((loggedInUser) => {
      console.log(
        "🚀 ~ file: user.routes.js ~ line 8 ~ .then ~ loggedInUser",
        loggedInUser
      );

      res.render("users/users-profile", { loggedInUser });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
