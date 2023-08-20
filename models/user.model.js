const mongoose = require("mongoose");
const LinkGroupSchema = require("./linkGroup.schema");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      min: 4,
      max: 150,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    profilePicture: {
      type: String,
      default: "empty.png",
    },
    userMessage: {
      type: String,
      max: 400,
    },
    bioText: {
      type: String,
      max: 140,
    },
    linkGroups: [LinkGroupSchema],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
