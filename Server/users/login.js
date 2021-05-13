const express = require("express");
const app = express.Router();
const users = require("../models/users");
const jwt = require("jsonwebtoken");
const secret = "123456";
const bcrypt = require("bcrypt");

app.route("/").post(async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkEmail = await users.findOne({ email });
    if (checkEmail) {
      const unhash = await bcrypt.compare(password, checkEmail.password);

      if (unhash) {
        const jsonwebtoken = await jwt.sign({ data: checkEmail._id }, secret, {
          expiresIn: "1h",
        });
        res
          .status(200)
          .header({ token: jsonwebtoken })
          .json({ message: "LogedIn sucessfully" });
      } else {
        res.status(400).send({ error: "Incorrect password" });
      }
    } else {
      res.status(400).send({ error: "Invalid email" });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = app;
