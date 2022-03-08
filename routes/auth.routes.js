const router = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const app = require('../app');
const session = require('express-session');
const flash = require('connect-flash');
const User = require('../models/User.model');
const { isLoggedIn } = require('../config/auth')

const saltRounds = 10;

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
  const { username, password, name, email, url } = req.body;

  // 1. Check username and password are not empty
  if (!username || !password || !email || !name) {
    res.render('auth/signup', {errorMessage: 'please fill in all fields'});
    return;
  }

  // 2. Check pass length
  if (password.length < 6) {
    res.render('auth/signup', {errorMessage: 'Password should be at least 6 characters'})
    return;
  }

  User.findOne({username})
    .then((user) => {
      // 2. Check user does not already exist
      if (user !== null) {
        res.render('auth/signup', { errorMessage : 'The username already exists' });
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
        url
      });

      newUser
        .save()
        .then((user) => { 
          req.flash('success_msg', 'Your are now registered and can log in')
          res.redirect('/login')
        }) 
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});



router.get('/login', (req, res) => {
  res.render('auth/login', { errorMessage : req.flash('error')});
});

router.post('/login', (req,res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
})(req, res, next);
})

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out')
  res.redirect('/parties');
});

module.exports = router;
