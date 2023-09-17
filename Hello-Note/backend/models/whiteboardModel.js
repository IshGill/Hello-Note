const mongoose = require("mongoose");

const whiteboardSchema = mongoose.Schema({
  title: {
    type: String,
    default: "Untitled Board " + Date.now(),
  },
  owner: {
    type: String,
    required: true,
  },
  state: {
    type: Object,
    required: false,
  },
  elements: {
    type: [],
    required: false,
  },
  private: {
    type: Boolean,
    default: false,
  },
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  lastModified: {
    type: Date,
    default: Date.now(),
  },
  type: {
    type: "string",
    default: "whiteboard"
  }
});

const whiteboard = mongoose.model("Whiteboard", whiteboardSchema);
module.exports = whiteboard;
