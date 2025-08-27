// index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoDB = require("./db"); // MongoDB connection
const app = express();

// ✅ Connect to MongoDB
mongoDB();

// ✅ Port configuration
const port = process.env.PORT || 5000;

// ✅ Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5173", // local frontend
  process.env.FRONTEND_URL || "https://gofood-frontend-pi.vercel.app", // deployed frontend
];

// ✅ CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ✅ Handle preflight requests safely
app.options("/api/*", cors());

// ✅ Parse JSON request bodies
app.use(express.json());

// ✅ API routes
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ✅ Start server (only if running locally)
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;
