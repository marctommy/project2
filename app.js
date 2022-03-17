require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const flash = require("connect-flash");
const moment = require("moment");

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/hausparty", {
    useNewUrlParser: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// session configuration
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: "sdadasdasdasd",
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    saveUninitialized: false,
    resave: true,
    store: MongoStore.create({
      // when the session cookie has an expiration date
      // connect-mongo will use it, otherwise it will create a new
      // one and use ttl - time to live - in that case one day
      mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/hausparty",
      ttl: 24 * 60 * 60 * 1000,
    }),
  })
);
// end of session configuration

// passport configutation
const User = require("./models/User.model");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((dbUser) => {
      done(null, dbUser);
    })
    .catch((error) => {
      done(error);
    });
});

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username })
      .then((found) => {
        if (found === null) {
          done(null, false, { message: "Wrong Credentials" });
        } else if (!bcrypt.compareSync(password, found.password)) {
          done(null, false, { message: "Wrong Credentials" });
        } else {
          done(null, found);
        }
      })
      .catch((error) => {
        done(error, false);
      });
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.user = req.user || null;

  next();
});

//authentication for the hbs

app.use((req, res, next) => {
  if (req.isAuthenticated) res.locals.isAuthenticated = req.isAuthenticated();

  next();
});

const index = require("./routes/index.routes");
const partyRoutes = require("./routes/party.routes");
const authRoutes = require("./routes/auth.routes");
const usersRoutes = require("./routes/user.routes");

app.use("/", index);
app.use("/parties", partyRoutes);
app.use("/", authRoutes);
app.use("/users", usersRoutes);

//hbs helper

hbs.registerHelper("formatDate", function (dateString) {
  return new hbs.SafeString(
    moment(dateString).format("dddd MMM DD").toUpperCase()
  );
});

hbs.registerHelper(
  "editBtn",
  function (partyUser, loggedUser, partyId, floating = true) {
    if (partyUser._id.toString() == loggedUser._id.toString()) {
      return `<a href="/parties/${partyId}/edit">edit</a>`;
    } else {
      return "";
    }
  }
);

hbs.registerHelper("truncate", function (str, len) {
  if (str.length > len && str.length > 0) {
    let new_str = str + " ";
    new_str = str.substr(0, len);
    new_str = str.substr(0, new_str.lastIndexOf(" "));
    new_str = new_str.length > 0 ? new_str : str.substr(0, len);
    return new_str + "...";
  }
  return str;
});

module.exports = app;
