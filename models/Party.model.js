const { Schema, model } = require('mongoose');

const partySchema = new Schema(
  {
    name: String,
    location: String,
    date: Date,
    startAt: String,
    finishAt: String,
    musicType: String,
    capacity: Number,
    description: String,
    categories: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model('party', partySchema);
