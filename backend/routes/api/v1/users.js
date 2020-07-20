const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../../../models/user");
const passport = require("passport");
require("../../../strategies/localStrategy");

router.get("/status", function (req, res) {
  res.json({ status: "User status" });
});

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  function (req, res) {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: 43200, // expires in 12 hours
    });
    res.status(200).send({ auth: true, token });
  }
);

router.post("/register", function (req, res) {
  const { username, email, password } = req.body;
  User.create(
    {
      username,
      email,
      password,
    },
    function (err, user) {
      if (err) {
        return res.status(500).send({
          register: false,
          message: "There was a problem registering the user.",
        });
      }
      res
        .status(200)
        .send({ register: true, message: "User is created", id: user._id });
    }
  );
});

module.exports = router;
