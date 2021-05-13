const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
});

const users = mongoose.model("users", schema);
module.exports = users;
