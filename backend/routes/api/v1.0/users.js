var express = require("express");
var router = express.Router();

router.get("/status", function(req, res) {
  res.json({ status: "User status" });
});

router.post("/login", function(req, res) {
  res.json({ user: "User login" });
});

router.post("/register", function(req, res) {
  res.json({ userId: "User register" });
});

module.exports = router;
