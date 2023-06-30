const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const cors = require("cors");
const config = require("./config");
const database = require("./database");
const app = express();

const test = require("./routes/test.routes");
const rtube = require("./routes/rtube.routes");

database.connect(config.default.database);
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/api/test", test);

app.use("/api/rtube", rtube);

app.get("/", (req, res) => {
  res.send("Welcome to the Neothing REST API!");
});
app.all("*", (req, res) => {
  res.send("You've tried reaching a route that doesn't exist.");
});

app.listen(config.default.port, () => {
  console.log(
    `[ SERVER ] running on port: http://localhost:${config.default.port}`
  );
});
