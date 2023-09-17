const asyncHandler = require("express-async-handler");
const Notes = require("../models/noteModel");

const getNotebyId = asyncHandler(async (req, res) => {
  try {
    const note = await Notes.findById({ _id: req.params.id }).then(
      (res) => res
    );
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// /by-user/id
const getUserNotes = asyncHandler(async (req, res) => {
  try {
    const notes = await Notes.find({ owner: req.params.id });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const createNote = asyncHandler(async (req, res) => {
  try {
    const note = await Notes.create(req.body).then((res) => res);
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const saveNote = asyncHandler(async (req, res) => {
  try {
    const note = await Notes.findOneAndUpdate(
      { _id: req.params.id },
      { content: req.body.content, lastModified: Date.now() }
    );
    res.status(200).json({ message: note.message });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  try {
    await Notes.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const changeName = asyncHandler(async (req, res) => {
  try {
    await Notes.findOneAndUpdate({ _id: req.params.id, title: req.body.title });
    res.status(200).json({ message: "Note title changed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  getNotebyId,
  saveNote,
  createNote,
  getUserNotes,
  deleteNote,
  changeName,
};
