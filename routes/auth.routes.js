//! This is just a copy past from an older project. Feel free to delete or ignore.

const router = require("express").Router();
const bcryptjs = require("bcryptjs"); // import bcrypt
const { default: mongoose } = require("mongoose");
const User = require("../models/User.model");

const saltRound = 10;

router.get("/login", (_, res) => {
  res.render("auth/login");
});

router.get("/signup", (_, res) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  bcryptjs
    .genSalt(saltRound)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hash) => {
      return User.create({
        username,
        password: hash,
      });
    })
    .then((userFromDb) => {
      res.redirect("/");
    })
    .catch((error) => {
      if (error.code === 11000) {
        res.status(400).render("auth/signup", {
          errorMessage: error.message,
        });
      }
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }).then((user) => {
    if (!user) {
      res.render("auth/login", {
        errorMessage: "Username is registered",
      });
    } else if (bcryptjs.compareSync(password, user.password)) {
      console.log(user);
      req.session.currentUser = user;
      res.redirect("/welcome");

      //   res.render("/user/welcome", { user });
    } else {
      res.render("auth/login", {
        errorMessage: "Incorrect credentials",
      });
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log(error);
    } else {
      res.redirect("/auth/login");
    }
  });
});
