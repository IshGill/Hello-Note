const asyncHandler = require("express-async-handler");
const Workspace = require("../models/workspaceModel");

const getUserWorkspaces = asyncHandler(async (req, res) => {
  try {
    const ws = await Workspace.find({ owner: req.params.id });
    res.status(200).json(ws);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const getWorkspace = asyncHandler(async (req, res) => {
  try {
    const ws = await Workspace.find({ _id: req.params.id });
    res.status(200).json(ws);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const createWorkspace = asyncHandler(async (req, res) => {
  try {
    const ws = await Workspace.create(req.body).then((res) => res);
    res.status(200).json(ws);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const addBoardToWorkspace = asyncHandler(async (req, res) => {
  try {
    const ws = await Workspace.findById(req.body.id);

    let boards = ws.whiteboards;
    boards.push(req.body.board_id);
    ws.update({ whiteboards: boards });
    ws.save();
    res.status(200).json(ws);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const addCompilerToWorkspace = asyncHandler(async (req, res) => {
  try {
    const ws = await Workspace.findById(req.body.id);
    let compilers = ws.codes;
    compilers.push(req.body.compiler_id);
    ws.update({ codes: compilers });
    ws.save();
    res.status(200).json(ws);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const addNoteToWorkspace = asyncHandler(async (req, res) => {
  try {
    const ws = await Workspace.findById(req.body.id);
    let docs = ws.documents;
    docs.push(req.body.doc_id);
    ws.update({ documents: docs });
    ws.save();
    res.status(200).json(ws);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const deleteWorkspace = asyncHandler(async (req, res) => {
  try {
    await Workspace.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "Workspace Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const changeName = asyncHandler(async (req, res) => {
  try {
    await Workspace.findByIdAndUpdate({
      _id: req.params.id,
      title: req.body.title,
    });
    res.status(200).json({ message: "Title Changed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  addBoardToWorkspace,
  addCompilerToWorkspace,
  addNoteToWorkspace,
  createWorkspace,
  getWorkspace,
  getUserWorkspaces,
  deleteWorkspace,
  changeName,
};
