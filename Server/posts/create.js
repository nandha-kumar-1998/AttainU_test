const express = require("express");
const app = express.Router();
const posts = require("../models/posts");
const users = require("../models/users");
const jwt = require("jsonwebtoken");
const secret = "123456";

app.route("/").post(async (req, res) => {
  try {
    const token = req.headers.token;
    if (token) {
      const { data } = await jwt.verify(token, secret);
      const user = await users.findOne({ _id: data });
      if (user.role === "admin") {
        const { content } = req.body;
        if (content.length < 255) {
          const post = await posts.create({ content });

          res.status(200).json({ message: "Post created" });
        } else {
          res.status(400).send({
            error: "Message content should be less than 255 character",
          });
        }
      } else {
        res.status(400).send({ error: "Admin only allowed" });
      }
    } else {
      res.redirect(301, "http://localhost:3000/login");
    }
  } catch (error) {
    res.status(500).send({ error: "Inernal server error" });
  }
});

module.exports = app;
