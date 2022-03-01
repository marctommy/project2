const { Schema, model } = require("mongoose");

const partySchema = new Schema(
  {
    partyname: {
      type: String,
      unique: true,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    password: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Party = model("Party", partySchema);

module.exports = Party;
