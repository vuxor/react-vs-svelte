const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

let userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 128
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
    const user = this;
    if (!user.isModified("password")) {
      return next();
    }
    // store only hash password
    bcrypt.hash(user.password, 10).then(hashedPassword => {
      user.password = hashedPassword;
      next();
    });
  },
  function(err) {
    next(err);
  }
);
userSchema.methods.comparePassword = function(candidatePassword, next) {
  const user = this;
  bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
    if (err) return next(err);
    return next(null, isMatch);
  });
};

let User = mongoose.model("User", userSchema);

module.exports = User;
