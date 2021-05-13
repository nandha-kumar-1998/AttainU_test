const jwt = require("jsonwebtoken");
const users = require("../models/users");
const secret = "123456";

async function middleware(req, res, next) {
  try {
    const token = req.headers.token;
    if (token) {
      const { data } = await jwt.verify(token, secret);
      const user = await users.findOne({ _id: data });
      if (user.role === "admin") {
        next();
      } else {
        res.status(400).send({ error: "Admin only allowed" });
      }
    } else {
      res.redirect(301, "http:localhost:3000/login");
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = middleware;
