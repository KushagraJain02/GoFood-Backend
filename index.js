// index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoDB = require("./db"); // MongoDB connection
const app = express();

// ✅ Connect to MongoDB
mongoDB();

// ✅ Backend port
const PORT = process.env.PORT || 5000;

// ✅ Allowed origins for CORS (local frontend only)
const allowedOrigins = ["http://localhost:5173"];

// ✅ CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman/curl
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ API routes (all relative paths, never use full URLs)
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ✅ Local server (only runs when executing node index.js)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// ✅ Export app for deployment (Render / serverless platforms)
module.exports = app;
