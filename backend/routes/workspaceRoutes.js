const express = require("express");
const router = express.Router();
const Workspace = require("../models/workspaceModel");
const {
  addBoardToWorkspace,
  addCompilerToWorkspace,
  addNoteToWorkspace,
  createWorkspace,
  getWorkspace,
  getUserWorkspaces,
  deleteWorkspace,
  changeName,
} = require("../controllers/workspaceController");

//Get user's workspaces
router.get("/by-user/:id", getUserWorkspaces);

router.get("/:id", getWorkspace);

router.post("/create", createWorkspace);

router.patch("/add-board", addBoardToWorkspace);
router.patch("/add-compiler", addCompilerToWorkspace);
router.patch("/add-doc", addNoteToWorkspace);
router.get("/delete/:id", deleteWorkspace);
router.patch("/change-name/:id", changeName);

module.exports = router;
