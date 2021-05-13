const express = require("express");
const app = express();
const users = require("../models/users");
const bcrypt = require("bcrypt");

app.route("/").post(async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const checkIfEmailPresent = await users.findOne({ email });
    if (!checkIfEmailPresent) {
      const hash = await bcrypt.hash(password, 10);
      console.log(hash);
      const user = {
        email,
        password: hash,
        role,
      };
      const createUser = await users.create(user);
      res.status(200).json({ message: "user created" });
    } else {
      res.status(400).send({ error: "email already exist" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;
