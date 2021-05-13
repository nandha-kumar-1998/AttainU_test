const express = require("express");
const app = express.Router();
const middleware = require("./middleware");
const posts = require("../models/posts");

app.route("/:id").post(middleware, async (req, res) => {
  try {
    const _id = req.params.id;
    const post = await posts.findById(_id);
    if (post) {
      const { content } = req.body;
      const updatepost = await posts.findByIdAndUpdate(
        _id,
        { content },
        {
          new: true,
        }
      );

      res.status(200).json({ message: "Post updated" });
    } else {
      res.status(400).send({ error: "Required post is not present" });
    }
  } catch (error) {
    console.log(error);
    // res.status(500).send({ message: "Internal sever error" });
  }
});

module.exports = app;
