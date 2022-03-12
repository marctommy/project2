const router = require("express").Router();
const User = require("../models/User.model");
const { ensureAuth, ensureGuest } = require("../config/auth");

// router.get("/:userId", (_, res) => {
//   res.render("users/user-profile");
// });

router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  User.findById(id)
    .then((loggedInUser) => {
      res.render("users/user-profile", { loggedInUser });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/:id/edit",  (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((loggedInUser) => {
      res.render("users/user-edit", { loggedInUser });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/:id/edit", (req, res) => {
  const { id } = req.params;

  const { name, age, location, music, partyType, description } = req.body;
  console.log(id);
  console.log(req.body);

  User.findByIdAndUpdate(id, {
    name,
    age,
    location,
    music,
    partyType,
    description,
  })
    .then((updatedUser) => {
      res.redirect(`/user/${updatedUser._id}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
