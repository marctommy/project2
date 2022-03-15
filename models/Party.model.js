const mongoose = require("mongoose");
const { model, Schema } = require("mongoose");

const partySchema = new Schema(
  {
    name: String,
    location: String,
    capacity: Number,
    date: Date,
    start: String,
    music: String,
    category: [],
    description: String,
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
