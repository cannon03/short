express = require("express");
mongoose = require("mongoose");

const PORT = 5000;

app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  res.render("index", {});
});

app.post("/shorten", async (req, res) => {
  const url = req.body.InputURL;
  const ip = req.headers["x-forwarded-for"];
  console.log(url);
  console.log(ip);
  res.render("shorten", {
    url: url,
    IP: ip,
  });
});

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
