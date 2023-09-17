const mongoose = require("mongoose");

const codeSchema = mongoose.Schema({
  title: {
    type: String,
    default: "Untitled compiler " + Date.now(),
  },
  content: {
    type: String,
  },
  owner: {
    type: String,
    required: true,
  },
  input: {
    type: String,
  },
  lang: {
    type: String,
  },
  private: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  lastModified: {
    type: Date,
    default: Date.now(),
  },
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  type: {
    type: "string",
    default: "code"
  }
});

const code = mongoose.model("Code", codeSchema);
module.exports = code;
