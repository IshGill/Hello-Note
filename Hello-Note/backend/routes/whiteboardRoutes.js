const express = require("express");
const router = express.Router();
const Whiteboard = require("../models/whiteboardModel");
const {
  saveBoard,
  createBoard,
  getBoard,
  getUserBoards,
  deleteBoard,
  changeName,
} = require("../controllers/whiteboardController");

router.get("/:id", getBoard);

router.post("/create", createBoard);

router.patch("/save/:id", saveBoard);

router.get("/get-user/:id");

router.get("/by-user/:id", getUserBoards);

router.get("/delete-board/:id", deleteBoard);

router.patch("/change-name/:id", changeName);

module.exports = router;
