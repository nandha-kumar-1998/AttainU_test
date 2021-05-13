const express = require("express");
const app = express.Router();

app.route("/").get((req, res) => {
  res.send("delete");
});

module.exports = app;
