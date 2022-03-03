const router = require("express").Router();
const Party = require("../models/Party.model");

router.get("/", (req, res) => {
  Party.find()
    .then((allparties) => {
      res.render("parties/parties-list", { parties: allparties });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/create", (req, res) => {
  res.render("parties/parties-create");
});

module.exports = router;
