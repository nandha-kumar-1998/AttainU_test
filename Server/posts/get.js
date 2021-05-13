const express = require("express");
const middleware = require("./middleware");
const posts = require("../models/posts");

const app = express.Router();

app.get("/", middleware, async (req, res) => {
  try {
    let { page, size } = req.query;

    if (!page) {
      page = 1;
    }

    if (!size) {
      size = 1;
    }
    page = parseInt(page);
    const limit = parseInt(size);
    const skip = (page - 1) * size;

    const getPosts = await posts.find().limit(limit).skip(skip);

    res.status(200).json(getPosts);
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;
