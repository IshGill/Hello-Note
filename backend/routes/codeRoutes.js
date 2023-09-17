const express = require("express");
const router = express.Router();
const Code = require("../models/codeModel");
const {
  createCompiler,
  getRecentCompilers,
  saveCompiler,
  changeLang,
  getCompiler,
  changeName,
  getUserCompilers,
  deleteCode,
} = require("../controllers/codeController");

//Getting a single code chunk with the given id
router.get("/get-code/:id", getCompiler);

router.post("/create", createCompiler);

router.patch("/save/:id", saveCompiler);

router.patch("/change-lang/:id", changeLang);

router.get("/recent/:id", getRecentCompilers);

router.patch("/change-name/:id", changeName);

router.get("/by-user/:id", getUserCompilers);

router.get("/delete-code/:id", deleteCode);

module.exports = router;
