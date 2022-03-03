// {Importing third party Library}
const router = require("express").Router();
const bcrypt = require("bcryptjs");
// {Relative imports - from within the project}
const User = require("../models/User.model");

const saltRounds = 10;

router.get("/signup", (_, res) => {
  res.render("auth/signup");
});

router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  console.log(req.body);
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.redirect("/user-profile");
  } catch (error) {
    console.log(error);
  }
});

router.get("/login", (_, res) => {
  res.render("auth/login");
});

module.exports = router;
