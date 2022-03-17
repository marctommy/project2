const mongoose = require("mongoose");
const { model, Schema } = require("mongoose");

const partySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
    },
    date: {
      type: Date,
      required: true,
    },
    start: {
      type: String,
      required: true,
    },
    music: {
      type: String,
      required: true,
    },
    category: [],

    description: {
      type: String,
    },
    url: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("party", partySchema);
