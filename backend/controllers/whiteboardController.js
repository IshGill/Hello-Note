const asyncHandler = require("express-async-handler");
const Whiteboard = require("../models/whiteboardModel");

// /user-boards/id
const getUserBoards = asyncHandler(async (req, res) => {
  try {
    const boards = await Whiteboard.find({ owner: req.params.id });
    res.status(200).json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// /whiteboard_id
const getBoard = asyncHandler(async (req, res) => {
  try {
    const board = await Whiteboard.findById(req.params.id);
    res.status(200).json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// create
const createBoard = asyncHandler(async (req, res) => {
  try {
    const body = {
      owner: req.body.owner,
      title: "Untitled whiteboard" + Date.now(),
      workspace: req.body.workspace,

      elements: [],
      state: { viewBackgroundColor: "#5A5A57" },
      createdAt: Date.now(),
    };
    const board = await Whiteboard.create(body).then((board) => board);
    res.status(200).json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const saveBoard = asyncHandler(async (req, res) => {
  try {
    const board = await Whiteboard.findByIdAndUpdate(
      { _id: req.params.id },
      {
        elements: req.body.elements,
        state: req.body.state,
        lastModified: Date.now(),
      }
    );

    res.status(200).json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const deleteBoard = asyncHandler(async (req, res) => {
  try {
    await Whiteboard.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "Whiteboard Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const changeName = asyncHandler(async (req, res) => {
  try {
    await Whiteboard.findByIdAndUpdate({
      _id: req.params.id,
      title: req.body.title,
    });
    res.status(200).json({ message: "Whiteboard Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  saveBoard,
  createBoard,
  getBoard,
  getUserBoards,
  deleteBoard,
  changeName,
};
