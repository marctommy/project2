const router = require("express").Router();
const User = require("../models/User.model");

router.get("/", (_, res) => {
  User.find()
    .then((allUsers) => {
      res.render("users/user-profile", { allUsers });
    })
    .catch((err) => {
      console.log(err);
    });
});
