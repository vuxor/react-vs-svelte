const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../../../models/user");

router.get("/status", function(req, res) {
  res.json({ status: "User status" });
});

router.post("/login", function(req, res) {
  const { username, password } = req.body;
  res.json({ user: "User login" });
  // use local strategy here
});

router.post("/register", function(req, res) {
  const { username, email, password } = req.body;
  User.create(
    {
      username,
      email,
      password
    },
    function(err, user) {
      if (err) {
        return res
          .status(500)
          .send({
            message: "There was a problem registering the user."
          });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 43200 // expires in 12 hours
      });
      res.status(200).send({ auth: true, token });
    }
  );
});

module.exports = router;
