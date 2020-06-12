var mongoose = require("mongoose");

const Schema = mongoose.Schema;

const urlSchema = new Schema(
  {
    original_url: { type: String, required: true },
    short_url: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

const createUrl = mongoose.model("createUrl", urlSchema);

module.exports = createUrl;
