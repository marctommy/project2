const router = require("express").Router();
const User = require("../models/User.model");
const { ensureAuth, ensureGuest } = require("../config/auth");

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const imageList = [];
  imageList.push({ src: "/images/superstar.gif", name: "superstar" });
  User.findById(id)
    .then((loggedInUser) => {
      res.render("users/user-profile", {
        id: req.user._id,
        style: "user.css",
        loggedInUser,
        imageList,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/:id/edit", (req, res) => {
  const imageList = [];
  imageList.push({ src: "/images/superstar.gif", name: "superstar" });
  const { id } = req.params;
  console.log(imageList);
  User.findById(id)
    .then((loggedInUser) => {
      res.render("users/user-edit", {
        id: req.user._id,
        style: "user.css",
        loggedInUser,
        imageList,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/:id/edit", (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  const { name, age, location, music, partyType, description, avatar } =
    req.body;
  console.log(req.body.partyType);
  console.log(req.body);

  User.findByIdAndUpdate(id, {
    name,
    age,
    location,
    music,
    partyType,
    description,
    avatar,
  })
    .then((updatedUser) => {
      res.redirect(`/users/${updatedUser._id}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
