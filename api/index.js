const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const mongoDB = require("./db");
require("dotenv").config();

// Connect to MongoDB
mongoDB();

const allowedOrigins = [
  "http://localhost:5173",
  "https://gofood-frontend-pi.vercel.app", // ✅ Your deployed frontend
];

// ✅ Use CORS middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ Define routes
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("Hello World!-----");
});

module.exports = app;
module.exports.handler = serverless(app);
