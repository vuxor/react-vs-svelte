const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const db = require("./db.js");
const users = require("./routes/api/v1/users");
const passport = require("passport");

const app = express();

app.use(helmet());
app.use(helmet.referrerPolicy({ policy: "same-origin" }));
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use("/api/v1/users", users);

const port = process.env.PORT || 8080;
db.once("open", function () {
  // we're connected!
  console.log("we are connected to db!", db.name);
  app.listen(port, () => {
    console.log("API server listening on port " + port);
  });
});
