const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  uid: {
    type: String,
    required: true,
    unique: true,
  },
});
const user = mongoose.model("User", userSchema);
module.exports = user;
