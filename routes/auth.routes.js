const router = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const app = require('../app');
const flash = require('connect-flash');
const User = require('../models/User.model');

const saltRounds = 10;

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
  const { username, password, name, email, url } = req.body;

  // 1. Check username and password are not empty
  if (!username || !password || !email || !name) {
    res.render('auth/signup', {
      errorMessage: 'please fill in all fields',
    });
<<<<<<< HEAD
    return;
=======
    res.redirect(`/users/${user._id}`);
  } catch (error) {
    console.log(error);
>>>>>>> 9f312057b29e875ad89d11b654cb46aea44bc4e2
  }

  // 2. Check pass length
  if (password.length < 6) {
    res.render('auth/signup', {
      errorMessage: 'Password should be at least 6 characters'
    });
    return;
  }

  User.findOne({ username })
    .then((user) => {
      // 2. Check user does not already exist
      if (user !== null) {
        res.render('auth/signup', { message: 'The username already exists' });
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
        .then(() => res.redirect('/login'))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function isLoggedOut(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

router.get('/login', isLoggedOut, (req, res) => {
  res.render('auth/login', { errorMessage: req.flash('error') });
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
