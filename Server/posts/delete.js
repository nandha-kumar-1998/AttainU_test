const express = require("express");
const app = express.Router();
const middleware = require("./middleware");
const posts = require("../models/posts");

app.route("/:id").delete(middleware, async (req, res) => {
  try {
    const _id = req.params.id;
    const post = await posts.findByIdAndDelete(_id);
    res.status(200).send({ message: "post deleted" });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = app;
