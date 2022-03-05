const router = require("express").Router();
const User = require("../models/User.model");

router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  User.findById(id)
    .then((loggedInUser) => {
      res.render("users/users-profile", { loggedInUser });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((loggedInUser) => {
      console.log(id);
      res.render("users/users-edit", { loggedInUser });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/edit/:id", (req, res) => {
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
      res.redirect(`/users/${updatedUser._id}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
