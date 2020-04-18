const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../../../models/user");

router.get("/status", function(req, res) {
  res.json({ status: "User status" });
});

router.post("/login", function(req, res) {
  res.json({ user: "User login" });
});

router.post("/register", function(req, res) {
  User.create(
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    },
    function(err, user) {
      if (err) {
        return res
          .status(500)
          .send({
            message: "There was a problem registering the user."
          });
      }
      var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 43200 // expires in 12 hours
      });
      res.status(200).send({ auth: true, token });
    }
  );
});

module.exports = router;
