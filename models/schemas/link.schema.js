const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = LinkSchema;
