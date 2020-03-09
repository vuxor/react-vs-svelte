const mongoose = require("mongoose");

let userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: String,
    email: { type: String, unique: true },
    profile: {
      firstName: String,
      lastName: String
    }
  },
  { timestamps: true }
);

let User = mongoose.model("User", userSchema);

module.exports = User;
