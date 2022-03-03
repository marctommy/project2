const mongoose = require("mongoose");

const Party = require("../models/Party.model");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/hausparty";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// { I started creating a seed file for parties. }

const parties = [
  {
    name: "Harry Potter Party",
    location: "Berlin",
    musicType: "House",
    capacity: 30,
    description: "This is just a test",
  },
  {
    name: "Ironhack Party",
    location: "Berlin",
    musicType: "Techno",
    capacity: 12,
    description: "This is just a test",
  },
  {
    name: "Single Party",
    location: "Berlin",
    musicType: "Schlager",
    capacity: 2,
    description: "Private Event",
  },
];
