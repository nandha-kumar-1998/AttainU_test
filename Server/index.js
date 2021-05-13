const express = require("express");

const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 4000;

// database

require("./db");

// signup

app.use(express.json());
app.use(
  cors({
    credentials: true,
    allowedHeaders: true,
  })
);

app.use("/login", require("./users/login"));
app.use("/posts/create", require("./posts/create"));
app.use("/posts/update", require("./posts/update"));
app.use("/posts/delete", require("./posts/delete"));

app.get("/check", (req, res) => {
  res.send("check");
});

app.listen(PORT, () => console.log("port started running"));
