const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: {
    type: String,
    default: "Untitled Note " + Date.now(),
  },
  content: {
    type: Object,
    default: { ops: [{ insert: "\n" }] },
  },
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  owner: {
    type: String,
    required: true,
  },
  lastModified: {
    type: Date,
    default: Date.now(),
  },
  private: {
    type: Boolean,
    default: false,
  },
  type: {
    type: "string",
    default: "note",
  },
});

const note = mongoose.model("Note", noteSchema);
module.exports = note;
