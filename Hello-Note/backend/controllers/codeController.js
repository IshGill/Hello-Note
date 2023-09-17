const { request } = require("express");
const asyncHandler = require("express-async-handler");
const Code = require("../models/codeModel");

// Get compiler with Id
const getCompiler = asyncHandler(async (req, res) => {
  try {
    const code = await Code.findById({ _id: req.params.id }).then((res) => res);
    res.status(200).json(code);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//Create new compiler
const createCompiler = asyncHandler(async (req, res) => {
  try {
    const body = {
      title: "Untitled compiler" + Date.now(),
      content: "",
      input: "",
      lang: "71",
      owner: req.body.owner,
      workspace: req.body.workspace,
    };

    const code = await Code.create(body).then((res) => res);
    res.status(200).json(code);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Save Compiler
const saveCompiler = asyncHandler(async (req, res) => {
  try {
    const code = await Code.findOneAndUpdate(
      { _id: req.params.id },
      {
        input: req.body.input,
        content: req.body.content,
        lastModified: Date.now(),
      }
    );
    res.status(200).json(code);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get Compiler(s)
const getRecentCompilers = asyncHandler(async (req, res) => {
  try {
    const codes = await Code.find();
    console.log(codes);
    res.status(200).json(codes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Change Compilers programming language 
const changeLang = asyncHandler(async (req, res) => {
  try {
    const code = await Code.findOneAndUpdate(
      { _id: req.params.id },
      { lang: req.body.lang }
    );
    res.status(200).json(code);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Change name of Compiler
const changeName = asyncHandler(async (req, res) => {
  try {
    const code = await Code.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title }
    );
    res.status(200).json(code);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get Compiler which belongs to a specific user
const getUserCompilers = asyncHandler(async (req, res) => {
  try {
    const codes = await Code.find({ owner: req.params.id });
    res.status(200).json(codes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Clear Compiler
const deleteCode = asyncHandler(async (req, res) => {
  try {
    await Code.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "Code deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  getCompiler,
  createCompiler,
  saveCompiler,
  getRecentCompilers,
  changeLang,
  changeName,
  getRecentCompilers,
  getUserCompilers,
  deleteCode,
};
