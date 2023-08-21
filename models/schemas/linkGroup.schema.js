const mongoose = require("mongoose");
const LinkSchema = require("./link.schema");

const LinkGroupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    links: [LinkSchema],
  },
  { timestamps: true }
);

module.exports = LinkGroupSchema;
