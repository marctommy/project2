// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// Connects to the database
require("./db");

// Handles http requests (express is node js framework)
const express = require("express");
const hbs = require("hbs");
const capitalized = require("./utils/capitalized");
const projectName = "Hausparty";
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash')
const User = require('./models/User.model');
// ... the rest of app.js stays untouched

const app = express();


// This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

app.locals.appTitle = `${capitalized(projectName)} `;

app.use(
    session({
      secret: process.env.SESSION_SECRET, 
      resave: false,
      saveUninitialized: true,
      cookie: {
        sameSite: 'none',
        httpOnly: true,
        maxAge: 60000, // 60 * 1000 ms === 1 min
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost/hausparty',
      }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash())

// Global var
  app.use((req,res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next();
  })

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    //set up the usermodel
    User.findById(id, function (err, user) {
        done(err, user)
    })
  });

  passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({ username })
          .then(user => {
            if (!user) {
              return done(null, false, { message: 'Incorrect username' });
            }
   
            if (!bcrypt.compareSync(password, user.password)) {
              return done(null, false, { message: 'Incorrect password' });
            }
   
            done(null, user);
          })
          .catch(err => done(err));
      }
    )
  );

  hbs.registerPartials(__dirname + "/views/partials");
  


// handling routes
const index = require("./routes/index.routes");
const partyRoutes = require("./routes/party.routes");
const authRoutes = require("./routes/auth.routes");
const usersRoutes = require("./routes/user.routes");

app.use("/", index);
app.use("/parties", partyRoutes);
app.use("/", authRoutes);
app.use('/users', usersRoutes)


// To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
