const express = require("express");
const { log } = require("./backend/logger");
const bodyParser = require("body-parser");
const path = require("path");
const { dispatch } = require("./backend/dispatcher");

const app = express();
app.use(express.static(__dirname + "/"));

const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, "/frontend/index.html"));
  log();
});

app.post("/api", (req, res) => {
  dispatch(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
  log();
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
