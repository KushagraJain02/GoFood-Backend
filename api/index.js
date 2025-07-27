// api/index.js
const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const mongoDB = require("../db"); // adjust if needed
require("dotenv").config();

mongoDB();
const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

app.use("/api", require("../Routes/CreateUser"));
app.use("/api", require("../Routes/DisplayData"));
app.use("/api", require("../Routes/OrderData"));

app.get("/", (req, res) => {
  res.send("API is running on Vercel!");
});

module.exports.handler = serverless(app);
