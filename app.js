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

const app = express();

// This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

app.locals.appTitle = `${capitalized(projectName)} `;

// handling routes
const index = require("./routes/index.routes");
const partyRoutes = require("./routes/party.routes");
const authRoutes = require("./routes/auth.routes");
const usersRoutes = require("./routes/user.routes");

app.use("/", index);
app.use("/parties", partyRoutes);
app.use("/auth", authRoutes);
app.use("/users-profile", usersRoutes);
// To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
