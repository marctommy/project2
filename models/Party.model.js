const { Schema, model } = require("mongoose");

const partySchema = new Schema(
  {
    name: String,
    username: String,
    location: String,
    capacity: Number,
    date: Date,
    start: String,
    music: String,
    category: [],
    description: String,
    url: String,
    username: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("party", partySchema);
