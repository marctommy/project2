const { Schema, model } = require('mongoose');

const partySchema = new Schema(
  {
    name: String,
    location: String,
    capacity: Number,
    date: Date,
    start: String,
    music: String,
    category: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model('party', partySchema);
