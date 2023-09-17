const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// Get user detials by UID
router.get("/getuseruid/:uid", async (req, res) => {
  try {
    const user = await User.find({ uid: req.params.uid });
    res.send(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get user by ObjectId
router.get("/getuserbyid/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (err) {
    res.status.json({ message: err.message });
  }
});

// Create user
router.post("/createuser", async (req, res) => {
  try {
    const user = req.body;
    await User.create(user);
    res.status(200).json({ message: "User created successfully." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// Change user Display Name
router.patch("/changedisplayname/:uid", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { uid: req.params.uid },
      { displayName: req.body.displayName }
    );
    res.status(200).json({ message: "Display Name Successfully Changed." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
