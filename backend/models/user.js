const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

let userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minLength: 4,
      maxLength: 128
    },
    password: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    profile: {
      firstName: String,
      lastName: String,
      picture: String
    }
  },
  { timestamps: true }
);

userSchema.pre(
  "save",
  function(next) {
    // this refers to user
    if (!this.isModified("password")) {
      return next();
    }
    bcrypt.hash(this.password, 10).then(hashedPassword => {
      this.password = hashedPassword;
      next();
    });
  },
  function(err) {
    next(err);
  }
);
userSchema.methods.comparePassword = function(candidatePassword, next) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return next(err);
    next(null, isMatch);
  });
};

let User = mongoose.model("User", userSchema);

module.exports = User;
