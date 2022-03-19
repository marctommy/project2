const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required."],
    },

    username: {
      type: String,
      trim: true,
      required: [true, "Username is required."],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required."],
    },

    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },

    url: {
      type: String,
    },
    age: { type: Number, default: "18+" },
    location: { type: String, default: "Berlin - the place to be" },
    music: { type: String, default: "Music" },
    partyType: String,
    description: { type: String, default: "Don't judge a book by its cover" },
    avatar: { type: String, default: "initials" },
    party: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Party",
    },
    url: String,
    git: String,
    fb: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
