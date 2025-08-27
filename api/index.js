// index.js
const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http"); // ✅ Required for Vercel serverless
const mongoDB = require("./db");
require("dotenv").config();

const app = express();

// Connect to MongoDB
mongoDB();

// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://gofood-frontend-pi.vercel.app",
];

// CORS middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Parse JSON bodies
app.use(express.json());

// Define routes
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

// Root test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ✅ Export handler for Vercel
module.exports.handler = serverless(app);

// ✅ Optional: local dev server (only runs if file executed directly)
if (require.main === module) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}
