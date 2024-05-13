const ShortUniqueId = require("short-unique-id");
const { randomUUID } = new ShortUniqueId({ length: 10 });

const express = require("express");
const mongoose = require("mongoose");

const urlSchema = require("../models/url");

const PORT = 5000;

const mongoURI =
  "mongodb+srv://shouryas2012:hNRkeN8m8R0RoIPU@cluster3.n7aw4br.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3";

app = express();

const connect = async () => {
  try {
    mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch {
    console.log("Could not connect to MongoDB Atlas");
  }
};

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  res.render("index", {});
});

app.post("/shorten", async (req, res) => {
  const url = req.body.InputURL;
  const shortened = randomUUID();
  console.log(url, shortened);
  urlSchema.create({
    url: url,
    shortened: shortened,
  });
  res.render("shorten", {
    url: url,
    shortened: shortened,
  });
});

app.get("/:path", async (req, res) => {
  const url = await urlSchema.findOne({ shortened: req.params.path });
  if (url == null) {
    return res.sendStatus(404);
  }
  res.redirect(url.url);
});

app.listen(PORT, () => {
  connect();
  console.log("Server running on port: " + PORT);
});
