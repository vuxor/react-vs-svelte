const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

require("./db.js");
const users = require("./routes/api/v1/users");

const app = express();

app.use(helmet());
app.use(helmet.referrerPolicy({ policy: "same-origin" }));
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", users);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("API server listening on port " + port);
});
