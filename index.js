const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoDB = require("./db"); // MongoDB connection
const app = express();

// Connect to MongoDB
mongoDB();

// Backend port
const PORT = process.env.PORT || 5000;

// CORS middleware - allow all origins
app.use(
  cors({
    origin: true, // allow requests from any origin
    credentials: true,
  })
);

// Parse JSON bodies
app.use(express.json());

// API routes
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

// Root test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Local server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export app for deployment (Render / serverless platforms)
module.exports = app;
