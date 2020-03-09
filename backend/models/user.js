const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  username: String,
  password: String,
  profile: {
    firstName: String,
    lastName: String
  }
});

let User = mongoose.model("User", userSchema);

module.exports = User;
