const mongoose = require("mongoose");

const workspaceModel = mongoose.Schema({
  title: {
    type: "string",
    default: "Untitled Workspace " + Date.now(),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  lastModified: {
    type: Date,
    default: Date.now(),
  },
  owner: {
    type: String,
    required: false,
  },
  documents: {
    type: [],
    required: false,
  },
  codes: {
    type: [],
    requried: false,
  },
  whiteboards: {
    type: [],
    required: false,
  },
  type: {
    type: "string",
    default: "workspace"
  }
});

const workspace = mongoose.model("Workspace", workspaceModel);
module.exports = workspace;
