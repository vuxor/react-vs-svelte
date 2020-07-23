let mongoose = require("mongoose");
mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
module.exports = db;
