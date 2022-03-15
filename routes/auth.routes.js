const router = require("express").Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/User.model");
const { ensureAuth, ensureGuest } = require("../config/auth");

const saltRounds = 10;



router.get('/signup', ensureGuest, (req, res, next) => {
  res.render('auth/signup' ,{ style: 'auth.css'});

});

router.post("/signup", (req, res, next) => {
  const { username, password, name, email, url } = req.body;
  
  // 1. Check username and password are not empty
  if (!username || !password || !email || !name) {
    res.render("auth/signup", { errorMessage: "please fill in all fields" });

    return;
  }

  // 2. Check pass length
  if (password.length < 6) {
    res.render("auth/signup", {
      errorMessage: "Password should be at least 6 characters",
    });
    return;
  }

  User.findOne({ username })
    .then((user) => {
      // 2. Check user does not already exist
      if (user !== null) {
        res.render("auth/signup", {
          errorMessage: "The username already exists",
        });
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPass = bcrypt.hashSync(password, salt);

      // Save the user in DB
      const newUser = new User({
        username,
        password: hashPass,
        name,
        email,
        url,
      });

      newUser
        .save()
        .then((user) => {
          req.flash("success_msg", "You are now registered and can log in");
          res.redirect("/login");
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});



router.get('/login', ensureGuest, (req, res) => {
  res.render('auth/login', { style: 'auth.css'});

});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      // Something went wrong authenticating user
      return next(err);
    }
    if (!theUser) {
      // Unauthorized, `failureDetails` contains the error messages from our logic in "LocalStrategy" {message: '…'}.
      res.render("auth/login", { errorMessage: "Wrong password or username" });
      return;
    }
    // save user in session: req.user
    req.login(theUser, (err) => {
      if (err) {
        // Session save went bad
        return next(err);
      }
      // All good, we are now logged in and `req.user` is now set
      req.flash("success_msg", "You are successfully logged in");
      res.redirect("/");
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/");
});


module.exports = router;
