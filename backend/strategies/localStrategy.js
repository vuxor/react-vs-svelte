const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

const localStrategy = new LocalStrategy(
  {
    session: false,
  },
  function (username, password, done) {
    User.findOne({ username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      user.comparePassword(password, function (error, isMatch) {
        if (error) {
          return done(err);
        }
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password" });
        } else {
          return done(null, user);
        }
      });
    });
  }
);
module.exports = localStrategy;