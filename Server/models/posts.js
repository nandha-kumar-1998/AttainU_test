const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  heading: String,
  content: String,
});

const posts = mongoose.model("posts", schema);
module.exports = posts;
