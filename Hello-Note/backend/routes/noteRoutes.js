const express = require("express");
const router = express.Router();
const Notes = require("../models/noteModel");
const {
  getNotebyId,
  saveNote,
  createNote,
  getUserNotes,
  deleteNote,
  changeName,
} = require("../controllers/noteController");

router.get("/by-user/:id", getUserNotes);

router.get("/:id", getNotebyId);

router.post("/create", createNote);

router.patch("/save/:id", saveNote);

router.get("/delete-note/:id", deleteNote);

router.patch("/change-name/:id", changeName);
module.exports = router;
