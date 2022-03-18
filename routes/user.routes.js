const router = require("express").Router();
const User = require("../models/User.model");
const Party = require("../models/Party.model");
const { ensureAuth, ensureGuest } = require("../config/auth");

router.get("/:id", (req, res) => {
  const { id } = req.params;

  // const imageList = [];
  // imageList.push({
  //   src: "/https://avatars.dicebear.com/api/initials/:seed.svg",
  //   name: "superstar",
  // });
  User.findById(id)
    .populate("party")
    .then((loggedInUser) => {
      console.log("loggedInUser:", loggedInUser);
      console.log("req.user:", id);
      res.render("users/user-profile", {
        id: req.user._id,
        style: "user.css",
        loggedInUser,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/:id/edit", (req, res) => {
  // const imageList = [];
  // imageList.push({ src: "/images/superstar.gif", name: "superstar" });
  const { id } = req.params;

  console.log("req.user:", id);
  User.findById(id)
    .then((loggedInUser) => {
      console.log("logged:", loggedInUser);
      res.render("users/user-edit", {
        id: req.user._id,
        style: "user.css",
        loggedInUser,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/:id/edit", (req, res) => {
  console.log("req.body:", req.body);
  console.log("Hello Word");
  const { id } = req.params;
  console.log(req.user);
  const { name, age, location, music, partyType, description, avatar, url } =
    req.body;

  User.findByIdAndUpdate(id, {
    name,
    age,
    location,
    music,
    partyType,
    description,
    avatar,
    url,
  })
    .then((updatedUser) => {
      console.log(updatedUser);
      res.redirect(`/users/${updatedUser._id}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
